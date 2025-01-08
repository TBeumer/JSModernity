import { supportedEcmaVersions } from "espree";

const calculators = {
  /**
   * Root node, version 0 to disregard
   */
  Program: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 0: ["common"] },
  },
  /**
   * BlockStatement is simply a list of other statements, version null to disregard
   */
  BlockStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 0: ["common"] },
  },
  /**
   * EmptyStatement has no effect, only syntactically, version null to disregard
   */
  EmptyStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 0: ["common"] },
  },
  /**
   * NodeType: ArrayExpression
   *
   * Version history:
   * ES3 (1999): Basic array expressions
   */
  ArrayExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ArrayPattern
   *
   * Version history:
   * ES6 (2015): Array destructuring
   */
  ArrayPattern: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ArrowFunctionExpression
   *
   * Version history:
   * ES6 (2015): Arrow functions
   */
  ArrowFunctionExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
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
  AssignmentExpression: {
    getSubType: (node, parent) => {
      if (["="].includes(node.operator)) 
        return 3, node.operator;
      if (["+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^="].includes(node.operator))
        return 5, node.operator;
      if (["**="].includes(node.operator)) 
        return 7, node.operator;
      if (["&&=", "||=", "??="].includes(node.operator))
        return 12, node.operator;

      console.warn("Unknown assignment operator:", node.operator, "in node:", node);
      return -1, undefined;
    },
    allSubTypes: { 
      3: ["="], 
      5: ["+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^="], 
      7: ["**="], 
      8: ["&&=", "||=", "??="],
    },
  },
  /**
   * NodeType: AssignmentPattern
   *
   * Version history:
   * ES6 (2015): Default parameter values
   */
  AssignmentPattern: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: AwaitExpression
   *
   * Version history:
   * ES11 (2020): Async functions and await expressions
   */
  AwaitExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 8: ["common"] },
  },
  /**
   * NodeType: BinaryExpression
   *
   * Version history:
   * ES3 (1999): Binary expressions with operators: +, -, *, /, %, <<, >>, >>>, &, |, ^, ==, !=, ===, !==, <, <=, >, >=, instanceof, in
   * ES7 (2016): Exponentiation operator: **
   */
  BinaryExpression: {
    getSubType: (node, parent) => {
      if (["+", "-", "*", "/", "%", "<<", ">>", ">>>", "&", "|", "^", "==", "!=", "===", "!==", "<", "<=", ">", ">=", "instanceof", "in"].includes(node.operator))
        return node.operator;
      if (["**"].includes(node.operator)) 
        return node.operator;

      console.warn("Unknown binary operator:", node.operator, "in node:", node);
      return undefined;
    },
    allSubTypes: {
      3: ["+", "-", "*", "/", "%", "<<", ">>", ">>>", "&", "|", "^", "==", "!=", "===", "!==", "<", "<=", ">", ">=", "instanceof", "in"], 
      7: ["**"],
    },
  },
  /**
   * NodeType: BreakStatement
   *
   * Version history:
   * ES3 (1999): Break statement
   */
  BreakStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: CallExpression
   *
   * Version history:
   * ES3 (1999): Function calls
   */
  CallExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: CatchClause
   *
   * Version history:
   * ES3 (1999): Catch clause
   * ES10 (2019): Optional catch binding
   */
  CatchClause: {
    getSubType: (node, parent) => {
      if (node.param) 
        return "common";
      return "no-param";
    },
    allSubTypes: {
      3: ["common"], 
      10: ["no-param"],
    },
  },
  /**
   * NodeType: ChainExpression
   *
   * Version history:
   * ES11 (2020): Optional chaining
   */
  ChainExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 11: ["common"] },
  },
  /**
   * NodeType: ClassBody
   *
   * Version history:
   * ES6 (2015): Class bodies
   */
  ClassBody: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ClassDeclaration
   *
   * Version history:
   * ES6 (2015): Class declarations
   */
  ClassDeclaration: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ClassExpression
   *
   * Version history:
   * ES6 (2015): Class expressions
   */
  ClassExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ConditionalExpression
   *
   * Version history:
   * ES3 (1999): Conditional expressions
   */
  ConditionalExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ContinueStatement
   *
   * Version history:
   * ES3 (1999): Continue statement
   */
  ContinueStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: DebuggerStatement
   *
   * Version history:
   * ES3 (1999): Debugger statement
   */
  DebuggerStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: DoWhileStatement
   *
   * Version history:
   * ES3 (1999): Do-while statement
   */
  DoWhileStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ExperimentalRestProperty
   *
   * Version history:
   * ES6 (2015): Rest properties as experimental feature
   */
  ExperimentalRestProperty: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ExperimentalSpreadProperty
   *
   * Version history:
   * ES6 (2015): Spread properties as experimental feature
   */
  ExperimentalSpreadProperty: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ExportAllDeclaration
   *
   * Version history:
   * ES6 (2015): Export all declaration
   */
  ExportAllDeclaration: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ExportDefaultDeclaration
   *
   * Version history:
   * ES6 (2015): Export default declaration
   */
  ExportDefaultDeclaration: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ExportNamedDeclaration
   *
   * Version history:
   * ES6 (2015): Export named declaration
   */
  ExportNamedDeclaration: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ExportSpecifier
   *
   * Version history:
   * ES6 (2015): Export specifier
   */
  ExportSpecifier: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ExpressionStatement
   *
   * Version history:
   * ES3 (1999): Expression statements
   */
  ExpressionStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ForInStatement
   *
   * Version history:
   * ES3 (1999): For-in statement
   */
  ForInStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ForOfStatement
   *
   * Version history:
   * ES6 (2015): For-of statement
   */
  ForOfStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ForStatement
   *
   * Version history:
   * ES3 (1999): For statement
   */
  ForStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: FunctionDeclaration
   *
   * Version history:
   * ES3 (1999): Function declarations
   * ES6 (2015): Generator functions
   * ES8 (2017): Async functions
   */
  FunctionDeclaration: {
    getSubType: (node, parent) => {
      if (node.async) 
        return "async";
      if (node.generator) 
        return "generator";
      return "common";
    },
    allSubTypes: {
      8: ["async"], 
      6: ["generator"], 
      3: ["common"],
    },
  },
  /**
   * NodeType: FunctionExpression
   *
   * Version history:
   * ES3 (1999): Function expressions
   * ES6 (2015): Generator functions
   * ES8 (2017): Async functions
   */
  FunctionExpression: {
    getSubType: (node, parent) => {
      if (node.async) 
        return "async";
      if (node.generator) 
        return "generator";
      return "common";
    },
    allSubTypes: {
      8: ["async"], 
      6: ["generator"], 
      3: ["common"],
    },
  },
  /**
   * NodeType: Identifier
   *
   * Version history:
   * ES3 (1999): Identifiers
   */
  Identifier: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: IfStatement
   *
   * Version history:
   * ES3 (1999): If statement
   */
  IfStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ImportAttribute
   *
   * Version history:
   * ES16 (2025): Import attributes
   */
  ImportAttribute: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 16: ["common"] },
  },
  /**
   * NodeType: ImportDeclaration
   *
   * Version history:
   * ES6 (2015): Import declaration
   */
  ImportDeclaration: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ImportDefaultSpecifier
   *
   * Version history:
   * ES6 (2015): Import default specifier
   */
  ImportDefaultSpecifier: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ImportExpression
   *
   * Version history:
   * ES11 (2020): Dynamic import expressions
   */
  ImportExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 11: ["common"] },
  },
  /**
   * NodeType: ImportNamespaceSpecifier
   *
   * Version history:
   * ES6 (2015): Import namespace specifier
   */
  ImportNamespaceSpecifier: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ImportSpecifier
   *
   * Version history:
   * ES6 (2015): Import specifier
   */
  ImportSpecifier: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: LabeledStatement
   *
   * Version history:
   * ES3 (1999): Labeled statement
   */
  LabeledStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
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
  Literal: {
    getSubType: (node, parent) => {
      // Integer or Decimal
      if (/^(([0-9]+)|([0-9]+\.)|(\.[0-9]+)|([0-9]+\.[0-9]+))$/g.test(node.raw))
        return 3, "integer-decimal";

      // Hexadecimal
      if (/^0[xX][0-9a-fA-F]+$/g.test(node.raw)) 
        return 3, "hexadecimal";

      // E notation
      if (/^[0-9\.]+[eE][-+]?[0-9]+$/g.test(node.raw)) 
        return 3, "e-notation";

      // Regex
      if (node.regex !== undefined) 
        return 3, "regex";

      // Boolean
      if (["true", "false"].includes(node.raw))
        return 3, "boolean";

      // Null or Undefined
      if (["null", "undefined"].includes(node.raw)) 
        return 3, node.raw;

      // String (with or without unicode)
      if (/^'.*'$/s.test(node.raw) || /^".*"$/s.test(node.raw)) {
        if (/\\u{[0-9a-zA-Z]+}/g.test(node.raw)) 
          return 6, "unicode";
        return 3, "string";
      }

      // Binary
      if (/^0[bB][01]+$/g.test(node.raw)) 
        return 6, "binary";

      // Octal
      if (/^0[oO][0-7]+$/g.test(node.raw)) 
        return 6, "octal";

      // BigInt
      if (node.bigint !== undefined) 
        return 11, "bigint";

      // Numeric separators
      if (
        /^(([_0-9]+)|([_0-9]+\.)|(\.[_0-9]+)|([_0-9]+\.[_0-9]+))$/g.test(node.raw) ||
        /^0[xX][_0-9a-fA-F]+$/g.test(node.raw) ||
        /^[_0-9\.]+[eE][-+]?[_0-9]+$/g.test(node.raw) ||
        /^0[bB][_01]+$/g.test(node.raw) ||
        /^0[oO][_0-7]+$/g.test(node.raw)
      )
        return 12, "numeric-seperator";

      console.warn("Non-recognized literal value:", node.raw, "in node:", node);
      return -1, undefined;
    },
    allSubTypes: {
      3: ["integer-decimal", "hexadecimal", "e-notation", "regex", "boolean", "null", "undefined", "string"], 
      6: ["unicode", "binary", "octal"], 
      11: ["bigint"], 
      12: ["numeric-seperator"],
    },
  },
  /**
   * NodeType: LogicalExpression
   *
   * Version history:
   * ES3 (1999): Logical expressions with operators: ||, &&
   * ES11 (2020): Nullish coalescing operator: ??
   */
  LogicalExpression: {
    getSubType: (node, parent) => {
      if (["||", "&&"].includes(node.operator))
        return node.operator;
      if (["??"].includes(node.operator)) 
        return node.operator;

      console.warn("Unknown logical operator:", node.operator, "in node:", node);
      return undefined;
    },
    allSubTypes: { 
      3: ["||", "&&"], 
      11: ["??"] 
    },
  },
  /**
   * NodeType: MemberExpression
   *
   * Version history:
   * ES3 (1999): Member expressions
   */
  MemberExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: MetaProperty
   *
   * Version history:
   * ES6 (2015): new.target meta property
   * ES11 (2020): import.meta meta property
   */
  MetaProperty: {
    getSubType: (node, parent) => {
      if (node.meta.name === "new" && node.property.name === "target") 
        return "new-target";
      if (node.meta.name === "import" && node.property.name === "meta") 
        return "import-meta";

      console.warn("Unknown meta property:", node.meta.name, node.property.name, "in node:", node);
      return undefined;
    },
    allSubTypes: { 
      6: ["new-target"], 
      11: ["import-meta"] 
    },
  },
  /**
   * NodeType: MethodDefinition
   * 
   * Version history:
   * ES6 (2015): Method definitions
   */
  MethodDefinition: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: NewExpression
   *
   * Version history:
   * ES3 (1999): New expressions
   */
  NewExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ObjectExpression
   *
   * Version history:
   * ES3 (1999): Object expressions
   */
  ObjectExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ObjectPattern
   *
   * Version history:
   * ES6 (2015): Object destructuring
   */
  ObjectPattern: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: PrivateIdentifier
   *
   * Version history:
   * ES13: Private class fields
   */
  PrivateIdentifier: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 13: ["common"] },
  },
  /**
   * NodeType: Property
   *
   * Version history:
   * ES3 (1999): Basic object properties
   * ES6 (2015): Shorthand, method and computed properties
   */
  Property: {
    getSubType: (node, parent) => {
      if (node.shorthand) 
        return "shorthand";
      if (node.method) 
        return "method";
      if (node.computed) 
        return "computed";
      return "common";
    },
    allSubTypes: { 
      3: ["common"], 
      6: ["shorthand", "method", "computed"] 
    },
  },
  /**
   * NodeType: PropertyDefinition
   *
   * Version history:
   * ES13: Instance and static class fields
   */
  PropertyDefinition: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 13: ["common"] },
  },
  /**
   * NodeType: RestElement
   *
   * Version history:
   * ES6 (2015): Rest elements in array destructuring and function parameters
   * ES9 (2018): Rest properties in object destructuring
   */
  RestElement: {
    getSubType: (node, parent) => {
      if (["ArrayPattern"].includes(parent.type))
        return "array";
        
      if (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(parent.type))
        return "function";

      if (["ObjectPattern"].includes(parent.type))
        return "object";

      console.warn("Unknown rest element type:", node.type, "in node:", node);
      return undefined;
    },
    allSubTypes: { 
      6: ["array", "function"], 
      9: ["object"] 
    },
  },
  /**
   * NodeType: ReturnStatement
   *
   * Version history:
   * ES3 (1999): Return statement
   */
  ReturnStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: SequenceExpression
   *
   * Version history:
   * ES3 (1999): Sequence expressions
   */
  SequenceExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: SpreadElement
   *
   * Version history:
   * ES6 (2015): Spread elements in array literals and function calls
   */
  SpreadElement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: StaticBlock
   *
   * Version history:
   * ES13: Static blocks in classes
   */
  StaticBlock: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 13: ["common"] },
  },
  /**
   * NodeType: Super
   *
   * Version history:
   * ES6 (2015): Super keyword
   */
  Super: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: SwitchCase
   *
   * Version history:
   * ES3 (1999): Switch case
   */
  SwitchCase: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: SwitchStatement
   *
   * Version history:
   * ES3 (1999): Switch statement
   */
  SwitchStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: TaggedTemplateExpression
   *
   * Version history:
   * ES6 (2015): Tagged template expressions
   */
  TaggedTemplateExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: TemplateElement
   *
   * Version history:
   * ES6 (2015): Template elements
   */
  TemplateElement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: TemplateLiteral
   *
   * Version history:
   * ES6 (2015): Template literals
   */
  TemplateLiteral: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
  /**
   * NodeType: ThisExpression
   *
   * Version history:
   * ES3 (1999): This keyword
   */
  ThisExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: ThrowStatement
   *
   * Version history:
   * ES3 (1999): Throw statement
   */
  ThrowStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: TryStatement
   *
   * Version history:
   * ES3 (1999): Try statement
   */
  TryStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: UnaryExpression
   *
   * Version history:
   * ES3 (1999): Unary expressions with operators: +, -, ~, !, delete, void, typeof
   */
  UnaryExpression: {
    getSubType: (node, parent) => {
      if (["+","-","~","!","delete","void","typeof"].includes(node.operator)) 
        return node.operator;

      console.warn("Unknown unary operator:", node.operator, "in node:", node);
      return undefined;
    },
    allSubTypes: { 3: ["+", "-", "~", "!", "delete", "void", "typeof"] },
  },
  /**
   * NodeType: UpdateExpression
   *
   * Version history:
   * ES3 (1999): Update expressions with operators: ++, --
   */
  UpdateExpression: {
    getSubType: (node, parent) => {
      if (["++", "--"].includes(node.operator)) 
        return node.operator;

      console.warn("Unknown update operator:", node.operator, "in node:", node);
      return undefined;
    },
    allSubTypes: { 3: ["++", "--"] },
  },
  /**
   * NodeType: VariableDeclaration
   *
   * Version history:
   * ES3 (1999): "var" declerations
   * ES6 (2015): "let" and "const" declerations
   */
  VariableDeclaration: {
    getSubType: (node, parent) => {
      if (["var"].includes(node.kind)) 
        return "var";
      if (["let", "const"].includes(node.kind)) 
        return node.kind;

      console.warn("Unknown variable declaration kind:", node.kind, "in node:", node);
      return undefined;
    },
    allSubTypes: { 
      3: ["var"], 
      6: ["let", "const"] 
    },
  },
  /**
   * NodeType: VariableDeclarator
   *
   * Version history:
   * ES3 (1999): Variable declarators
   */
  VariableDeclarator: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: WhileStatement
   *
   * Version history:
   * ES3 (1999): While statement
   */
  WhileStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: WithStatement
   *
   * Version history:
   * ES3 (1999): With statement
   */
  WithStatement: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 3: ["common"] },
  },
  /**
   * NodeType: YieldExpression
   *
   * Version history:
   * ES6 (2015): Generator functions
   */
  YieldExpression: {
    getSubType: (node, parent) => {
      return "common";
    },
    allSubTypes: { 6: ["common"] },
  },
};

