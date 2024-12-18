import { supportedEcmaVersions, VisitorKeys, parse } from "espree";
import calcNodeLangVersion from "./language-version-calc-util.js";

/**
 * Creates an empty modernity signature object containing 
 * all supported ECMAScript versions as keys, and 0 as values
 * 
 * @returns {object} The empty modernity signature object
 */
const createEmptySignature = () => {
  return supportedEcmaVersions.reduce((o, key) => ({ ...o, [key]: 0 }), {});
};

/**
 * Generates a modernity signature for the given node
 * 
 * @param {object} node espree AST node
 * @param {object} parent the parent espree AST node
 * @param {object} signature the modernity signature object
 * @param {number} errCount the current number of errors encountered while generating the signature
 * @returns {object} The generated modernity signature and total the number of errors encountered
 */
const genNodeSignature = (node, parent, signature, errCount = 0) => {
  if (!signature) signature = createEmptySignature();
  if (!node) return { signature, errCount };

  const version = calcNodeLangVersion(node, parent);

  if (version > 0) signature[version]++;
  if (version === -1) errCount++;

  for (const visitorKey of VisitorKeys[node.type]) {
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
export default (code) => {
  const ast = parse(code, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  const { signature, errCount } = genNodeSignature(ast);

  return { signature, errCount };
}