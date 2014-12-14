var debug = require('debug')('model-factory-data');
var test = require('tape');


test('### The metaphor ###', function(t) {
  
  debug("Three are the involved objects");
  debug("Constructor Function, Instance, and Prototype are Creator/Factory, Data (Holder), Model");
  
	function FactoryObject(label){
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
	
	t.equal(modelObject.label, "modelObjectLabel", 'Our Model is object and we can set properties to it');
	t.equal(creatorObject.label, "creatorObjectLabel", 'Our Creator is object and we can set properties to it');
	t.equal(dataHolderObject1.label, "DefaultDataHolderLabel", "Data holder 1 has label property");
	t.equal(dataHolderObject2.label, "ConcreteDataHolderLabel", "Data holder 2 has label property as well because it is created with the same Creator");
	
	t.notOk(dataHolderObject1.param, 'Setting properties to Creator object does not reflect the Data Holder');
	t.notOk(dataHolderObject2.param, 'Setting properties to Creator object does not reflect the Data Holder');
	
	t.equal(dataHolderObject1.modelParam, "param", 'Dynamic change in the Model reflects the Data Holder');
	t.equal(dataHolderObject2.modelParam, "param", 'Dynamic change in the Model reflects the Data Holder');
  
  t.end();
});

test('### Object Hierarchy And The Root Model ###', function(t) {
  
  debug('JS has built-in creator objects -> constructor functions')
  t.ok(Object, 'Object is the main Creator')
  t.ok(Function, 'Function is another Creator')  
  t.equal(typeof Object, 'function', 'The type of Creator Object is function')
  t.equal(typeof Function, 'function', 'The type of Creator Function is function')  
  
  debug('JS has built-in model objects - prototype')  
  t.ok(Object.prototype, 'Object prototype is the object of Reference Type')
  
  
  t.notOk(Object.getPrototypeOf(Object.prototype), "Object.prototype is the root Model")

  t.equal(typeof Function.prototype, 'function', 'Function prototype is of object Reference Type')  
  t.equal(Object.prototype, Object.getPrototypeOf(Function.prototype), "The model of Function.prototype is Object.prototype")  

  t.end();
});

test('### constructor property ###', function(t) {

  var obj = {};
  t.ok(obj.constructor === Object.prototype.constructor, 'All objects inherit a constructor property from their prototype');
  t.ok(obj.constructor === Object, 'All objects inherit a constructor property from their prototype');
  
  t.end();
});