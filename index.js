import { readFileSync, existsSync, mkdirSync, rmdirSync, writeFileSync } from "fs";
import { parse } from "espree";
import genCodeSignature from "./utils/signature-gen-util.js";
import locateFiles from "./utils/file-locator-util.js";
import { getCommitShaByDate } from "./utils/github-connector-util.js";
import { execSync } from "child_process";

const REPO_DOWNLOAD_DIR = "downloaded_repos";
const RESULT_SIGNATURES_DIR = "result_signatures";
const DAYS_BETWEEN_COMMIT_CHECKOUTS = 30;

let currentWorkingEnvironment = {
  owner: "facebook",
  repo: "react",
  commit: {
    sha: null,
    date: null,
  },
}

const emptyRepoDir = () => {
  const dir = REPO_DOWNLOAD_DIR;

  if (existsSync(dir)) {
    rmdirSync(dir, { recursive: true });
  }

  mkdirSync(dir);
};

const saveResultSignatures = (signatures) => {
  const dir = RESULT_SIGNATURES_DIR;
  const repo = currentWorkingEnvironment.repo;
  const filePath = `${dir}/${repo}_signatures.json`;

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  writeFileSync(filePath, JSON.stringify(signatures, null, 2));
}

const cloneCurrentRepo = () => {
  const dir = `${REPO_DOWNLOAD_DIR}`;
  const owner = currentWorkingEnvironment.owner;
  const repo = currentWorkingEnvironment.repo;

  emptyRepoDir();

  execSync(
    `cd ${dir} && git clone https://github.com/${owner}/${repo}.git`, 
    { 
      stdio: "inherit" 
    }
  );
}

const checkoutCurrentCommit = () => {
  const dir = `${REPO_DOWNLOAD_DIR}/${currentWorkingEnvironment.repo}`;
  const sha = currentWorkingEnvironment.commit.sha;

  execSync(
    `cd ${dir} && git -c advice.detachedHead=false checkout ${sha}`, 
    { 
      stdio: "inherit" 
    }
  );
}

const combineSignatures = (sigA, sigB) => {
  const combined = { ...sigA };

  for (const [key, value] of Object.entries(sigB)) {
    if (combined[key] === undefined) {
      combined[key] = value;
    } else {
      combined[key] += value;
    }
  }

  return combined;
};

const genSignatureForDirectory = (folder) => {
  const files = locateFiles(folder, ".js");
  let accSignature = {};

  for (const file of files) {
    const fileCode = readFileSync(file, "utf8");

    try {
      parse(fileCode, {
        ecmaVersion: "latest",
        sourceType: "module",
      });
    } catch (e) {
      continue; // Skip files that cannot be parsed
    }

    let fileSignature;
    try {
      let { signature, errCount } = genCodeSignature(fileCode);
      fileSignature = signature;

      if (errCount > 0) {
        console.warn(`Warning: ${errCount} error(s) encountered while generating the modernity signature for file ${file}, see errors above.`);
      }
    } catch (e) {
      console.warn(`Error while processing file ${file}: ${e.message}`);
    }

    accSignature = combineSignatures(accSignature, fileSignature);
  };

  return accSignature;
}

const inputRepos = [
  { owner: "twbs", repo: "bootstrap" },
  { owner: "facebook", repo: "react" },
];

for (const repo of inputRepos) {
  currentWorkingEnvironment.owner = repo.owner;
  currentWorkingEnvironment.repo = repo.repo;

  cloneCurrentRepo();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const commitSha = await getCommitShaByDate(repo.owner, repo.repo, currentDate);
  currentWorkingEnvironment.commit = { sha: commitSha, date: currentDate };

  let signatures = {};

  while (true) {
    const currentCommitDate = currentWorkingEnvironment.commit.date;
    const currentCommitSha = currentWorkingEnvironment.commit.sha;

    console.log("Processing commit:", currentCommitSha, "|", currentCommitDate);

    checkoutCurrentCommit();

    const signature = genSignatureForDirectory(`${REPO_DOWNLOAD_DIR}/${repo.repo}`);

    signatures[currentCommitDate.toISOString()] = signature;

    console.log("Signature for commit:", signature);

    const nextCommitDate = currentCommitDate;
    nextCommitDate.setDate(currentCommitDate.getDate() - DAYS_BETWEEN_COMMIT_CHECKOUTS);

    const nextCommitSha = await getCommitShaByDate(repo.owner, repo.repo, nextCommitDate);

    if (!nextCommitSha) {
      break;
    }

    currentWorkingEnvironment.commit = { sha: nextCommitSha, date: nextCommitDate };
  }

  console.log("Saving signatures for repo", repo.repo, "to file.");
  saveResultSignatures(signatures);
}