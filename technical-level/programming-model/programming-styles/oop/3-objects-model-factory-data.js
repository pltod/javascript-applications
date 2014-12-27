var debug = require('debug')('model-factory-data');
var test = require('tape');

debug("JS - The three objects - Model (Prototype), Factory (Constructor Function), Data (Mutable - Immutable Instances)");

test('### The Root Model ###', function(t) {

  t.ok("In JS we create objects based on models called prototypes")
  t.ok(Object.prototype, 'JS has built-in model objects - prototype. Object prototype is the object of Reference Type')
  t.notOk(Object.getPrototypeOf(Object.prototype), "Object.prototype is the root Model")

  t.end();

});

test('### Factory ###', function(t) {


  t.ok({}, "JS allows to create objects with literal");
  t.equal(typeof Object.create, "function", "...or with dedicated object method");
  t.equal(typeof Object, "function", '...or with built-in factories, which are of type functions because they must be callable');

  function Factory() {}
  t.equal(typeof Factory, "function", '...or with custom factories, which are of type functions because they must be callable');

  t.end();

});

test('### How to Create Factories? ###', function(t) {

  debug('As we saw factories are callable objects called functions');
  debug('So creating of factories is the same as creating functions');
  
  function Factory() {}
  var f = function() {}
  
  t.equal(typeof Factory, "function", '1. We can create factories with function declarations');
  t.equal(typeof f, "function", '2. We can create factories with function expressions');
  t.equal(typeof Function, 'function', '3. We can create factories with built-in factory for factories')

  debug("Be careful with the third option. Factories created in this way do not preserve the lexical scope.")
  debug("Since factories are functions we often use them just as functions not factories")

  t.equal(typeof Function.prototype, 'function', 'Function.prototype is the model of Factory')
  t.equal(Object.prototype, Object.getPrototypeOf(Function.prototype), "The model of Function.prototype is Object.prototype")

  t.end();

});

test('### Awarness for the three objects - we can set them properties ###', function(t) {

  function FactoryObject(label) {
    this.label = label || "DefaultDataHolderLabel";
  }

  var modelObject = FactoryObject.prototype;
  var creatorObject = FactoryObject;
  var dataHolderObject1 = new FactoryObject();
  var dataHolderObject2 = new FactoryObject("ConcreteDataHolderLabel");

  modelObject.label = "modelObjectLabel";
  creatorObject.label = "creatorObjectLabel";
  creatorObject.param = "param";
  modelObject.modelParam = "param";

  t.ok(FactoryObject.prototype, 'We have access to the models of the factories');
  t.notOk(dataHolderObject1.prototype, 'We have not access to the models of the data holders');
  t.deepEqual(Object.getPrototypeOf(dataHolderObject1), modelObject, 'We have not access to the models of the data holders');

  t.equal(modelObject.label, "modelObjectLabel", 'Our Model is object and we can set properties to it');
  t.equal(creatorObject.label, "creatorObjectLabel", 'Our Creator/Factory is object and we can set properties to it');
  t.equal(dataHolderObject1.label, "DefaultDataHolderLabel", "Data holder 1 has label property");
  t.equal(dataHolderObject2.label, "ConcreteDataHolderLabel", "Data holder 2 has label property as well because it is created with the same Creator");

  t.notOk(dataHolderObject1.param, 'Setting properties to Creator object does not reflect the Data Holder');
  t.notOk(dataHolderObject2.param, 'Setting properties to Creator object does not reflect the Data Holder');

  t.equal(dataHolderObject1.modelParam, "param", 'Dynamic change in the Model reflects the Data Holder');
  t.equal(dataHolderObject2.modelParam, "param", 'Dynamic change in the Model reflects the Data Holder');

  t.end();
});

test('### Objects defined with constructor function with new has its [[Prototype]] set to constructor function prototype ###', function(t) {
  function User() {};
  User.prototype.prop = "value";
  var user = new User();

  t.equal(Object.getPrototypeOf(user), User.prototype);
  t.equal(user.prop, "value");
  t.end();
});

test('### Object defined with object literal has its [[Prototype]] set to Object.prototype ###', function(t) {
  var user = {
    name: "pltod"
  };
  t.equal(Object.getPrototypeOf(user), Object.prototype);
  t.end();
});



