import fs from "fs";
import { parse } from "espree";
import { genFileSignature } from "../../utils/signature-gen-util.js";

const versionFolders = {
  "es3-or-earlier": 3,
  "es5": 5,
  "es6": 6,
  "es7": 7,
  "es8": 8,
  "es9": 9,
  "es10": 10,
  "es11": 11,
  "es12": 12,
  "es13": 13,
  "es14": 14,
  "es15": 15,
  "es16": 16,
};

for (const [folder, version] of Object.entries(versionFolders)) {
  const files = fs.readdirSync(`tests/feature-version-calculation/${folder}`);

  for (const file of files) {
    if (!file.endsWith(".source.js")) continue;

    const code = fs.readFileSync(`tests/feature-version-calculation/${folder}/${file}`, "utf8");

    test(`Feature ${file.split('.')[0]} from ${folder}, can be parsed by ECMAScript version ${version}`, () => {
      expect(() => {
        parse(code, {
          ecmaVersion: version,
          sourceType: (version < 6 ? "script" : "module"),
        });
      }).not.toThrow();
    });

    if (version === 3) continue;

    test(`Feature ${file.split('.')[0]} from ${folder}, cannot be parsed by ECMAScript version ${version - 1}`, () => {
      expect(() => {
        parse(code, {
          ecmaVersion: version - 1,
          sourceType: (version - 1 < 6 ? "script" : "module"),
        });
      }).toThrow();
    });

    test(`The modernity signature for feature ${file.split('.')[0]} from ${folder}, does not contain detections of language versions higher than ECMAScript version ${version}`, () => {
      const signature = genFileSignature(`tests/feature-version-calculation/${folder}/${file}`);
      for (const [key, value] of Object.entries(signature.aggregate)) {
        if (parseInt(key) > version) {
          expect(value).toBe(0);
        }
      }
    });

    test(`The modernity signature for feature ${file.split('.')[0]} from ${folder}, contains at least one detection of ECMAScript version ${version}`, () => {
      const signature = genFileSignature(`tests/feature-version-calculation/${folder}/${file}`);
      expect(signature.aggregate[version]).toBeGreaterThan(0);
    });
  }
}