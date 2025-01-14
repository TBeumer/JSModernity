import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { genDirectorySignature } from "./utils/signature-gen-util.js";
import {
  getCommitShaByTagName,
  getReleaseTags,
} from "./utils/github-api-connector-util.js";
import { checkoutCommit, cloneRepo } from "./utils/git-command-util.js";
import argsParser from "args-parser";
import { supportedEcmaVersions } from "espree";
import { getDetectableFeatureCountPerVersion } from "./utils/language-version-calc-util.js";

// Constants
const RESULT_SIGNATURES_DIR = "result_signatures"; // Directory to save result signatures into
const MAX_RETRIES = 3; // Maximum number of retries for a single request / git checkout attempt

// ---
//  Helper functions
// ---

/**
 * Creates a unique empty directory for the repository to be cloned into
 */
const createEmptyDir = () => {
  const dir = "temp_sig_gen_" + Date.now();

  mkdirSync(dir);

  return dir;
};

/**
 * Removes files created during execution time
 *
 * @param {number} exitCode exit code to use in process.exit();
 */
const cleanupAndExit = (exitCode) => {
  if (dir) {
    try {
      rmSync(dir, { recursive: true });
    } catch (e) {
      console.warn(
        `Failed to remove temporary files, requires manual deletion... Error: ${e.message}`
      );
    }
  }
  process.exit(exitCode);
};

/**
 * Creates an empty result object
 *
 * @param {object} meta additional meta data to include in the result object
 * @returns {object} a new empty result object
 */
const createEmptyResultObject = (meta) => {
  return {
    meta: {
      ...meta,
      esVersions: supportedEcmaVersions,
      signBoolMaxDetectable: getDetectableFeatureCountPerVersion(),
    },
    signatures: {},
  };
};

/**
 * Saves the given result to a file in the result signatures directory.
 *
 * @param {object} result the result JSON object to save to file
 */
const saveResult = (result) => {
  const dir = RESULT_SIGNATURES_DIR;
  const date = new Date().toISOString();
  const fileName = `${dir}/${owner}_${repo}_signatures_${date}`;
  const cleanFileName = fileName.replace(/[:\.]/g, "-");

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  console.log(
    `Saving result signature for ${owner}:${repo} to file ${fileName}`
  );

  writeFileSync(cleanFileName + ".json", JSON.stringify(result, null, 2));
};

const timings = { current: performance.now() };
/**
 * Saves the current timing counter as a specific
 * entry in the timings object, and resets the
 * current timer.
 *
 * @param {string} key timing key to save time as
 */
const recordTimingAs = (key) => {
  const accValue = timings[key] ? timings[key] : 0;
  timings[key] = accValue + performance.now() - timings.current;
  timings.current = performance.now();
};

/**
 * Logs the recorded timings to the console
 */
const logTimings = () => {
  const { current, ...finalTimings } = timings;

  const maxKeyLength = Math.max(
    ...Object.keys(finalTimings).map((key) => key.length)
  );

  console.log("------- Timings -------");
  for (const [key, value] of Object.entries(finalTimings)) {
    const padding = " ".repeat(maxKeyLength - key.length);
    const formattedTiming = msToTime(value);
    console.log(padding + key + ": " + formattedTiming);
  }
  console.log("-----------------------");
};

/**
 * Converts the given amount of milliseconds to a
 * days, hours, minutes, seconds and millisceonds
 * format for better readability.
 *
 * @param {number} time amount of milliseconds to convert
 * @returns {string} converted representation
 */
const msToTime = (time) => {
  time = Math.round(time);

  const ms = time % 1000;
  const ms_formatted = ms > 0 ? ms + "ms" : "";
  time = (time - ms) / 1000;
  const s = time % 60;
  const s_formatted = s > 0 ? s + "s " : "";
  time = (time - s) / 60;
  const m = time % 60;
  const m_formatted = m > 0 ? m + "m " : "";
  time = (time - m) / 60;
  const h = time % 24;
  const h_formatted = h > 0 ? h + "h " : "";
  time = (time - h) / 24;
  const d = time;
  const d_formatted = d > 0 ? d + "d " : "";

  return d_formatted + h_formatted + m_formatted + s_formatted + ms_formatted;
};

// ---
//  Command line arguments parsing
// ---

const args = argsParser(process.argv);

