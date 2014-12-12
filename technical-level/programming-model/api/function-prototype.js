var debug = require('debug')('array-prototoype');
var test = require('tape');
var T = this;

test('### bind ###', function(t) {
  /*
    TODO 
  */
  
  t.end();
});


test('### call ###', function(t) {
  f.call(null, 1, 2)
  fStrict.call(null)

  function f(a) {
    t.deepEqual(this, global, "if the method is a function in non-strict mode code, null and undefined will be replaced with the global object, and primitive values will be boxed");
    t.equal(1, arguments[0], "call method accepts an argument list");
    t.equal(2, arguments[1], "and values are accessible via arguments and formal parameters as usual");    
  }

  function fStrict() {
    "use strict"
    t.notOk(this, "in strict mode the value of 'this' is exactly the same as it is specified");
  }
  
  t.end();
});



test('### apply ###', function(t) {
  /*
    TODO 
  */
  
  t.end();
});
