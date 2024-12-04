const calculators = {
  /**
   * Root node, version 0 to disregard
   */
  "Program": node => {
    return 0;
  },
  /**
   * BlockStatement is simply a list of other statements, version 0 to disregard
   */
  "BlockStatement": node => {
    return 0;
  },
  /**
   * EmptyStatement has no effect, only syntactically, version 0 to disregard
   */
  "EmptyStatement": node => {
    return 0;
  },
  /**
   * NodeType: ArrayExpression
   * 
   * Version history:
   * ES3 (1999): Basic array expressions
   * 
   * TODO: what about spread operator, array destructuring and array methods?
   */
  "ArrayExpression": node => {
    return 3;
  },
  /**
   * NodeType: ArrayPattern
   * 
   * Version history:
   * ES6 (2015): Array destructuring
   * 
   * TODO: what about nested arrays and spread operator for rest element?
   */
  "ArrayPattern": node => {
    return 6;
  },
  /**
   * NodeType: ArrowFunctionExpression
   * 
   * Version history:
   * ES6 (2015): Arrow functions
   */
  "ArrowFunctionExpression": node => {
    return 6;
  },
  /**
   * NodeType: AssignmentExpression
   * 
   * Version history:
   * ES3 (1999): Basic assignment expression: 'a = 4;'
   * ES5 (2009): Compound assignment expressions with operators: +=, -=, *=, /=, %=, <<=, >>=, >>>=, &=, |=, ^=
   * ES12 (2021): Logical assignment expressions: ||=, &&=, ??=
   * 
   * TODO: spread syntax in assignments since ES9? And what about destructuring assignments since ES6?
   */
  "AssignmentExpression": node => {
    if ("=" === node.operator) return 3;
    if (["+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^="].includes(node.operator)) return 5;
    if (["&&=", "||=", "??="].includes(node.operator)) return 12;
    
    console.log("Unknown assignment operator:", node.operator, "in node:", node); // TODO: better error handling
    return 0;
  },
  /**
   * NodeType: AssignmentPattern
   * 
   * Version history:
   * ES6 (2015): Default parameter values
   */
  "AssignmentPattern": node => {
    return 6;
  },
  /**
   * NodeType: AwaitExpression
   * 
   * Version history:
   * ES11 (2020): Async functions and await expressions
   */
  "AwaitExpression": node => {
    return 8;
  },
  /**
   * NodeType: BinaryExpression
   * 
   * Version history:
   * ES3 (1999): Binary expressions with operators: +, -, *, /, %, <<, >>, >>>, &, |, ^, ==, !=, ===, !==, <, <=, >, >=
   * ES7 (2016): Exponentiation operator: **
   */
  "BinaryExpression": node => {
    if (["+", "-", "*", "/", "%", "<<", ">>", ">>>", "&", "|", "^", "==", "!=", "===", "!==", "<", "<=", ">", ">="].includes(node.operator)) return 3;
    if ("**" === node.operator) return 7;

    console.log("Unknown binary operator:", node.operator, "in node:", node); // TODO: better error handling
    return 0;
  },
  /**
   * NodeType: BreakStatement
   * 
   * Version history:
   * ES3 (1999): Break statement
   */
  "BreakStatement": node => {
    return 3;
  },
  /**
   * NodeType: CallExpression
   * 
   * Version history:
   * ES3 (1999): Function calls
   */
  "CallExpression": node => {
    return 3;
  },
  /**
   * NodeType: CatchClause
   * 
   * Version history:
   * ES3 (1999): Catch clause
   * ES10 (2019): Optional catch binding
   */
  "CatchClause": node => {
    if (node.param) return 3;
    return 10;
  },
  /**
   * NodeType: ChainExpression
   * 
   * Version history:
   * ES11 (2020): Optional chaining
   */
  "ChainExpression": node => {
    return 11;
  },
  /**
   * NodeType: ClassBody
   * 
   * Version history:
   * ES6 (2015): Class bodies
   */
  "ClassBody": node => {
    return 6;
  },
  /**
   * NodeType: ClassDeclaration
   * 
   * Version history:
   * ES6 (2015): Class declarations
   */
  "ClassDeclaration": node => {
    return 6;
  },
  /**
   * NodeType: ClassExpression
   * 
   * Version history:
   * ES6 (2015): Class expressions
   */
  "ClassExpression": node => {
    return 6;
  },
  /**
   * NodeType: ConditionalExpression
   * 
   * Version history:
   * ES3 (1999): Conditional expressions
   */
  "ConditionalExpression": node => {
    return 3;
  },
  /**
   * NodeType: ContinueStatement
   * 
   * Version history:
   * ES3 (1999): Continue statement
   */
  "ContinueStatement": node => {
    return 3;
  },
  /**
   * NodeType: DebuggerStatement
   * 
   * Version history:
   * ES3 (1999): Debugger statement
   */
  "DebuggerStatement": node => {
    return 3;
  },
  /**
   * NodeType: DoWhileStatement
   * 
   * Version history:
   * ES3 (1999): Do-while statement
   */
  "DoWhileStatement": node => {
    return 3;
  },
  /**
   * NodeType: ExperimentalRestProperty
   * 
   * Version history:
   * ES6 (2015): Rest properties as experimental feature
   */
  "ExperimentalRestProperty": node => {
    return 6;
  },
  /**
   * NodeType: ExperimentalSpreadProperty
   * 
   * Version history:
   * ES6 (2015): Spread properties as experimental feature
   */
  "ExperimentalSpreadProperty": node => {
    return 6;
  },
  /**
   * NodeType: ExportAllDeclaration
   * 
   * Version history:
   * ES6 (2015): Export all declaration
   */
  "ExportAllDeclaration": node => {
    return 6;
  },
  /**
   * NodeType: ExportDefaultDeclaration
   * 
   * Version history:
   * ES6 (2015): Export default declaration
   */
  "ExportDefaultDeclaration": node => {
    return 6;
  },
  /**
   * NodeType: ExportNamedDeclaration
   * 
   * Version history:
   * ES6 (2015): Export named declaration
   */
  "ExportNamedDeclaration": node => {
    return 6;
  },
  /**
   * NodeType: ExportSpecifier
   * 
   * Version history:
   * ES6 (2015): Export specifier
   */
  "ExportSpecifier": node => {
    return 6;
  },
  /**
   * NodeType: ExpressionStatement
   * 
   * Version history:
   * ES3 (1999): Expression statements
   */
  "ExpressionStatement": node => {
    return 3;
  },
  /**
   * NodeType: ForInStatement
   * 
   * Version history:
   * ES3 (1999): For-in statement
   */
  "ForInStatement": node => {
    return 3;
  },
  /**
   * NodeType: ForOfStatement
   * 
   * Version history:
   * ES6 (2015): For-of statement
   */
  "ForOfStatement": node => {
    return 6;
  },
  /**
   * NodeType: ForStatement
   * 
   * Version history:
   * ES3 (1999): For statement
   */
  "ForStatement": node => {
    return 3;
  },
  /**
   * NodeType: FunctionDeclaration
   * 
   * Version history:
   * ES3 (1999): Function declarations
   * ES6 (2015): Generator functions
   * ES8 (2017): Async functions
   */
  "FunctionDeclaration": node => {
    if (node.async) return 8;
    if (node.generator) return 6;
    return 3;
  },
  /**
   * NodeType: FunctionExpression
   * 
   * Version history:
   * ES3 (1999): Function expressions
   * ES6 (2015): Generator functions
   * ES8 (2017): Async functions
   */
  "FunctionExpression": node => {
    if (node.async) return 8;
    if (node.generator) return 6;
    return 3;
  },
  /**
   * NodeType: Identifier
   * 
   * Version history:
   * ES3 (1999): Identifiers
   */
  "Identifier": node => {
    return 3;
  },
  /**
   * NodeType: VariableDeclaration
   * 
   * Version history:
   * ES3 (1999): "var" declerations
   * ES6 (2015): "let" and "const" declerations
   * 
   * TODO: does this need to check top level await statements? (ES2020+)
   */
  "VariableDeclaration": node => {
    if (["var"].includes(node.kind)) return 3;
    if (["let", "const"].includes(node.kind)) return 6;
  }
}

module.exports = node => {
  const type = node.type;

  if (calculators[type]) return calculators[type](node);

  // console.log("Unknown node type:", node.type, "for node:\n", node);
  return 0;
}