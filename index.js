const fs = require("fs");
const espree = require("espree");
const genCodeSignature = require("./utils/signature-gen-util.js");
const locateFiles = require("./utils/file-locator-util.js");

// // JSON standard does not contain a serializer for BigInts, so we need to define a custom one for JSON.stringify();
// BigInt.prototype.toJSON = function() { return this.toString() };

// console.log(JSON.stringify(espree.parse(`
//   ;
// `, {
//   ecmaVersion: 16,
//   sourceType: "commonjs",
// }), null, 2));

// // process.exit(0);

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

const genSignatureForFolder = (folder) => {
  const files = locateFiles(folder, ".js");
  let accSignature = {};

  for (const file of files) {
    const fileCode = fs.readFileSync(file, "utf8");

    try {
      espree.parse(fileCode, {
        ecmaVersion: "latest",
        sourceType: "module",
      });
    } catch (e) {
      // console.warn(`Warning: espree could not parse file ${file}, skipping... Reason: ${e.message}`);
      continue;
    }

    let fileSignature;
    try {
      // console.log("doing file:", file);
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

const inputFolders = [
  "downloaded_repos/axios-1.x",
  "downloaded_repos/bootstrap-main",
  "downloaded_repos/javascript-algorithms-master",
  "downloaded_repos/javascript-master",
  "downloaded_repos/react-main",
  "downloaded_repos/30-seconds-of-code-master",
  "downloaded_repos/next.js-canary",
  "downloaded_repos/node-main",
];

for (const folder of inputFolders) {
  console.log("Processing folder:", folder, "...");
  console.log("signature:", genSignatureForFolder(folder));
}