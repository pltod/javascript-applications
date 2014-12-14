var debug = require('debug')('data-creation');
var test = require('tape');

test('### Create Data with Variable Declaration ###', function(t) {

  debug('########################################');
  t.pass('##### Definitions');

  t.pass('Identifier: the name used to access data');
  t.pass('Value: the actual data');
  t.pass('Variable Declaration: var statement that introduce identifier and the initial value it points to');

  var v = 'value';
  var v1;
  t.ok(v, 'v identifier has been created');
  t.equal(v, 'value', 'v identifier has been assigned initial value of "value"');
  t.equal(v1, undefined, 'the default initial value is undefined');
  
  t.end();

});  

test('### Create Data With Function Declaration ###', function(t) {

  function f1(x) {
    t.pass('Functions can be defined with Function Declaration also known as Literal form')
    t.equal(x, 5, 'JS creates identifier for each function formal parameter with value passed on function invocation')
	}
	
  f1(5);
  t.ok(f1, 'JS creates identifier with the same name as the function name and it is used for accessing this function.');

  t.end();
  
});    

test('### Create Data With Function Expression ###', function(t) {

  t.pass('Function Expressions involves Variable Declarations');
  
  var f = function () {
    t.pass('Functions can be defined with Function Expression');
    t.pass('This actualy is variable declaration where the value of the created identifier points to function')    
  }
  
  f();
  
  t.ok(f, 'And more specifically the identifier point to the memory address where the function body is stored.')
  
  t.end();
  
});


test('### Create Data With Objects ###', function(t) {
  
  t.pass('Data could be created with Object Declaration');
  t.pass('There are 4 ways to define Object');
    
  t.pass('Case 1: Objects can be defined with Literal notation')
  
  var obj = {
    name: 'value',
    getName: function () {
      return this.name;
    }
  };
  t.pass('This actualy is variable declaration where the value of the created identifier points to function')      
  t.ok(obj, 'And more specifically the identifier point to the memory address where the object is stored.')
  
  t.equal(obj.name, 'value', 'JS creates identifier for each property of the object with name equal to property name')
  t.equal(typeof obj.getName, 'function', 'JS creates identifier for each property even those that point to functions or nested objects')

  t.pass('Case 2: Object.create(prototype) available from ES5')
  
  var newObj = Object.create(obj);
  t.pass(newObj.name, 'value', 'The same identifiers are created as those defined in the object used as creation model');

  t.pass('Case 3: Custom Constructor Functions')

  function Person(inputName) {
    t.equal(inputName, 'value', 'After function invocation JS creates identifier for each of its parameters');
    this.name = inputName
  }
  t.equal(typeof Person, 'function', 'Initially JS creates identifier only for the function name');
  var p = new Person('value');

  t.equal(p.name, 'value', 'After function invocation completion JS creates identifier for each property of the created object');


  t.pass('Case 4: Built-in Constructor Functions')  
  
  var bObj = new Object();
  bObj.name = "value";
  t.equal(bObj.name, 'value', 'JS creates identifier for each newly created property of the object');
  
  t.end();
  
});    

test('### Prove that identifiers are created at EC Creation ###', function(t) {

  if (true) {
    var a = 1;
  } 
  else {
    debug("Declare variables in statement scope is not a good practice");
      
    debug("This branch is never executed but still identifiers are created on EC creation");
    function f() {}    
    var b = 2;
  }
   
  t.equal(1, a);
  
  t.equal(typeof f, 'function');
  debug("t.notOk(b) - Works like this in Firefox due to Function Statements implementation");
  t.equal(b, undefined);

  
  t.end();
  
});

test('### Practices ###', function(t) {

  t.pass('Prefer Function Declarations instead of Expressions');
  t.pass('Give the same name of the function expression with the name of variable associated with it');
  t.pass('Prefer Object Literal notation for object creation');  
  
  t.end();
  
});



