var debug = require('debug')('functions-created-with-constructor');
var test = require('tape');

test('### functions created with new ###', function(t) {
  var x = 20;

  var f = function() {
    return x;
  };
  var bar = new Function('return x');

  t.equal(f(), 20, "the scope of functions created with with literal or expression is lexical");
  t.throws(bar, ReferenceError, "the scope of functions created with new is global scope");

  t.end();
});
