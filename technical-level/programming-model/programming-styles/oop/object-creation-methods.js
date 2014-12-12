var debug = require('debug')('object-creation-methods');
var test = require('tape');

test('### With object literal ###', function(t) {
  var obj = {
    name: 'value',
    getName: function() {
      return this.name;
    }
  };
  t.ok(obj, 'The identifier point to the memory address where the object is stored.');
  t.equal(Object.getPrototypeOf(obj), Object.prototype, 'object prototype is correct');
  t.equal(obj.constructor, Object, 'object constructor is correct');

  t.equal(obj.name, 'value', 'JS creates identifier for each property of the object with name equal to property name')
  t.equal(typeof obj.getName, "function", 'JS creates identifier for each property even those that point to functions or nested objects')

  t.end();

});

test('### With Object.create(prototype) available from ES5 ###', function(t) {
  var obj = {
    name: 'value',
    getName: function() {
      return this.name;
    }
  };

  var newObj = Object.create(obj);
  t.equal(Object.getPrototypeOf(newObj), obj, 'the prototype of newObj is obj');
  t.equal(newObj.constructor, Object, 'the constructor is the built-in Object function');
  t.equal(newObj.name, 'value', 'properties of the prototype can be resolved via child instance');

  t.end();
});


test('### With custom constructor functions ###', function(t) {

  function Person(name) {
    this.name = name,
    this.f1 = function() {
      //Do nothing
    }
  }

  Person.prototype.f2 = function() {
    //Do nothing
  }

  var p = new Person('test');
  var p1 = new Person('test1');
  t.equal(p.name, 'test', 'Object has been created with constructor function');
  t.notEqual(p.f1, p1.f1, 'each instance has copy of it');
  t.equal(p.f2, p1.f2, 'each instance could have shared methods via prototype - useful for saving memory');


  t.end();
});
