var debug = require('debug')('data-creation-order');
var test = require('tape');

test('### Data Creation Order: If multiple formal parameters have the same name, the one occurring latest in the list will take precedence, even if it is undefined. ###', function(t) {

	function bar(x, x) {
		t.equal(undefined, x);
		return x;
	}
  t.equal(undefined, bar(1));
  
  t.end();
});


test('### Data Creation Order: Function declarations take priority over formal parameters ###', function(t) {

  debug("On function activation we have execution context creation");
  debug("During this phase first formal parameters are asigned, then function declarations, then variable assignments");

  function id(fp1, fp2) {
    t.equal(1, fp1);

    debug("At EC creation fp2 value of 2 is lost because after it is initially set it is changed with the function assignment that uses the same name");
    t.equal('function', typeof fp2);

    var fp1 = 3;
    t.equal(3, fp1);

    debug("Using the same name as the formal parameter overide it");

    function fp2() {}
  }
  
  id(1, 2);
  t.end();
});

test('### Data Creation Order: Function declarations take priority over variable declarations at EC Creation but lose on EC Execution. ###', function(t) {

  debug("Functions take priority over variable declarations at EC Creation")
  t.equal('function', typeof id);
  
  debug("At EC execution 'id' is rebound to number 0");
  var id = 0;
      
  debug("At EC creation this declaration is taken into account and id is set to function where 'var id = 0' does not disturb this setting");
  function id() {}

  t.equal(0, id, "At EC Execution data has changed");
  
  t.end();
});

test('### Data Creation Order: Function declarations take priority over variable declarations even when variable declaration is done after function declaration ###', function(t) {

	function foo() {
            
    debug("Function declarations are applied at EC Creation");
    debug("Assignments to variables are done during context execution that is why bar is pointing to a function");
	  t.equal(1, bar());
            
		function bar() {
			return 1;
		}

		debug("Very important is that this declaration is ignored because 'bar' identifier already exist");
		debug("Assignment is not done until execution so until this point 'bar' is a function");
		var bar = 2;
		
    t.equal(2, bar, "'bar' is rebound to number 2");
	}
	
	foo();
  
  t.end();
});


test('### Data Creation Order: Latest function declarations override earlier ###', function(t) {

	function foo() {

    debug("Everything is created on context creation and latest declaration takes precedence so the bound function to 'bar' is the one that returns 2");
		t.equal(2, bar()); 

		function bar() {
			return 1;
		}

		function bar() {
			return 2;
		}

	}

  t.end();
});

test('### Data Creation Order: Function Expressions are just Variable Declarations and behave as such ###', function(t) {
  debug("At EC Creation only 'fe' identifier is created");
  t.equal(undefined, fe);
  
  var fe = function() {};
      
  debug("But function is created and assigned to 'fe' identifier at EC Execution");
  t.equal(typeof fe, "function");

  t.end();
});

test('### Data Creation Order: If not assigned to a variable Function Expressions are not preserved ###', function(t) {

  function fn () {
    debug("'x' identifier is never created even on Execution because it is not assigned to a variable");
    debug("For function declarations this is done automatically but not for fucntion expressions");
    (function x() {});
      
    x();
  }    
  
  t.throws(fn, ReferenceError, "throw reference error which means that x identifier is not created");

  t.end();
});

test('### Data Creation Order: Identifiers created without var are not properties of the environment part of this EC, they are properties of the Global Object ###', function(t) {
  debug("Identifier is created during EC Creation");
  t.equal(v, undefined);
  
  var v = 1;            
  
  function fn() {
    debug("Identifier is not created during EC Creation so p is just missing it is not undefined");
    p;
    p = 0;    
      
    debug("from this point on we can use it (if not directly through global object) and it will be resolved from the Global Object with scope chain resolution");
    debug("that is one of the ways we polute the global environment")
  }
  
  t.throws(fn, ReferenceError);

  t.end();
});