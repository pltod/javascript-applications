var debug = require('debug')('object-properties');
var test = require('tape');


test('### Property Access - Dot and Bracket notation ###', function(t) {

  var objLiteral = {
    prop: 'a'
  };
  var arrayLiteral = ['0', '1', '2'];


  assert.equal('a', objLiteral.prop);
  assert.equal('a', objLiteral['prop']);

  arrayLiteral.push('3');
  arrayLiteral['push']('4');

  assert.equal('3', arrayLiteral[3]);
  assert.equal('4', arrayLiteral[4]);

  //Using a variable to store the method name and invoke it also work with dot notation
  var method = "push";
  arrayLiteral[method]('5');
  assert.equal('5', arrayLiteral[5]);


  t.end();

});

test('### Detecting object properties ###', function(t) {

  var obj = {
    prop: 0,
    method: function() {}
  },
    executed = false;


  //prop property exist but its value is falsy so the code in if block is not executed
  if (obj.prop) {
    executed = true;
  }

  //executed is still false
  assert.isFalse(executed);

  //proper way of property detection
  if ('prop' in obj) {
    executed = true;
  }

  assert.isTrue(executed);

  //methods are also properties so they are checked the same way
  assert.isTrue('method' in obj);

  t.end();

});


test('### Detecting own object properties ###', function(t) {

  var obj = {
    method: function() {}
  };

  //has such property but it is defined in 'obj' parent
  assert.isTrue('toString' in obj);

  //must use special method to check if the property exists and if it is an own property
  assert.isTrue(obj.hasOwnProperty('method'));
  assert.isFalse(obj.hasOwnProperty('toString'));

  t.end();

});

test('### Deleting properties with "delete" invokes internal operation [[Delete]] ###', function(t) {

  var obj = {
    method: function() {}
  };

  assert.isDefined(obj.method);
  assert.isNotNull(obj.method);
  assert.isTrue(obj.hasOwnProperty('method'));

  obj.method = null;

  //Still exists
  assert.isDefined(obj.method);
  assert.isTrue(obj.hasOwnProperty('method'));

  //but it is null
  assert.isNull(obj.method)


  delete obj.method;
  assert.isUndefined(obj.method);
  assert.isFalse(obj.hasOwnProperty('method'));

  t.end();

});

test('### Loop through object properties ###', function(t) {


  var obj = {
    method: function() {}
  },
    obj2 = Object.create(obj, {
      name: {
        configurable: true,
        enumerable: true,
        value: "Greg",
        writable: true
      }
    }),
    properties = Object.keys(obj2),
    i,
    len,
    counter = 0,
    property;

  //Iterate only trough own properties
  for (i = 0, len = properties.length; i < len; i++) {
    //name = properties[i]
    //value = obj[properties[i]]
    counter++;
  }

  assert.equal(1, counter);

  counter = 0;
  //Iterate through all properties on prototype chain
  for (property in obj2) {
    //name: property
    //value: obj[property]
    counter++;
  }

  //The counter is 2 because most of the built-in properties are not enumerable - [[Enumerable]] = false
  assert.equal(2, counter);

  //For example
  assert.isFalse(obj2.propertyIsEnumerable('toString'));

  t.end();

});

test('### Data and accessor properties - could be useful to add validation, logging, etc. ###', function(t) {


  var obj = {

    //Data property
    _name: 'name',

    //Accessor property 'name'
    get name() {
      return this._name;
    },

    set name(value) {
      this._name = value;
    }
  };


  //Outside of the object we refer to 'name' accessor property to manipulate value inside '_name' data property
  assert.equal('name', obj.name);

  obj.name = 'new name';

  assert.equal('new name', obj.name);

  //Note that '_name' is not hidden and we still have direct access to it
  assert.equal('new name', obj._name);

  t.end();

});

test('### Data and accessor properties - could be read and write only ###', function(t) {


  var obj1 = {

    //Data property
    _name: 'name',

    get name() {
      return this._name;
    }
  };

  var obj2 = {

    //Data property
    _name: 'name',

    set name(value) {
      this._name = value;
    }
  };

  assert.equal('name', obj1.name);
  //Does not have effect will throw in strict mode - TypeError: Cannot set property name of #<Object> which has only a getter
  obj1.name = "new name";
  assert.equal('name', obj1.name);


  //we do not have getter so getting the _name will return undefined
  assert.isUndefined(obj2.name);
  obj2.name = "new name";
  assert.isUndefined(obj2.name);

  //But the setter has set the value correctly
  assert.equal('new name', obj2._name);

  t.end();

});

test('### [[Enumerable]] and [[Configurable]] attributes ###', function(t) {


  var obj = {
    name: 'name',
    address: 'address'
  };

  //By default a property is enumerable
  assert.isTrue(obj.propertyIsEnumerable('name'));

  //By default a property is configurable becuse we can change its attributes
  Object.defineProperty(obj, 'name', {
    enumerable: false
  });
  assert.isFalse(obj.propertyIsEnumerable('name'));

  //When the property is configurable we can delete it -> by default we can do that
  delete obj.name;
  assert.isUndefined(obj.name);

  //we can make property to be not configurable anymore
  Object.defineProperty(obj, 'address', {
    configurable: false
  });
  //will throw in strict mode since this is not configurable property
  //now fails silently
  delete obj.address;
  //still exists
  assert.equal('address', obj.address);

  function fn() {
    //Will throw TypeError: Cannot redefine property: address
    //So once made not configurable this is irreversable
    Object.defineProperty(obj, 'address', {
      configurable: true
    });
  }

  assert.
  throw (fn, TypeError);

  t.end();

});

test('### [[Value]] and [[Writable]] attributes ###', function(t) {

  var obj = {};

  //Here we create property with values the same as default values put by JS engine
  //Note that if we ommit some of these we will have false values and this will contradict with normal behaviour
  Object.defineProperty(obj, "name", {
    value: "name",
    enumerable: true,
    configurable: true,
    writable: true
  });

  assert.equal('name', obj.name);

  t.end();

});

test('### [[Get]] and [[Set]] attributes ###', function(t) {
  //[[Get]] and [[Set]] contain the getter function and the setter function, respectively.

  var obj = {
    _name: 'name'
  };

  // we want not writable and non enumerable accessor property
  Object.defineProperty(obj, 'name', {
    //note that we define 'get' as function in comparison with object literal notation where function keyword is ommited
    //the same can be done with 'set'
    get: function() {
      return this._name;
    }
  });

  //it is not writable
  obj.name = 'new name';
  assert.equal('name', obj.name);

  //not enumerable
  assert.isFalse(obj.propertyIsEnumerable('name'));

  //Basically the property is immutable unless we use directly '_name'
  //Which comes to show that accessor properties are to specify some custom logic - validation, logging - but not prevent access to internal data property '_name'
  assert.isTrue(obj.propertyIsEnumerable('_name'));
  obj._name = 'new name';
  assert.equal('new name', obj.name);

  t.end();

});

test('### Retreiving property attributes ###', function(t) {
  var obj = {
    name: 'name'
  };

  var propertyAttributes = Object.getOwnPropertyDescriptor(obj, 'name');

  //The current value
  assert.equal('name', propertyAttributes.value);

  //Default values for attributes
  assert.isTrue(propertyAttributes.enumerable);
  assert.isTrue(propertyAttributes.configurable);
  assert.isTrue(propertyAttributes.writable);

  t.end();

});