const calculatorsOLD = {
  /**
   * Root node, version 0 to disregard
   */
  Program: (node, parent) => {
    return 0;
  },
  /**
   * BlockStatement is simply a list of other statements, version 0 to disregard
   */
  BlockStatement: (node, parent) => {
    return 0;
  },
  /**
   * EmptyStatement has no effect, only syntactically, version 0 to disregard
   */
  EmptyStatement: (node, parent) => {
    return 0;
  },
  /**
   * NodeType: ArrayExpression
   *
   * Version history:
   * ES3 (1999): Basic array expressions
   */
  ArrayExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ArrayPattern
   *
   * Version history:
   * ES6 (2015): Array destructuring
   */
  ArrayPattern: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ArrowFunctionExpression
   *
   * Version history:
   * ES6 (2015): Arrow functions
   */
  ArrowFunctionExpression: (node, parent) => {
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
  AssignmentExpression: (node, parent) => {
    if ("=" === node.operator) return 3;
    if (
      [
        "+=",
        "-=",
        "*=",
        "/=",
        "%=",
        "<<=",
        ">>=",
        ">>>=",
        "&=",
        "|=",
        "^=",
      ].includes(node.operator)
    )
      return 5;
    if ("**=" === node.operator) return 7;
    if (["&&=", "||=", "??="].includes(node.operator)) return 12;

    console.warn(
      "Unknown assignment operator:",
      node.operator,
      "in node:",
      node
    );
    return -1;
  },
  /**
   * NodeType: AssignmentPattern
   *
   * Version history:
   * ES6 (2015): Default parameter values
   */
  AssignmentPattern: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: AwaitExpression
   *
   * Version history:
   * ES11 (2020): Async functions and await expressions
   */
  AwaitExpression: (node, parent) => {
    return 8;
  },
  /**
   * NodeType: BinaryExpression
   *
   * Version history:
   * ES3 (1999): Binary expressions with operators: +, -, *, /, %, <<, >>, >>>, &, |, ^, ==, !=, ===, !==, <, <=, >, >=, instanceof, in
   * ES7 (2016): Exponentiation operator: **
   */
  BinaryExpression: (node, parent) => {
    if (
      [
        "+",
        "-",
        "*",
        "/",
        "%",
        "<<",
        ">>",
        ">>>",
        "&",
        "|",
        "^",
        "==",
        "!=",
        "===",
        "!==",
        "<",
        "<=",
        ">",
        ">=",
        "instanceof",
        "in",
      ].includes(node.operator)
    )
      return 3;
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
  BreakStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: CallExpression
   *
   * Version history:
   * ES3 (1999): Function calls
   */
  CallExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: CatchClause
   *
   * Version history:
   * ES3 (1999): Catch clause
   * ES10 (2019): Optional catch binding
   */
  CatchClause: (node, parent) => {
    if (node.param) return 3;
    return 10;
  },
  /**
   * NodeType: ChainExpression
   *
   * Version history:
   * ES11 (2020): Optional chaining
   */
  ChainExpression: (node, parent) => {
    return 11;
  },
  /**
   * NodeType: ClassBody
   *
   * Version history:
   * ES6 (2015): Class bodies
   */
  ClassBody: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ClassDeclaration
   *
   * Version history:
   * ES6 (2015): Class declarations
   */
  ClassDeclaration: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ClassExpression
   *
   * Version history:
   * ES6 (2015): Class expressions
   */
  ClassExpression: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ConditionalExpression
   *
   * Version history:
   * ES3 (1999): Conditional expressions
   */
  ConditionalExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ContinueStatement
   *
   * Version history:
   * ES3 (1999): Continue statement
   */
  ContinueStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: DebuggerStatement
   *
   * Version history:
   * ES3 (1999): Debugger statement
   */
  DebuggerStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: DoWhileStatement
   *
   * Version history:
   * ES3 (1999): Do-while statement
   */
  DoWhileStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ExperimentalRestProperty
   *
   * Version history:
   * ES6 (2015): Rest properties as experimental feature
   */
  ExperimentalRestProperty: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExperimentalSpreadProperty
   *
   * Version history:
   * ES6 (2015): Spread properties as experimental feature
   */
  ExperimentalSpreadProperty: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportAllDeclaration
   *
   * Version history:
   * ES6 (2015): Export all declaration
   */
  ExportAllDeclaration: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportDefaultDeclaration
   *
   * Version history:
   * ES6 (2015): Export default declaration
   */
  ExportDefaultDeclaration: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportNamedDeclaration
   *
   * Version history:
   * ES6 (2015): Export named declaration
   */
  ExportNamedDeclaration: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExportSpecifier
   *
   * Version history:
   * ES6 (2015): Export specifier
   */
  ExportSpecifier: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ExpressionStatement
   *
   * Version history:
   * ES3 (1999): Expression statements
   */
  ExpressionStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ForInStatement
   *
   * Version history:
   * ES3 (1999): For-in statement
   */
  ForInStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ForOfStatement
   *
   * Version history:
   * ES6 (2015): For-of statement
   */
  ForOfStatement: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ForStatement
   *
   * Version history:
   * ES3 (1999): For statement
   */
  ForStatement: (node, parent) => {
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
  FunctionDeclaration: (node, parent) => {
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
  FunctionExpression: (node, parent) => {
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
  Identifier: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: IfStatement
   *
   * Version history:
   * ES3 (1999): If statement
   */
  IfStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ImportAttribute
   *
   * Version history:
   * ES16 (2025): Import attributes
   */
  ImportAttribute: (node, parent) => {
    return 16;
  },
  /**
   * NodeType: ImportDeclaration
   *
   * Version history:
   * ES6 (2015): Import declaration
   */
  ImportDeclaration: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ImportDefaultSpecifier
   *
   * Version history:
   * ES6 (2015): Import default specifier
   */
  ImportDefaultSpecifier: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ImportExpression
   *
   * Version history:
   * ES11 (2020): Dynamic import expressions
   */
  ImportExpression: (node, parent) => {
    return 11;
  },
  /**
   * NodeType: ImportNamespaceSpecifier
   *
   * Version history:
   * ES6 (2015): Import namespace specifier
   */
  ImportNamespaceSpecifier: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ImportSpecifier
   *
   * Version history:
   * ES6 (2015): Import specifier
   */
  ImportSpecifier: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: LabeledStatement
   *
   * Version history:
   * ES3 (1999): Labeled statement
   */
  LabeledStatement: (node, parent) => {
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
  Literal: (node, parent) => {
    if (/^(([0-9]+)|([0-9]+\.)|(\.[0-9]+)|([0-9]+\.[0-9]+))$/g.test(node.raw))
      return 3; // Integer or Decimal
    if (/^0[xX][0-9a-fA-F]+$/g.test(node.raw)) return 3; // Hexadecimal
    if (/^[0-9\.]+[eE][-+]?[0-9]+$/g.test(node.raw)) return 3; // E notation
    if (node.regex !== undefined) return 3; // Regex
    if (["true", "false", "null", "undefined"].includes(node.raw)) return 3; // Boolean, Null or Undefined

    // String
    if (/^'.*'$/s.test(node.raw) || /^".*"$/s.test(node.raw)) {
      if (/\\u{[0-9a-zA-Z]+}/g.test(node.raw)) return 6; // Unicode
      return 3;
    }

    if (/^0[bB][01]+$/g.test(node.raw)) return 6; // Binary
    if (/^0[oO][0-7]+$/g.test(node.raw)) return 6; // Octal

    if (node.bigint !== undefined) return 11; // BigInt

    // Numbers with numeric separators
    if (
      /^(([_0-9]+)|([_0-9]+\.)|(\.[_0-9]+)|([_0-9]+\.[_0-9]+))$/g.test(node.raw)
    )
      return 12; // Integer or Decimal
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
  LogicalExpression: (node, parent) => {
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
  MemberExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: MetaProperty
   *
   * Version history:
   * ES6 (2015): new.target meta property
   * ES11 (2020): import.meta meta property
   */
  MetaProperty: (node, parent) => {
    if ("new" === node.meta.name && "target" === node.property.name) return 6;
    if ("import" === node.meta.name && "meta" === node.property.name) return 11;

    console.warn(
      "Unknown meta property:",
      node.meta.name,
      ".",
      node.property.name,
      "in node:",
      node
    );
    return -1;
  },
  /**
   * NodeType: MethodDefinition
   *
   * Version history:
   * ES6 (2015): Method definitions
   */
  MethodDefinition: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: NewExpression
   *
   * Version history:
   * ES3 (1999): New expressions
   */
  NewExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ObjectExpression
   *
   * Version history:
   * ES3 (1999): Object expressions
   */
  ObjectExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ObjectPattern
   *
   * Version history:
   * ES6 (2015): Object destructuring
   */
  ObjectPattern: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: PrivateIdentifier
   *
   * Version history:
   * ES13: Private class fields
   */
  PrivateIdentifier: (node, parent) => {
    return 13;
  },
  /**
   * NodeType: Property
   *
   * Version history:
   * ES3 (1999): Basic object properties
   * ES6 (2015): Shorthand, method and computed properties
   */
  Property: (node, parent) => {
    if (node.shorthand || node.method || node.computed) return 6;
    return 3;
  },
  /**
   * NodeType: PropertyDefinition
   *
   * Version history:
   * ES13: Instance and static class fields
   */
  PropertyDefinition: (node, parent) => {
    return 13;
  },
  /**
   * NodeType: RestElement
   *
   * Version history:
   * ES6 (2015): Rest elements in array destructuring and function parameters
   * ES9 (2018): Rest properties in object destructuring
   */
  RestElement: (node, parent) => {
    if (
      [
        "ArrayPattern",
        "FunctionDeclaration",
        "FunctionExpression",
        "ArrowFunctionExpression",
      ].includes(parent.type)
    )
      return 6;
    if (parent.type === "ObjectPattern") return 9;

    console.warn(
      "Unknown rest element in parent node:",
      parent.type,
      "node:",
      node
    );
    return -1;
  },
  /**
   * NodeType: ReturnStatement
   *
   * Version history:
   * ES3 (1999): Return statement
   */
  ReturnStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: SequenceExpression
   *
   * Version history:
   * ES3 (1999): Sequence expressions
   */
  SequenceExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: SpreadElement
   *
   * Version history:
   * ES6 (2015): Spread elements in arrays and function calls
   */
  SpreadElement: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: StaticBlock
   *
   * Version history:
   * ES13: Static blocks in classes
   */
  StaticBlock: (node, parent) => {
    return 13;
  },
  /**
   * NodeType: Super
   *
   * Version history:
   * ES6 (2015): Super keyword
   */
  Super: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: SwitchCase
   *
   * Version history:
   * ES3 (1999): Switch case
   */
  SwitchCase: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: SwitchStatement
   *
   * Version history:
   * ES3 (1999): Switch statement
   */
  SwitchStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: TaggedTemplateExpression
   *
   * Version history:
   * ES6 (2015): Tagged template expressions
   */
  TaggedTemplateExpression: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: TemplateElement
   *
   * Version history:
   * ES6 (2015): Template elements
   */
  TemplateElement: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: TemplateLiteral
   *
   * Version history:
   * ES6 (2015): Template literals
   */
  TemplateLiteral: (node, parent) => {
    return 6;
  },
  /**
   * NodeType: ThisExpression
   *
   * Version history:
   * ES3 (1999): This keyword
   */
  ThisExpression: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: ThrowStatement
   *
   * Version history:
   * ES3 (1999): Throw statement
   */
  ThrowStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: TryStatement
   *
   * Version history:
   * ES3 (1999): Try statement
   */
  TryStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: UnaryExpression
   *
   * Version history:
   * ES3 (1999): Unary expressions with operators: delete, void, typeof, !, ~, +, -
   */
  UnaryExpression: (node, parent) => {
    if (
      ["delete", "void", "typeof", "!", "~", "+", "-"].includes(node.operator)
    )
      return 3;

    console.warn("Unknown unary operator:", node.operator, "in node:", node);
    return -1;
  },
  /**
   * NodeType: UpdateExpression
   *
   * Version history:
   * ES3 (1999): Update expressions with operators: ++, --
   */
  UpdateExpression: (node, parent) => {
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
  VariableDeclaration: (node, parent) => {
    if (["var"].includes(node.kind)) return 3;
    if (["let", "const"].includes(node.kind)) return 6;

    console.warn(
      "Unknown variable declaration kind:",
      node.kind,
      "in node:",
      node
    );
    return -1;
  },
  /**
   * NodeType: VariableDeclarator
   *
   * Version history:
   * ES3 (1999): Variable declarators
   */
  VariableDeclarator: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: WhileStatement
   *
   * Version history:
   * ES3 (1999): While statement
   */
  WhileStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: WithStatement
   *
   * Version history:
   * ES3 (1999): With statement
   */
  WithStatement: (node, parent) => {
    return 3;
  },
  /**
   * NodeType: YieldExpression
   *
   * Version history:
   * ES6 (2015): Generator functions
   */
  YieldExpression: (node, parent) => {
    return 6;
  },
};

/**
 * Returns the maximum amount of unique features that can
 * be detected for all supported versions of ECMAScript
 */
export const getDetectableFeatureCountPerVersion = () => {
  const emptySignature = supportedEcmaVersions.reduce((o, key) => ({ ...o, [key]: 0 }), {});

  return Object.keys(calculators).reduce((acc, key) => {
    const subTypes = calculators[key].allSubTypes;

    for (const version in subTypes) {
      if (version === "0") continue;

      acc[version] += subTypes[version].length;
    }

    return acc;
  }, emptySignature);
};

/**
 * Get the version of a node type + sub type combination
 * 
 * @param {string} type Node type
 * @param {string} subType Node sub type
 * @returns {number} Version number or null if not found
 */
export const getVersion = (type, subType) => {
  const subTypes = calculators[type].allSubTypes;

  for (const version in subTypes) {
    if (subTypes[version].includes(subType)) return version;
  }

  return null;
};

/**
 * Get the type of a node
 * 
 * @param {Object} node Node object
 * @returns {string} Type of the node
 */
export const getType = (node) => {
  return node.type;
};

/**
 * Get the sub type of a node
 * 
 * @param {Object} node Node object
 * @param {Object} parent Parent node object
 * @returns {string} Sub type of the node or undefined if not found
 */
export const getSubType = (node, parent) => {
  const type = getType(node);

  if (!calculators[type]) undefined;
    
  return calculators[type].getSubType(node, parent);
};
