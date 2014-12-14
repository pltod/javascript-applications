var test = require('tape');

test('### Four layers of OOP ###', function(t) {

  console.log('########################################');

  
  t.pass('Object Programming = OOP + dynamic part for adding/deleting properties during runtime');
  t.pass('JS can be used in typical OOP manner - creation of objects from constructor');
  t.pass('JS can be used in typical Prototype manner - creation of objects from Prototype or with literals')
  
  
  
  //TODO
  //Inheritance 
  //Encapsulation 
  //Polymorphism 
  //Classes, Abstraction and Interfaces 
  //My presentation - the principles of three etc.
  
  
  
  
  // Create/Delete/Read(dot notation and property notation)/Update Properties
  
  
  //Layer 2 Prototype Chain (Shared Data)
  
  //Get shared data with
  
  //Object.getPrototypeOf() - ES5
  //obj.__proto__  - ES6
  
  
  //Layer 3 Constructors
  
  //Point to the same prototype - Person
  //t.equal(Object.getPrototypeOf(p), Object.getPrototypeOf(p1)); 
  
  //Person has its own prototype
  //t.notEqual(Object.getPrototypeOf(Person), Object.getPrototypeOf(p1)); 
  
  //value instanceof Constr === Constr.prototype.isPrototypeOf(value)
  
  
  //Layer 4 Inheritance Between Constructors
  
  //One constructor function could inherit another and create objects that are similar to the created with the first constructor function
  
  t.end();
  
});