# JSModernity

A tool to generate modernity signatures for JavaScript projects.

## Installation

- Clone this repository
- Make sure you are using node version 22.11
- Run `npm install` to install dependencies

## Running Signature Generation

_This guide is for windows and linux systems only_

- Determine the owner and name of the GitHub repository that you want to generate a signature for
- Open a terminal
- Run `node ./run.js --owner=<owner> --repo=<repo>`
  - You can optionally add a max date parameter `--maxDate=<yyyy-mm-dd>` to prevent any releases after that date from being taken into account

For visualization of the result, you can use the [plots.ipynb](plots.ipynb) file in the root of this repository. It has been created using jupyter notebook version 7.2.2. Other versions might work but have not been tested.

## Important Information

- Only ECMAScript versions ES3 to ES15 are taken into account. Features introduced before ES3 are counted as ES3 features. (This is due to espree supporting only from ES3 onwards)
- Signatures are generated for every release of a repository, if no releases exist within GitHub, than there will be no signature generated.

### Known Issues

- \*temp*sig_gen*\*\* folders sometimes fail to get deleted after signature generation. After the signature generation is done you can safely delete these folders manually.
