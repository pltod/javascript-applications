var debug = require('debug')('flow');
var test = require('tape');

test('### Partial Application ###', function(t) {
  var repeatedValue = 1;

  debug("Here is the flow of explaining partial application");

  function add(a, b) {
    return a + b;
  }
  
  function multiply(a, b) {
    return a * b;
  }

  function addOneTo(b) {
    return add(1, b);
  }

  t.equal(add(1, 2), 3, "simple function with two arguments");
  t.equal(add(repeatedValue, 2), 3, "we could use variable if we are going to call the same function with the same parameter value");
  t.equal(addOneTo(2), 3, "we could use specilised function if we are going to call the same function with the same parameter value");

  debug("If we need many specialised functions it is better to create them with a function factory");
  debug("Function factory could also be called a thunk");

  function makeAdd(a) {
    return function(b) {
      return a + b;
    }
  }
  
  var fAddOneTo = makeAdd(1);
  
  t.equal(fAddOneTo(2), 3, "we could use specilised function created with factory if we are going to call the same function with the same parameter value");
  
  debug('Factory that accepts not only the parameter but also the function to be applied to')
  function makeOper(fn, a) {
    return function (b) {
      return fn(a, b)
    }
  }
  
  fAddOneTo = makeOper(add, 1);
  var fMultiplyWithOne = makeOper(multiply, 1);
  
  t.equal(fAddOneTo(2), 3, "add function created with factory accepting the operation and initial value");
  t.equal(fMultiplyWithOne(2), 2, "multiply function created with factory accepting the operation and initial value");
    
  t.end();
});
