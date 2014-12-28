var debug = require('debug')('environment-lifecycle');
var test = require('tape');

test('### Function Creation Algorithm - Function Declaration, Function Expression ###', function(t) {

  debug("When function is created the following algorithm is applied");

  // F = new NativeObject();
  // F.[[Class]] = "Function"
  // F.[[Prototype]] = Function.prototype

  debug("[[Call]] is activated by call expression F()");
  // F.[[Call]] = <reference to function>

  debug("built in general constructor of objects [[Construct]] is activated via new keyword");
  debug("it is the one who allocates memory for new objects; then it calls F.[[Call]] to initialize created objects passing as 'this' value newly created object");
  //F.[[Construct]] = internalConstructor

  debug("scope chain of the current context i.e. context which creates function F");
  //F.[[Scope]] = activeContext.Scope


  debug("if this functions is created via new Function(...), then");
  //F.[[Scope]] = globalContext.Scope

  debug("There is internal difference in FD and FE related to this field see the next test");

  debug("length shows the number of formal parameters");
  //F.length = countParameters

  debug("a prototype of created by F objects");
  //__objectPrototype = new Object();
  //__objectPrototype.constructor = F // {DontEnum}, is not enumerable in loops
  //F.prototype = __objectPrototype

  //return F

  t.end();

});

test('### Function Creation - [[Scope]] Difference in Function Declarations and Function Expressions ###', function(t) {

  /* This is why, closures formed as function declarations (FD) save the VariableEnvironment component as their [[Scope]] property, 
  and function expressions (FE) save exactly LexicalEnvironment component in this case. 
  This is the main (and actually the only) reason of separation of these two, at first glance the same, components.
  Source: http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#lexical-environment */

  debug('Both VariableEnvironment and LexicalEnvironment are lexical environments');
  debug('The difference is that LE = VE + dynamic stuff created with catch, eval and with');
  debug('Initially LE = copy of VE');
  
  var a = 10;

  // Function Declaration

  function foo() {
    return a;
  }

  with({
    a: 20
  }) {

    // Function Expression
    var bar = function() {
      return a;
    };

    t.equal(10, foo(), '10, from VariableEnvrionment');
    t.equal(20, bar(), '20,  from LexicalEnvrionment'); 

  }

  t.equal(10, foo(), '10, from VariableEnvrionment');
  t.equal(20, bar(), 'still 20,  from LexicalEnvrionment'); 


  //Pseudocode
  // "foo" is created

  //foo.[[Scope]] = globalContext.[[VariableEnvironment]];

  // "with" is executed

  //previousEnvironment = globalContext.[[LexicalEnvironment]];

  //globalContext.[[LexicalEnvironment]] = {
  //  environmentRecord: {a: 20},
  //  outer: previousEnvironment
  //};

  // "bar" is created

  //bar.[[Scope]] = globalContext.[[LexicalEnvironment]];

  // "with" is completed, restore the environment

  //globalContext.[[LexicalEnvironment]] = previousEnvironment;


  t.end();

});



test('### Function Creation and Function Activation Phases ###', function(t) {


  debug("At function creation JS capture the parent environment in function object [[Scope]] property");

  debug('global "x"');
  var x = 10;

  debug('function "foo" is created relatively to the global environment');

  function foo(y) {
    var z = 30;
    return x + y + z;
  }

  // As a result of Function Creation Algorithm we have "foo" function

  //foo = functionObject {
  //  code: "console.log(x + y + z);"
  //  environment: {x: 10, outer: null}  //the environment in which is defined
  //};


  debug("At function execution JS create new environment (execution context)");

  t.equal(60, foo(20));

  // create a new environment with formal 
  // parameters and local variables (Note that this is simplified the function application creates execution context 
  // so foo.code is executed in Execution Context that holds fooEnvironment + context (the value of this variable which value depends on the way function foo is invoked))

  //fooEnvironment = {
  //  y: 20,
  //  z: 30,
  //  outer: foo.environment
  //};

  // and evaluate the code
  // of the "foo" function 

  //execute(foo.code, fooEnvironment); // 60

  t.end();

});



test('### Function Activation triggers Execution Context Creation ###', function(t) {

  function fn() {
    x
  };
  t.throws(fn, ReferenceError);

  function test() {

    debug("When test function is invoked JS creates new EC");
    debug("IT stores identifiers as properties of its Variable Environment (ES3 - Variable Object, Activation Object).");
    var x = 0;
    t.ok(x, 'x is available');
    t.equal(x, 0, 'and has value');
  }

  t.end();

});

test('### Identifiers for variable declarations ###', function(t) {

  t.notOk(p, 'identifier available but undefined');

  var p = 5;

  t.ok(p, 'it gets its value on EC execution');
  t.equal(5, p, 'correct value which is does not consider the value used in future declarations');

  var p = 6;

  t.equal(6, p, 'here value is rebound');

  t.end();
});


test('### Identifiers linked to function expressions (behave like variable declarations) ###', function(t) {

  t.notOk(p, 'Identifiers linked to function expressions are created on context creation but functions are created and bound to identifiers on context execution');

  var p = function() {
    return 5;
  }

  t.ok(p, 'now p points to the function');
  t.equal(5, p(), 'and can be invoked');

  t.end();

});

test('### Identifiers for function declarations are created on context creation and assignments are applied on context creation ###', function(t) {

  t.ok(bar, 'Identifiers for function declarations are created on context creation');
  t.equal(2, bar(), ' and value assignments are applied on context creation - see that bar can be invoked here but declared later');

  function bar() {
    return 2;
  }

  t.end();

});

test('### Identifiers for formal parameters ###', function(t) {

  function f(fp) {
    t.ok(fp, 'Identifiers for formal parameters are created and bound on context creation');
    t.equal(1, fp, 'with proper value');
  }

  f(1);
  t.end();

});
