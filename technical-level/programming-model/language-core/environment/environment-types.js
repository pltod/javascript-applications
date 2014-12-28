var debug = require('debug')('environment-type');
var test = require('tape');

debug("JS has 3 environment types for data");
debug("Global Environment");
debug("Local Environment");
debug("Dynamic Environment");

eval('var GLOBAL_EVAL = 2;');

test('### Global Environment ###', function(t) {

  GLOBAL_VAR = 1;
  GLOBAL_OBJ = {};
  GLOBAL_FUNC = function globalFunc() {};


  debug("Note that global.GLOBAL_VAR is not defined directly");
  t.equal(1, GLOBAL_VAR);
  t.strictEqual(GLOBAL_VAR, global.GLOBAL_VAR, 'var is omitted and the value is set to global environment property');

  debug("Note that global.GLOBAL_OBJ is not defined directly");
  t.strictEqual(GLOBAL_OBJ, global.GLOBAL_OBJ, 'var is omitted and the value is set to global environment property');

  debug("Note that global.GLOBAL_FUNC is not defined directly");
  t.strictEqual(GLOBAL_FUNC, global.GLOBAL_FUNC, 'var is omitted and the value is set to global environment property');

  t.end();

});

test('### Local Environment ###', function(t) {

  debug("Function Declaration...")

  function local() {
    var localVar = 1;
    t.equal(1, localVar, "JS creates new local environment on each function activation/appliation");
    t.notOk(global.localVar, "localVar is part of new local environment it is not bound in the global environment");
  }

  debug("Function Activation...");
  local();

  t.end();

});

test('### Dynamic Environment - eval statements in GE ###', function(t) {

  debug("JS creates dynamic environment when using eval, with and catch statements")
  debug("called in GE eval leaks data into GE depending on the engine")
  t.notOk(global.GLOBAL_EVAL, "eval statements invoked in Global Environment does not leak data into Global Environment");

  t.end();

});

test('### Dynamic Environment - eval statements in LE non-strict mode ###', function(t) {

  eval('function x(){}');
  t.ok(x, "eval function invoked in Local Environments creates data into the calling Environment");
  t.end();

});

test('### Dynamic Environment - eval statements in LE strict mode ###', function(t) {

  "use strict";

  eval('function x(){}');
  function getX() {
    return x;
  }
  t.throws(getX, ReferenceError, "in strict mode eval function invoked in Local Environments does not leave data into the calling Environment");

  t.end();

});


test('### Dynamic Environment - eval statements in LE strict mode ###', function(t) {
  
  debug("eval 1) creates new Execution Context and 2) hoisting principles are valid, but 3) sets identifiers into caller environment");

  t.equal(typeof x, 'function', 'function definition is hoisted');
  var x = 10;
  t.equal(10, x, "During runtime identifier 'x' is rebound");
  function x() {};
  t.notEqual(typeof x, 'function', "And now 'x' is not a function anymore");

  eval('t.equal(typeof x, "function", "inside eval x is function again because it is inside a newly created execution context where hoisting principles are still working");var x = 20;t.equal(20, x);function x() {}');
  t.equal(20, x, "but then x seems rebounded into caller EC environment");

  t.end();
});

test('### Dynamic Environment - eval statements and scope chain resolution ###', function(t) {

  "use strict";
  var y = 50;
  eval('t.equal(50, y, "Execution Context created by eval is using properly the scope chain to resolve identifiers from parent execution context");');

  t.end();

});
