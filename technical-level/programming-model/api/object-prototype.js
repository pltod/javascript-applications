var debug = require('debug')('object-prototoype');
var test = require('tape');

test('### Object.create() ###', function(t) {
  t.throws(Object.create, TypeError, 'Object.create could only be invoked with null or obj that plays prototype role');
  t.end();
});

test('### Object.create(null) ###', function(t) {
  var v = Object.create(null);
  t.notOk(Object.getPrototypeOf(v), "the created object has not prototype");
  t.end();
});

test('### Object.create(prototype) ###', function(t) {
  var obj = {
    prop: "test"
  }
  
  var v = Object.create(obj);
  t.deepEqual(obj, v.__proto__, "The Object.create() method creates a new object with the specified prototype object and properties.");
  t.deepEqual(obj, Object.getPrototypeOf(v), "Or use the better way of taking the object's prototype");
  
  t.end();
});
