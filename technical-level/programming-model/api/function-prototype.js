var debug = require('debug')('function-prototoype');
var test = require('tape');
var T = this;

test('### bind - create bound function ###', function(t) {

  var module = {
    x: 2,
    getX: function () {
      return this.x;
    }
  }
  
  t.equal(2, module.getX(), 'invoke the function with module binds it as context');
  
  var f = module.getX;
  t.equal(undefined, f(), 'invoke the copy of getX with no module in front of it binds the context to global');

  var f1 = module.getX.bind(module);
  t.equal(2, f1(), 'the context could be bound to specified object');  
  
  t.end();
});

test('### bind - partial functions ###', function(t) {

  
  
  t.end();
});

test('### bind - with setTimeout ###', function(t) {

  
  
  t.end();
});

test('### bind - creating shortcuts ###', function(t) {

  
  
  t.end();
});


test('### call ###', function(t) {
  debug('The call() method calls a function with a given this value and arguments provided individually.');
  debug('Use Case: chain constructors for an object');
  debug('Use Case: invoke an anonymous function');  
  
  (function (p) {
    t.equal(1, this.a, 'calling anonymous function with call allows to set context')
    t.equal(2, p, 'calling anonymous function with call allows to set params')    
  }).call({a: 1}, 2)

  f.call(null, 1, 2)
  fStrict.call(null)

  function f(a) {
    t.deepEqual(this, global, "for function in non-strict mode, null/undefined will be replaced with the global object, and primitive values will be boxed");
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
  debug("The apply() method calls a function with a given this value and arguments provided as an array (or an array-like object).")
  debug("Use Case: To chain constructors")
  
  var items = [1, 2, 3];
  var max = Math.max.apply(null, items);
  t.equal(max, 3, "Use Case: with built-in functions");
  
  debug("Use Case: In 'monkey-patching'")
    
  t.end();
});