// Name of the owner of the repository
if (!args.owner) {
  console.error(
    "Error: Missing owner name. Please provide an owner name using the --owner=<NAME> argument..."
  );
  cleanupAndExit(1);
}
if (typeof args.owner !== "string") {
  console.error(
    "Error: Owner name must be a string. Please provide a valid owner name using the --owner=<NAME> argument..."
  );
  cleanupAndExit(1);
}
const owner = args.owner;

// Name of the repository
if (!args.repo) {
  console.error(
    "Error: Missing repository name. Please provide a repository name using the --repo=<NAME> argument..."
  );
  cleanupAndExit(1);
}
if (typeof args.repo !== "string") {
  console.error(
    "Error: Repository name must be a string. Please provide a valid repository name using the --repo=<NAME> argument..."
  );
  cleanupAndExit(1);
}
const repo = args.repo;

// Maximum release date
if (typeof args.maxDate !== "string" || isNaN(Date.parse(args.maxDate))) {
  console.error(
    "Error: Maximum date must be a string in ISO 8601 format. Please provide a valid maximum date using the --maxDate=<DATE> argument..."
  );
  cleanupAndExit(1);
}
const maxDate = args.maxDate ? new Date(args.maxDate) : new Date();

// ---
//  Main script
// ---

// Make sure the downloaded repos directory exists and is empty
const dir = createEmptyDir();

// Clone the repository
if (!cloneRepo(dir, owner, repo)) {
  console.error(
    "Error: Something went wrong while cloning the repository. There is likely additional logging above. Exiting..."
  );
  cleanupAndExit(1);
}

// Save time taken to clone the repository to timer
recordTimingAs("Cloning Repository");

// Get all release tags for the repo
const releaseTags = await getReleaseTags(owner, repo, maxDate.toISOString());
if (!releaseTags) {
  console.error(
    "Error: Something went wrong while fetching release tags. There is likely additional logging above. Exiting..."
  );
  cleanupAndExit(1);
}
if (releaseTags.length === 0) {
  console.error("Error: No release tags found for the repository. Exiting...");
  cleanupAndExit(1);
}

// Save time taken to fetch release tags to timer
recordTimingAs("Fetching Release Tags");

// Generate signatures for each release tag
const result = createEmptyResultObject({
  owner,
  repo,
  maxDate: maxDate.toISOString(),
});
for (const release of releaseTags) {
  // Get commit sha for release tag
  console.log(
    "Fetching commit sha for release tag:",
    release.tag,
    "|",
    release.date
  );
  let commitSha = null;
  for (let i = 0; i < MAX_RETRIES; i++) {
    commitSha = await getCommitShaByTagName(owner, repo, release.tag);
    if (commitSha) break;
    console.warn(
      "Warning: Failed to fetch commit sha for release tag. Retrying... Attempt:",
      i + 1,
      "of",
      MAX_RETRIES
    );
  }
  if (!commitSha) {
    console.error(
      "Error: Something went wrong while fetching the commit sha. There is likely additional logging above. Skipping..."
    );
    continue;
  }

  // Add time taken to fetch commit sha to timer
  recordTimingAs("Fetching Commit Sha's");

  // Run 'git checkout' command for commit connected to release tag
  console.log("Running 'git checkout' for commit:", commitSha);
  let checkoutSuccess = false;
  for (let i = 0; i < MAX_RETRIES; i++) {
    if (checkoutCommit(dir, repo, commitSha)) {
      checkoutSuccess = true;
      break;
    }
    console.warn(
      "Warning: Failed to checkout commit. Retrying... Attempt:",
      i + 1,
      "of",
      MAX_RETRIES
    );
  }
  if (!checkoutSuccess) {
    console.error(
      "Error: Something went wrong while checking out the commit. There is likely additional logging above. Skipping..."
    );
    continue;
  }

  // Add time taken to checkout commit to timer
  recordTimingAs("Checking out commits");

  // Generate signature and save to memory
  console.log("Generating signature...");
  const signature = genDirectorySignature(`${dir}/${repo}`);
  result.signatures[release.date] = signature;

  // Add time taken to generate signature to timer
  recordTimingAs("Generating signatures");
}

// Save result to file
saveResult(result, repo);

// Print timings
logTimings();

// Clean up
cleanupAndExit(0);
