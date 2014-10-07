var test = require('tape');
var log = console.log;

test('### Identifier Creation with Variable Declaration ###', function(t) {

  log('########################################');
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

test('### Create Data With Functions Declaration ###', function(t) {

  function f1(x) {
    t.pass('Functions can be defined with Function Declaration also known as Literal form')
    t.equal(x, 5, 'JS creates identifier for each function formal parameter with value passed on function invocation')
	}
	
  f1(5);
  t.ok(f1, 'JS creates identifier with the same name as the function name and it is used for accessing this function.');

  t.end();
  
});    

test('### Create Data With Functions Expression ###', function(t) {

  t.pass('Function Expressions involves Variable Declarations');
  
  var f = function () {
    t.pass('Functions can be defined with Function Expression');
    t.pass('This actualy is variable declaration where the value of the created identifier points to function')    
  }
  
  f();
  
  t.ok(f, 'And more specifically the identifier point to the memory address where the function body is stored.')
  
  t.end();
  
});

test('### Practices ###', function(t) {

  t.pass('Prefer Function Declarations instead of Expressions');
  t.pass('Give the same name of the function expression with the name of variable associated with it');
  
  t.ok('TODO: Why these practices? Explain the cases bellow.')
  
  t.ok('TODO: The case with function name differing from variable name')  
  t.ok('TODO: IE Function Expression name scope leakage')
  t.ok('TODO: Debugging Aspect')  
  t.ok('TODO: Firefox Function Statements')
      
  t.end();
  
});



