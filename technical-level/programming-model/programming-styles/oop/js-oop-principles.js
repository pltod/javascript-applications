var test = require('tape');

test('### JavaScript and OOP Principles ###', function(t) {
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

test('### OOP Resources ###', function(t) {

  t.pass('##### Books');
  
  t.pass('http://effectivejs.com/');
  t.pass('https://leanpub.com/oopinjavascript');
  t.pass('http://speakingjs.com/es5/');
    
  
  
  t.pass('##### Posts');

  t.pass('http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory/');
  t.pass('http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/');
  t.pass('http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/');

  t.pass('http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/');

  t.pass('http://webreflection.blogspot.com/2010/10/javascript-coercion-demystified.html');

  t.pass('http://qfox.nl/weblog/214');

  t.pass('http://www.2ality.com/2014/05/oop-layers.html');

  t.pass('http://www.martinrinehart.com/frontend-engineering/knowits/op/op-v4-color-preview.pdf');
  
  
  t.end();
  
});  