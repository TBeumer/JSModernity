const calculators = {
  /**
   * Root node, version 0 to disregard
   */
  "Program": (node, parent) => {
    return 0;
  },
  /**
   * BlockStatement is simply a list of other statements, version 0 to disregard
   */
  "BlockStatement": (node, parent) => {
    return 0;
  },
  /**
   * EmptyStatement has no effect, only syntactically, version 0 to disregard
   */
  "EmptyStatement": (node, parent) => {
    return 0;
  },
  /**
   * NodeType: ArrayExpression
   * 
   * Version history:
   * ES3 (1999): Basic array expressions
   */
  "ArrayExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ArrayPattern
   * 
   * Version history:
   * ES6 (2015): Array destructuring
   */
  "ArrayPattern": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ArrowFunctionExpression
   * 
   * Version history:
   * ES6 (2015): Arrow functions
   */
  "ArrowFunctionExpression": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: AssignmentExpression
   * 
   * Version history:
   * ES3 (1999): Basic assignment expression: 'a = 4;'
   * ES5 (2009): Compound assignment expressions with operators: +=, -=, *=, /=, %=, <<=, >>=, >>>=, &=, |=, ^=
   * ES7 (2016): Exponentiation assignment operator: **=
   * ES12 (2021): Logical assignment expressions: ||=, &&=, ??=
   */
  "AssignmentExpression": (node, parent) => {
    if ("=" === node.operator) return 3;
    if (["+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^="].includes(node.operator)) return 5;
    if ("**=" === node.operator) return 7;
    if (["&&=", "||=", "??="].includes(node.operator)) return 12;
    
    console.warn("Unknown assignment operator:", node.operator, "in node:", node);
    return -1;
  },
  /**
   * NodeType: AssignmentPattern
   * 
   * Version history:
   * ES6 (2015): Default parameter values
   */
  "AssignmentPattern": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: AwaitExpression
   * 
   * Version history:
   * ES11 (2020): Async functions and await expressions
   */
  "AwaitExpression": (node, parent) => {
    return 8;
  },
  /**
   * NodeType: BinaryExpression
   * 
   * Version history:
   * ES3 (1999): Binary expressions with operators: +, -, *, /, %, <<, >>, >>>, &, |, ^, ==, !=, ===, !==, <, <=, >, >=, instanceof, in
   * ES7 (2016): Exponentiation operator: **
   */
  "BinaryExpression": (node, parent) => {
    if (["+", "-", "*", "/", "%", "<<", ">>", ">>>", "&", "|", "^", "==", "!=", "===", "!==", "<", "<=", ">", ">=", "instanceof", "in"].includes(node.operator)) return 3;
    if ("**" === node.operator) return 7;

    console.warn("Unknown binary operator:", node.operator, "in node:", node);
    return -1;
  },
  /**
   * NodeType: BreakStatement
   * 
   * Version history:
   * ES3 (1999): Break statement
   */
  "BreakStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: CallExpression
   * 
   * Version history:
   * ES3 (1999): Function calls
   */
  "CallExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: CatchClause
   * 
   * Version history:
   * ES3 (1999): Catch clause
   * ES10 (2019): Optional catch binding
   */
  "CatchClause": (node, parent) => {
    if (node.param) return 3;
    return 10;
  },
  /**
   * NodeType: ChainExpression
   * 
   * Version history:
   * ES11 (2020): Optional chaining
   */
  "ChainExpression": (node, parent) => {
    return 11;
  },
  /**
   * NodeType: ClassBody
   * 
   * Version history:
   * ES6 (2015): Class bodies
   */
  "ClassBody": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ClassDeclaration
   * 
   * Version history:
   * ES6 (2015): Class declarations
   */
  "ClassDeclaration": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ClassExpression
   * 
   * Version history:
   * ES6 (2015): Class expressions
   */
  "ClassExpression": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ConditionalExpression
   * 
   * Version history:
   * ES3 (1999): Conditional expressions
   */
  "ConditionalExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ContinueStatement
   * 
   * Version history:
   * ES3 (1999): Continue statement
   */
  "ContinueStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: DebuggerStatement
   * 
   * Version history:
   * ES3 (1999): Debugger statement
   */
  "DebuggerStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: DoWhileStatement
   * 
   * Version history:
   * ES3 (1999): Do-while statement
   */
  "DoWhileStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ExperimentalRestProperty
   * 
   * Version history:
   * ES6 (2015): Rest properties as experimental feature
   */
  "ExperimentalRestProperty": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExperimentalSpreadProperty
   * 
   * Version history:
   * ES6 (2015): Spread properties as experimental feature
   */
  "ExperimentalSpreadProperty": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportAllDeclaration
   * 
   * Version history:
   * ES6 (2015): Export all declaration
   */
  "ExportAllDeclaration": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportDefaultDeclaration
   * 
   * Version history:
   * ES6 (2015): Export default declaration
   */
  "ExportDefaultDeclaration": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportNamedDeclaration
   * 
   * Version history:
   * ES6 (2015): Export named declaration
   */
  "ExportNamedDeclaration": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportSpecifier
   * 
   * Version history:
   * ES6 (2015): Export specifier
   */
  "ExportSpecifier": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExpressionStatement
   * 
   * Version history:
   * ES3 (1999): Expression statements
   */
  "ExpressionStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ForInStatement
   * 
   * Version history:
   * ES3 (1999): For-in statement
   */
  "ForInStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ForOfStatement
   * 
   * Version history:
   * ES6 (2015): For-of statement
   */
  "ForOfStatement": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ForStatement
   * 
   * Version history:
   * ES3 (1999): For statement
   */
  "ForStatement": (node, parent) => {
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
  "FunctionDeclaration": (node, parent) => {
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
  "FunctionExpression": (node, parent) => {
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
  "Identifier": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: IfStatement
   * 
   * Version history:
   * ES3 (1999): If statement
   */
  "IfStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ImportAttribute
   * 
   * Version history:
   * ES16 (2025): Import attributes
   */
  "ImportAttribute": (node, parent) => {
    return 16;
  },
  /**
   * NodeType: ImportDeclaration
   * 
   * Version history:
   * ES6 (2015): Import declaration
   */
  "ImportDeclaration": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ImportDefaultSpecifier
   * 
   * Version history:
   * ES6 (2015): Import default specifier
   */
  "ImportDefaultSpecifier": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ImportExpression
   * 
   * Version history:
   * ES11 (2020): Dynamic import expressions
   */
  "ImportExpression": (node, parent) => {
    return 11;
  },
  /**
   * NodeType: ImportNamespaceSpecifier
   * 
   * Version history:
   * ES6 (2015): Import namespace specifier
   */
  "ImportNamespaceSpecifier": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ImportSpecifier
   * 
   * Version history:
   * ES6 (2015): Import specifier
   */
  "ImportSpecifier": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: LabeledStatement
   * 
   * Version history:
   * ES3 (1999): Labeled statement
   */
  "LabeledStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: Literal
   * 
   * Version history:
   * ES3 (1999): String, Integer, Decimal, Hexadecimal, Regex, Boolean, Null & Undefined literals
   * ES6 (2015): Unicode, Binary & Octal literals
   * ES11 (2020): BigInt literals
   * ES12 (2021): Numeric separators
   */
  "Literal": (node, parent) => {
    if (/^(([0-9]+)|([0-9]+\.)|(\.[0-9]+)|([0-9]+\.[0-9]+))$/g.test(node.raw)) return 3; // Integer or Decimal
    if (/^0[xX][0-9a-fA-F]+$/g.test(node.raw)) return 3; // Hexadecimal
    if (/^[0-9\.]+[eE][-+]?[0-9]+$/g.test(node.raw)) return 3; // E notation
    if (node.regex !== undefined) return 3; // Regex
    if (["true", "false", "null", "undefined"].includes(node.raw)) return 3; // Boolean, Null or Undefined
    
    // String
    if (/^'.*'$/s.test(node.raw) || /^".*"$/s.test(node.raw)) {
      if (/\\u{[0-9a-zA-Z]+}/g.test(node.raw)) return 6; // Unicode
      return 3;
    };
    
    if (/^0[bB][01]+$/g.test(node.raw)) return 6; // Binary
    if (/^0[oO][0-7]+$/g.test(node.raw)) return 6; // Octal

    if (node.bigint !== undefined) return 11; // BigInt

    // Numbers with numeric separators
    if (/^(([_0-9]+)|([_0-9]+\.)|(\.[_0-9]+)|([_0-9]+\.[_0-9]+))$/g.test(node.raw)) return 12; // Integer or Decimal
    if (/^0[xX][_0-9a-fA-F]+$/g.test(node.raw)) return 12; // Hexadecimal
    if (/^[_0-9\.]+[eE][-+]?[_0-9]+$/g.test(node.raw)) return 12; // E notation
    if (/^0[bB][_01]+$/g.test(node.raw)) return 12; // Binary
    if (/^0[oO][_0-7]+$/g.test(node.raw)) return 12; // Octal

    console.warn("Non-recognized literal value:", node.raw, "in node:", node);
    return -1;
  },
  /**
   * NodeType: LogicalExpression
   * 
   * Version history:
   * ES3 (1999): Logical expressions with operators: ||, &&
   * ES11 (2020): Nullish coalescing operator: ??
   */
  "LogicalExpression": (node, parent) => {
    if (["||", "&&"].includes(node.operator)) return 3;
    if ("??" === node.operator) return 11;

    console.warn("Unknown logical operator:", node.operator, "in node:", node);
    return -1;
  },
  /**
   * NodeType: MemberExpression
   * 
   * Version history:
   * ES3 (1999): Member expressions
   */
  "MemberExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: MetaProperty
   * 
   * Version history:
   * ES6 (2015): new.target meta property
   * ES11 (2020): import.meta meta property
   */
  "MetaProperty": (node, parent) => {
    if ("new" === node.meta.name && "target" === node.property.name) return 6;
    if ("import" === node.meta.name && "meta" === node.property.name) return 11;

    console.warn("Unknown meta property:", node.meta.name, ".", node.property.name, "in node:", node);
    return -1;
  },
  /**
   * NodeType: MethodDefinition
   * 
   * Version history:
   * ES6 (2015): Method definitions
   */
  "MethodDefinition": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: NewExpression
   * 
   * Version history:
   * ES3 (1999): New expressions
   */
  "NewExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ObjectExpression
   * 
   * Version history:
   * ES3 (1999): Object expressions
   */
  "ObjectExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ObjectPattern
   * 
   * Version history:
   * ES6 (2015): Object destructuring
   */
  "ObjectPattern": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: PrivateIdentifier
   * 
   * Version history:
   * ES13: Private class fields
   */
  "PrivateIdentifier": (node, parent) => {
    return 13;
  },
  /**
   * NodeType: Property
   * 
   * Version history:
   * ES3 (1999): Basic object properties
   * ES6 (2015): Shorthand, method and computed properties
   */
  "Property": (node, parent) => {
    if (node.shorthand || node.method || node.computed) return 6;
    return 3;
  },
  /**
   * NodeType: PropertyDefinition
   * 
   * Version history:
   * ES13: Instance and static class fields
   */
  "PropertyDefinition": (node, parent) => {
    return 13;
  },
  /**
   * NodeType: RestElement
   * 
   * Version history:
   * ES6 (2015): Rest elements in array destructuring and function parameters
   * ES9 (2018): Rest properties in object destructuring
   */
  "RestElement": (node, parent) => {
    if (["ArrayPattern", "FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(parent.type)) return 6;
    if (parent.type === "ObjectPattern") return 9;

    console.warn("Unknown rest element in parent node:", parent.type, "node:", node);
    return -1;
  },
  /**
   * NodeType: ReturnStatement
   * 
   * Version history:
   * ES3 (1999): Return statement
   */
  "ReturnStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: SequenceExpression
   * 
   * Version history:
   * ES3 (1999): Sequence expressions
   */
  "SequenceExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: SpreadElement
   * 
   * Version history:
   * ES6 (2015): Spread elements in arrays and function calls
   */
  "SpreadElement": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: StaticBlock
   * 
   * Version history:
   * ES13: Static blocks in classes
   */
  "StaticBlock": (node, parent) => {
    return 13;
  },
  /**
   * NodeType: Super
   * 
   * Version history:
   * ES6 (2015): Super keyword
   */
  "Super": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: SwitchCase
   * 
   * Version history:
   * ES3 (1999): Switch case
   */
  "SwitchCase": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: SwitchStatement
   * 
   * Version history:
   * ES3 (1999): Switch statement
   */
  "SwitchStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: TaggedTemplateExpression
   * 
   * Version history:
   * ES6 (2015): Tagged template expressions
   */
  "TaggedTemplateExpression": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: TemplateElement
   * 
   * Version history:
   * ES6 (2015): Template elements
   */
  "TemplateElement": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: TemplateLiteral
   * 
   * Version history:
   * ES6 (2015): Template literals
   */
  "TemplateLiteral": (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ThisExpression
   * 
   * Version history:
   * ES3 (1999): This keyword
   */
  "ThisExpression": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ThrowStatement
   * 
   * Version history:
   * ES3 (1999): Throw statement
   */
  "ThrowStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: TryStatement
   * 
   * Version history:
   * ES3 (1999): Try statement
   */
  "TryStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: UnaryExpression
   * 
   * Version history:
   * ES3 (1999): Unary expressions with operators: delete, void, typeof, !, ~, +, -
   */
  "UnaryExpression": (node, parent) => {
    if (["delete", "void", "typeof", "!", "~", "+", "-"].includes(node.operator)) return 3;

    console.warn("Unknown unary operator:", node.operator, "in node:", node);
    return -1;
  },
  /**
   * NodeType: UpdateExpression
   * 
   * Version history:
   * ES3 (1999): Update expressions with operators: ++, --
   */
  "UpdateExpression": (node, parent) => {
    if (["++", "--"].includes(node.operator)) return 3;

    console.warn("Unknown update operator:", node.operator, "in node:", node);
    return -1;
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
  "VariableDeclaration": (node, parent) => {
    if (["var"].includes(node.kind)) return 3;
    if (["let", "const"].includes(node.kind)) return 6;

    console.warn("Unknown variable declaration kind:", node.kind, "in node:", node);
    return -1;
  },
  /**
   * NodeType: VariableDeclarator
   * 
   * Version history:
   * ES3 (1999): Variable declarators
   */
  "VariableDeclarator": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: WhileStatement
   * 
   * Version history:
   * ES3 (1999): While statement
   */
  "WhileStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: WithStatement
   * 
   * Version history:
   * ES3 (1999): With statement
   */
  "WithStatement": (node, parent) => {
    return 3;
  },
  /**
   * NodeType: YieldExpression
   * 
   * Version history:
   * ES6 (2015): Generator functions
   */
  "YieldExpression": (node, parent) => {
    return 6;
  }
}

export default (node, parent) => {
  const type = node.type;

  if (calculators[type]) return calculators[type](node, parent);

  console.log("Unknown node type:", node.type, "for node:\n", node);
  return -1;
}