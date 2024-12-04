// Identifier
let identifier = 10; // ES3

// FunctionExpression
let functionExpression = function() {}; // ES3
let generatorFunctionExpression = function*() {}; // ES6
let asyncFunctionExpression = async function() {}; // ES8

// FunctionDeclaration
function functionDeclaration() {} // ES3
function* generatorFunctionDeclaration() {} // ES6
async function asyncFunctionDeclaration() {} // ES8

// ForStatement
for (let i = 0; i < 10; i++) {} // ES3

// ForOfStatement
for (let value of array) {} // ES6

// ForInStatement
for (let key in obj) {} // ES3

// ExpressionStatement
x = 2; // ES3
x++; // ES3
console.log(x); // ES3

// ExportSpecifier
export { namedExportFunction as renamedExportFunction }; // ES6

// ExportNamedDeclaration
export function namedExportFunction() {}; // ES6

// ExportDefaultDeclaration
export default function defaultExportFunction() {}; // ES6

// ExportAllDeclaration
export * from './anotherJavascriptFile.js'; // ES6

// DoWhileStatement
do {} while (false); // ES3

// DebuggerStatement
debugger; // ES3

// ContinueStatement
for (let i = 0; i < 10; i++) {
  continue; // ES3
}

// ConditionalExpression
let conditionalExpression = true ? 1 : 2; // ES3

// ClassExpression
let classExpression = class {}; // ES6

// ClassDecleration + ClassBody
class ClassDecleration {} // ES6

// ChainExpression
let chainExpression = obj?.prop; // ES11
chainExpression = obj?.[expr]; // ES11
chainExpression = obj?.(); // ES11

// CatchClause
try {} catch (error) {} // ES3
try {} catch {} // E10

// CallExpression
callExpression(); // ES3

// BreakStatement
for (let i = 0; i < 10; i++) {
  break; // ES3
}

// BinaryExpression
let binaryExpression = 1 + 2; // ES3
binaryExpression = 1 - 2; // ES3
binaryExpression = 1 * 2; // ES3
binaryExpression = 1 / 2; // ES3
binaryExpression = 1 % 2; // ES3
binaryExpression = 1 ** 2; // ES7
binaryExpression = 1 << 2; // ES3
binaryExpression = 1 >> 2; // ES3
binaryExpression = 1 >>> 2; // ES3
binaryExpression = 1 & 2; // ES3
binaryExpression = 1 | 2; // ES3
binaryExpression = 1 ^ 2; // ES3
binaryExpression = true == false; // ES3
binaryExpression = true != false; // ES3
binaryExpression = true === false; // ES5
binaryExpression = true !== false; // ES5
binaryExpression = true < false; // ES3
binaryExpression = true <= false; // ES3
binaryExpression = true > false; // ES3
binaryExpression = true >= false; // ES3

// AwaitExpression
async function asyncFunction() {
  await Promise.resolve(); // ES8
}

// AssignmentPattern
const [a = 1, b = 2] = [10]; // ES6

// AssignmentExpression
let assignmentExpression = 10; // ES3
assignmentExpression += 10; // ES5
assignmentExpression -= 10; // ES5
assignmentExpression *= 10; // ES5
assignmentExpression /= 10; // ES5
assignmentExpression %= 10; // ES5
assignmentExpression <<= 10; // ES5
assignmentExpression >>= 10; // ES5
assignmentExpression >>>= 10; // ES5
assignmentExpression &= 10; // ES5
assignmentExpression ^= 10; // ES5
assignmentExpression |= 10; // ES5
assignmentExpression ||= 10; // ES12
assignmentExpression &&= 10; // ES12
assignmentExpression ??= 10; // ES12

// ArrayPattern
let [arrayPattern] = [10]; // ES6

// ArrayExpression
let arrayExpression = [1, 2, 3]; // ES3

// VariableDeclaration
var varDeclVar = 10; // ES3
let varDeclLet = 10; // ES6
const varDeclConst = 10; // ES6
