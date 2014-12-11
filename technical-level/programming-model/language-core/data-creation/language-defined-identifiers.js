var debug = require('debug')('language-defined-identifiers');
var test = require('tape');

test('### Language Defined Identifiers ###', function(t) {

  t.pass('All built-in language functions are kind of accessed via their corresponding predefined identifiers');
  t.pass('For example: ');
  t.ok(Object, '"Object" identifier is used to access built-in constructor function');

  t.pass('Of particular interest are:');
  t.ok(this, "'this' built-in identifier that holds the current context");
  t.ok(arguments, "'arguments' built in identifier that holds the arguments values with which the function has been called");

  t.end();

});


test('### arguments ###', function(t) {

  one(10, 20);
  two(10, 20);
  twoStrictMode(10, 20);


  function one(x, y, z) {
    t.ok(arguments instanceof Object, 'arguments is an object that holds the values passed on function invocation');
    t.notOk(arguments.prototype, 'arguments has no prototype')    
    t.equal(2, arguments.length, 'arguments has length property that holds the number of parameters that has been passed');

    t.ok(one, "identifier that denotes enclosing function is also accessible in the scope of the function")
    t.equal(3, one.length, "its length property denote the number of the function parameters");
  }


  function two(x, y, z) {
    t.equal(10, x, 'formal identifier accessible via its name');
    t.equal(10, arguments[0], 'formal identifier accessible via arguments object and the appropriate index');
  
    t.equal(20, y, 'formal identifier accessible via its name');
    t.equal(20, arguments[1], 'formal identifier accessible via arguments object and the appropriate index');
  
    t.notOk(z, 'formal parameters that has not been passed on function invocation are undefined');
    t.notOk(arguments[2], 'formal parameters that has not been passed on function invocation are undefined');
  
    t.equal(x, arguments[0], 'formal parameter and arguments point to the same physical data');
    t.equal(y, arguments[1], 'formal parameter and arguments point to the same physical data');
    t.equal(z, arguments[2], 'formal parameter and arguments point to the same physical data');
  
    arguments[0] = 20;
    t.equal(20, arguments[0], "that is why when we change arguments[0] we also change the parameter value");
    t.equal(20, x, "formal parameter updated");
  
    z = 40;
    t.equal(40, z, "however this sharing is not valid for formal parameters that are not passed on function execution");
  
    arguments[2] = 50;
    t.equal(50, arguments[2], 'we change independently both');
    t.equal(40, z, 'arguments and the not passed formal parameter');
  }
  
  function twoStrictMode(x, y, z) {
  
    "use strict";
  
    arguments[0] = 20;
    t.equal(20, arguments[0], "formal parameter and arguments do not point to the same physical data in strict mode");
    t.equal(10, x, "that is why when we change arguments[0] we do not change the formal parameter value");
  }

  t.end();

});
