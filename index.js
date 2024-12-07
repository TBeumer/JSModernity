const espree = require("espree");
const fs = require("fs");
const languageVersionCalculator = require("./languageVersionCalculator");
const BASE_SIGNATURE = {3: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0}; // TODO use supportedEcmaVersions from espree to generate

// const code = fs.readFileSync("testRepo/javascriptFile.js", "utf8");
const code = fs.readFileSync("testRepo/folder/moreJavascriptFile.js", "utf8");

console.log(code);

const ast = espree.parse(code, {
  ecmaVersion: 2024,
  sourceType: "module",
});

console.log(espree.VisitorKeys);

// JSON standard does not contain a serializer for BigInts, so we need to define a custom one for JSON.stringify();
BigInt.prototype.toJSON = function() { return this.toString() };

fs.writeFileSync("ast.json", JSON.stringify(ast, null, 2));

function genModernitySignature(node, parent, signature = BASE_SIGNATURE) {
  const version = languageVersionCalculator(node, parent);
  // console.log("node.type:", node.type, "resulted in version:", version);

  if (version !== 0) signature[version]++;

  // console.log(espree.VisitorKeys[node.type])
  for (const visitorKey of espree.VisitorKeys[node.type]) {
    const branch = node[visitorKey];

    if (!branch) continue;

    // Single child node
    if (!Array.isArray(branch)) {
      const child = branch;
      signature = genModernitySignature(child, node, signature);
      continue;
    }

    // Array of child nodes
    const children = branch;
    for (const child of children) {
      signature = genModernitySignature(child, node, signature);
    }
  }
  return signature;
}

const signature = genModernitySignature(ast);
console.log("signature:", signature);