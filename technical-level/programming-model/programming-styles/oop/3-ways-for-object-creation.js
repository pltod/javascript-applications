var debug = require('debug')('object-creation-methods');
var test = require('tape');

test('### Data holder - with object literal ###', function(t) {

  var obj = {
    name: 'MJ'
  };
  t.ok(obj, 'The identifier point to the memory address where the object is stored.');

  t.equal(Object.getPrototypeOf(obj), Object.prototype, 'with object literal the model is Object.prototype');
  t.equal(obj.constructor, Object, 'The factory of objects created with literal is built-in Object function');
  t.equal(obj.name, 'MJ', 'JS creates identifier for each property of the object with name equal to property name')

  t.end();

});

test('### Data holder - with Object.create(prototype) available from ES5 ###', function(t) {

  debug('This data holder is with Object constructor')

  var model = {
    name: 'MJ'
  };

  var obj = Object.create(model);
  t.equal(Object.getPrototypeOf(obj), model, 'the prototype is the object passed to Object.create');
  t.equal(obj.constructor, Object, 'the factory is the built-in Object function');
  t.equal(obj.name, 'MJ', 'properties of the prototype can be accessed via created object instance');

  t.end();
});


test('### Data holder - with custom constructor functions ###', function(t) {

  debug('This data holder is with Custom Factory constructor of type function')

  function Factory(name) {
    this.name = name
  }
  var obj = new Factory("MJ");
  var obj2 = new Factory("MJ");

  t.deepEqual(Object.getPrototypeOf(obj), {}, 'object created with empty model')
  t.equal(obj.constructor, Factory, 'the factory is the custom Factory function');
  t.equal(obj.name, "MJ", 'the property is set on the instance itself')
  obj2.name = 'MJU';
  t.notEqual(obj.name, obj2.name, 'so they are not shared')
  t.end();
});

test('### Data holder - manual ###', function(t) {

  debug('This data holder is with Object constructor. Kind of broken hierarchy.')

  var model = {
    name: "MJ"
  };

  function Factory() {}
  Factory.prototype = model;
  debug(Factory.prototype.constructor)
  var obj = new Factory();
  var obj2 = new Factory();

  debug(Object.getPrototypeOf(obj).name)
  debug(Object.getPrototypeOf(obj2).name)

  t.deepEqual(Object.getPrototypeOf(obj), model, 'object created with specified model')
  t.equal(obj.constructor, Object, 'The factory is Object because our prototype is of type Object')
  t.ok(obj.constructor === Factory.prototype.constructor, 'All objects inherit a constructor/factory property from their prototype/model');
  t.equal(obj.name, "MJ", 'property is set on prototype')
  Object.getPrototypeOf(obj2).name = "MJU";
  t.equal(obj.name, 'MJU', 'so it is shared across the instances')

  t.end();
});


test('### Summary ###', function(t) {

  debug('The model of the data holder is the model of its factory')
  debug('-- it could be the root model Object.prototype')
  debug('-- it could be another child model that inherit Object.prototype')
  debug('-- it could be another empty model usually the case with custom Factories without explicit prototype set')

  debug('The factory of the data holder (constructor) is the factory of its model')
  
  t.end();
});

