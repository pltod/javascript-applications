var test = require('tape');

test('### Create Data - Functions ###', function(t) {

  t.pass('Some identifiers hold data that is more complex.');
  t.pass('JS use Reference Types for complex data.');
  t.pass('In this case identifiers are associated with reference (memory address) where actual data is stored');
  
  
  t.pass('Example for Reference Type is Function');
  
  var f = function () {
    t.pass('Functions can be defined with Function Expression (variable declaration that points to Function)')
  }
  
  f();
  
  t.ok(f, 'Identifier holds memory address where the function body is stored.')
  
  function f1() {
    t.pass('Functions can be defined with Function Declaration also known as Literal form')
	}
	
  t.ok(f1, 'The name of the function become the identifier for accessing this function.');
	t.equal(typeof f1, "function",  'typeof operator return that this Reference Type is function');  
  
	function f2(x) {
    t.equal(x, 5, 'JS creates identifier for each function formal parameter with value passed on function invocation')
	}
  
  f2(5);
  
        
  t.end();
  
});    