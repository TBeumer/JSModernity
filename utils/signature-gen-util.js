const espree = require("espree");
const calcNodeLangVersion = require("./language-version-calc-util.js");

// Base signature containing all supported ECMAScript versions for espree as keys, and 0 as values
const BASE_SIGNATURE = espree.supportedEcmaVersions.reduce((o, key) => ({ ...o, [key]: 0 }), {});

/**
 * Generates a modernity signature for the given node
 * 
 * @param {object} node espree AST node
 * @param {object} parent the parent espree AST node
 * @param {object} signature the modernity signature object
 * @param {number} errCount the current number of errors encountered while generating the signature
 * @returns {object} The generated modernity signature and total the number of errors encountered
 */
const genNodeSignature = (node, parent, signature = BASE_SIGNATURE, errCount = 0) => {
  if (!node) return { signature, errCount };

  const version = calcNodeLangVersion(node, parent);

  if (version > 0) signature[version]++;
  if (version === -1) errCount++;

  for (const visitorKey of espree.VisitorKeys[node.type]) {
    const branch = node[visitorKey];

    if (!branch) continue;

    // Single child node
    if (!Array.isArray(branch)) {
      const child = branch;
      ({ signature, errCount } = genNodeSignature(child, node, signature, errCount));
      continue;
    }

    // Array of child nodes
    const children = branch;
    for (const child of children) {
      ({ signature, errCount } = genNodeSignature(child, node, signature, errCount));
    }
  }

  return { signature, errCount };
}

/**
 * Generates a modernity signature for the given code
 * 
 * @param {string} code The code to generate the modernity signature for
 * @returns {object} The modernity signature and the total number of errors encountered
 */
module.exports = (code) => {
  const ast = espree.parse(code, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  const { signature, errCount } = genNodeSignature(ast);

  return { signature, errCount };
}