import { readFileSync } from "fs";
import { supportedEcmaVersions, VisitorKeys, parse } from "espree";
import { getSubType, getType, getVersion } from "./language-version-calc-util.js";
import { locateFiles } from "./file-locator-util.js";

/**
 * Creates an empty modernity signature object containing 
 * all supported ECMAScript versions as keys, and 0 as values
 * 
 * @returns {object} The empty modernity signature object
 */
const createEmptySignature = () => {
  const singleEmtpy = supportedEcmaVersions.reduce((o, key) => ({ ...o, [key]: 0 }), {});

  return {
    aggregate: {...singleEmtpy},
    boolean: {...singleEmtpy},
  };
};

/**
 * Generates a modernity signature for a given directory 
 * by recursing over all valid JavaScript files in the 
 * given directory.
 * 
 * Valid files are files that have both a .js file extension
 * and can be parsed by espree. Files that do not have the 
 * .js file extension or that cannot be parsed by espree 
 * will be skipped.
 * 
 * @param {string} path The path to the directory
 * @returns {object} The modernity signature for the directory
 */
export const genDirectorySignature = (path) => {
  const files = locateFiles(path, ".js");

  // Progress counters
  let processed = 0;
  let skipped = 0;

  // Initial progress report
  doProgressReport(processed, skipped, files.length);

  // Loop through all files to generate signature
  let signature = createEmptySignature();
  let coveredTypes = []; // Used in boolean signature
  for (const file of files) {
    const code = readFileSync(file, "utf8");

    try {
      parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          globalReturn: true,
        },
      });
    } catch (e) {
      doWarningReport(`Warning: Could not parse file ${file}, skipping... Error: ${e.message}`);
      doProgressReport(processed, skipped++, files.length);
      continue; // Skip files that cannot be parsed
    }

    try {
      signature, coveredTypes = processCode(code, signature, coveredTypes);
    } catch (e) {
      doWarningReport(`Error while processing file ${file}: ${e.message} ${e.stack}`);
    }

    doProgressReport(processed++, skipped, files.length);
  }

  // Final progress report
  doProgressReport(processed, skipped, files.length);

  return signature;
};

/**
 * Generates a modernity signature for a given code snippet
 * 
 * @param {string} code The code to process
 * @param {object} signature The current signature object
 * @param {array} coveredTypes The types of nodes that have
 *  already been covered (used in boolean signature)
 * @returns {object} The modernity signature for the code
 */
const processCode = (code, signature, coveredTypes) => {
  const ast = parse(code, {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: true,
    },
  });

  return processNode(ast, null, signature, coveredTypes);
};

/**
 * Processes a given node in the AST to generate a modernity
 * signature
 * 
 * @param {object} node The node to process
 * @param {object} parent The parent node of the given node
 * @param {object} signature The modernity signature object
 * @param {array} coveredTypes The types of nodes that have
 *  already been covered (used in boolean signature)
 * @returns {object} The updated modernity signature and the
 *  updated list of covered types
 */
const processNode = (node, parent, signature, coveredTypes) => {
  const type = getType(node);
  const subType = getSubType(node, parent);
  const version = getVersion(type, subType);
  
  // ---
  //  Recurse through child nodes
  // ---

  for (const visitorKey of VisitorKeys[type]) {
    const branch = node[visitorKey];

    if (!branch) continue;

    // Single child node
    if (!Array.isArray(branch)) {
      const childNode = branch;
      signature, coveredTypes = processNode(childNode, node, signature, coveredTypes);
      continue;
    }

    // Array of child nodes
    const children = branch;
    for (const childNode of children) {
      if (childNode == null) continue;
      signature, coveredTypes = processNode(childNode, node, signature, coveredTypes);
    }
  }

  // ---
  //  Process current node
  // ---

  // Version 0 nodes are discarded
  if (version === "0") return signature, coveredTypes;

  // Version undefined nodes are errors
  if (subType === undefined) {
    console.error(`Error: (Skipping Node) Could not determine signature for node: ${node}`);
    return signature, coveredTypes;
  }

  // Always add to aggregate
  signature.aggregate[version]++;

  // Add to boolean if not already included
  if (!coveredTypes.includes(type + subType)) {
    signature.boolean[version]++;
    coveredTypes.push(type + subType);
  }

  return signature, coveredTypes;
};

let prevProgressReport = Date.now();
/**
 * Reports progress made to console
 * 
 * @param {number} current The number of files processed
 * @param {number} skipped The number of files skipped
 * @param {number} total The total number of files to process
 */
const doProgressReport = (current, skipped, total) => {

  // Maximum of 1 report per 250ms (prevent console spamming / slowdowns)
  if (current + skipped < total && Date.now() - prevProgressReport < 250) return;

  // Reset cursor
  if (current !== 0) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(1);
  }

  const label = 'Processing files:';
  const percentage = ((current + skipped) / total * 100).toFixed() + '%';
  const amount = `(${current}/${total} files processed)`;
  const skippedStr = skipped ? ` (${skipped} .js files could not be processed)` : '';

  process.stdout.write(`${label} ${percentage} ${amount} ${skippedStr}`);

  // Newline on final report
  if (current + skipped === total) {
    process.stdout.write('\n');
  }

  prevProgressReport = Date.now();
};

/**
 * Log a warning message during an ongoing progress report
 * 
 * Used to prevent weird output because of the cursor
 * resetting used within doProgressReport.
 * 
 * @param {string} message text to write to console
 */
const doWarningReport = (message) => {
  process.stdout.cursorTo(0);
  process.stdout.clearLine(1);
  console.warn(message);
}