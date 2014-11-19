var obj = {
  name: 'value',
  getName: function () {
    return this.name;
  }
};
t.pass('This actualy is variable declaration where the value of the created identifier points to function')      
t.ok(obj, 'And more specifically the identifier point to the memory address where the object is stored.')

t.equal(obj.name, 'value', 'JS creates identifier for each property of the object with name equal to property name')
t.equal(obj.getName, 'function', 'JS creates identifier for each property even those that point to functions or nested objects')

t.pass('Case 2: Object.create(prototype) available from ES5')

var newObj = Object.create(obj);
t.pass(newObj.name, 'value', 'It is possible to create new objects based on existing objects that becomes their prototypes');


t.pass('Case 3: Custom Constructor Functions')

function Person(name) {
  this.name = name,
  this.f1 = function () {
    //Do nothing
  }
}

Person.prototype.f2 = function () {
  //Do nothing
}

var p = new Person('test');
var p1 = new Person('test1');
t.equal(p.name, 'test', 'Object has been created with constructor function');
t.notEqual(p.f1, p1.f1, 'each instance has copy of it');
t.equal(p.f2, p1.f2, 'each instance could have shared methods via prototype - useful for saving memory');


t.pass('Variant 4: Built-in Constructor Functions')  
