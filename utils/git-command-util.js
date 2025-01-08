import { execSync } from "child_process";

/**
 * Clones the given repository into the given directory using
 * the git clone command in a child shell process.
 *
 * @param {string} baseDir the directory to clone the repository into
 * @param {string} ownerName the name of the owner of the repository
 * @param {string} repoName the name of the repository
 * @returns {boolean} true if the cloning was successful, false otherwise
 */
const cloneRepo = (baseDir, ownerName, repoName) => {
  const dir = `${baseDir}`;

  try {
    execSync(
      `cd ${dir} && git clone https://github.com/${ownerName}/${repoName}.git`,
      {
        stdio: "inherit",
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Checks out the given commit sha in the given repository folder
 * using the git checkout command in a child shell process.
 *
 * @param {string} baseDir the directory in which the repository folder is located
 * @param {string} repoName the name of the repository
 * @param {string} commitSha the commit sha to checkout
 * @returns {boolean} true if the checkout was successful, false otherwise
 */
const checkoutCommit = (baseDir, repoName, commitSha) => {
  const dir = `${baseDir}/${repoName}`;
  const sha = commitSha;

  try {
    execSync(
      `cd ${dir} && git -c advice.detachedHead=false checkout --force ${sha}`, // TODO: Make this force checkout to avoid potential issues
      {
        stdio: "inherit",
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export { cloneRepo, checkoutCommit };
