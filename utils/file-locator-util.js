import fs from "fs";
import path from "path";

/**
 * Recursively checks all files in the given folder and its subfolders
 * for any files with the given file extension, and returns the paths
 * to those files.
 * 
 * @param {string} folder The folder to search for files in
 * @param {string} fileExtension The file extension to search for
 * @param {boolean} reportProgress Whether to report progress to the console
 * @param {boolean} isExecRoot A paremeter to keep track of recursion stack
 * @returns {Array<string>} The paths to the found files
 */
const locateFiles = (folder, fileExtension, reportProgress = true, isExecRoot = true) => {

  /**
   * Reports the progress of the file locating to the console
   */
  const doProgressReport = (amount, final = false) => {
    if (!reportProgress) return;

    process.stdout.cursorTo(0);
    process.stdout.clearLine(1);
    process.stdout.write(`Locating files: ${amount} '${fileExtension}' files found` + (final ? '\n' : ''));
  };

  const files = fs.readdirSync(folder);
  let foundFiles = [];

  for (const file of files) {
    const filePath = path.join(folder, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      foundFiles = foundFiles.concat(locateFiles(filePath, fileExtension, true, false));
    } else if (file.endsWith(fileExtension)) {
      foundFiles.push(filePath);
    }
  }

  // Only root of execution stack may end the progress report
  if (isExecRoot) {
    doProgressReport(foundFiles.length, true);
  }

  return foundFiles;
};

export {
  locateFiles
};