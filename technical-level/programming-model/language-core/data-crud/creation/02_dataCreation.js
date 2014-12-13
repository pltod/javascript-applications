// TODO refactor with tape
/**
 * RESOURCES:
 *    
 *      http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html (section "Declarations, Names, and Hoisting")
 *      http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/
 *      http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#variable-environment
 * 
 * THEORY:
 * 
 *  - Data is stored in lexical environemnts (unification of Activation Object and Variable Object terminology from ES3) related with Execution Context
 * 
 *  - Data is created for each:
 *      variables (var, VariableDeclaration);
 *      function declarations (FunctionDeclaration, in abbreviated form FD);
 *      and function formal parameters
 * 
 * - Data is created during EC Creation
 *  -- for each passed formal parameter of a function a property of the environment with a name and value of formal parameter is created
 *  -- for each not passed formal parameter of a function a property of the environment with a name and value of 'undefined' is created
 *  -- for each function declaration a property of the environment with a name and value of a function-object is created. If the name exists it replace it.
 *  -- for each variable declaration a property of the environment with a variable name and value 'undefined' is created.  
 *      If the variable name is the same as a name of already declared formal parameter or a function, the variable declaration does not disturb the existing property.
 * 
 * - AbstractVO (generic behavior of the variable instantiation process)
 *      -- GlobalContextVO -> (VO === this === global)
 *      -- FunctionContextVO -> (VO === AO, <arguments> object and <formal parameters> are added)
 * 
 * - An activation object (AO) is created on entering the context of a function and initialized by property arguments which value is the Arguments object
 * 
 * - Definition: Global object: 
 *                  - is created before entering any execution context
 *                  - exists in the single copy
 *                  - gets as properties all global variables (also those with missing vars from function contexts which also become globals)
 *                  - properties are accessible from any place of the program
 *                  - contains built-in objects as its properties
 *                  - life cycle ends with program end
 * 
 * - The change from VO and AO to Lexical Environment theory in ES5 is related with efficiency of implementations but the data creation principles are the same
 */
var GLOBAL_OBJECT = this, //window in browser environment
	GLOBAL_VAR1 = 1,
	GLOBAL_VAR2 = {},
	GLOBAL_FUNC = function globalFunc() {};
 
define(["chai"], function(Chai) {

    var should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        
        Suite = {
            name: "Data Creation",
            tests: []
        };

	Suite.tests.push({
		name: "Global Environment has Environment Record (ES3: Global Scope has Global Object) === this",
		body: function() {

			//Note that GLOBAL_OBJECT.GLOBAL_VAR1 is not defined directly
			assert.equal(1, GLOBAL_VAR1);
			assert.strictEqual(GLOBAL_VAR1, GLOBAL_OBJECT.GLOBAL_VAR1);

            //Note that GLOBAL_OBJECT.GLOBAL_VAR2 is not defined directly
			assert.strictEqual(GLOBAL_VAR2, GLOBAL_OBJECT.GLOBAL_VAR2);
			
			//Note that GLOBAL_OBJECT.GLOBAL_FUNC is not defined directly
			assert.strictEqual(GLOBAL_FUNC, GLOBAL_OBJECT.GLOBAL_FUNC);
		}
	});

	Suite.tests.push({
		name: "Language-Defined Identifiers - this",
		body: function() {
			
			//'this' identifier exists by default
			assert.isDefined(this);
			
			(function() {
                //it exists in function environment if the function is not in strict mode 
                assert.isDefined(this);
			})();
			
			(function() {
                //in ES5 strict mode it is undefined
                'use strict';
                assert.isUndefined(this);
			})();
		}
	});
	
	Suite.tests.push({
		name: "Language-Defined Identifiers - arguments",
		body: function() {
		    
		        function one(x, y, z) {
					assert.isDefined(arguments);
					
					// the number of defined function arguments (x, y, z)
					assert.equal(3, one.length);
		
					// the number of the passed arguments (only x, y)
					assert.equal(2, arguments.length);
		        }
		        
		        one(10, 20);

				function two(x, y, z) {
					
					
					assert.equal(10, x);
					assert.equal(10, arguments[0]);
					
					assert.equal(20, y);
					assert.equal(20, arguments[1]);
					
					assert.isUndefined(z);
					assert.isUndefined(arguments[2]);
					
					assert.equal(x, arguments[0]);
					assert.equal(y, arguments[1]);
					assert.equal(z, arguments[2]);
					
					// formal parameter and arguments point to the same physical data
					// that is why when we change arguments[0] we also change 'x' value
					arguments[0] = 20;
					assert.equal(20, arguments[0]);
					assert.equal(20, x);

                    // however this sharing is not valid for formal parameters that are not passed on function execution
					z = 40;
					assert.equal(40, z);
                    
					arguments[2] = 50;
					assert.equal(50, arguments[2]);
					assert.equal(40, z);
				}
		
				two(10, 20);
				
				function twoStrictMode(x, y, z) {
					
					"use strict";
					
					assert.equal(10, x);
					assert.equal(10, arguments[0]);
					
					assert.equal(20, y);
					assert.equal(20, arguments[1]);
					
					assert.isUndefined(z);
					assert.isUndefined(arguments[2]);
					
					
					assert.equal(x, arguments[0]);
					assert.equal(y, arguments[1]);
					assert.equal(z, arguments[2]);
					
					// formal parameter and arguments do not point to the same physical data in strict mode
					// that is why when we change arguments[0] we do not change 'x' value
					arguments[0] = 20;
					assert.equal(20, arguments[0]);
					assert.equal(10, x);
				}
		
				twoStrictMode(10, 20);
				
				// the same demonstration with passing objects
				function three(obj1, obj2) {
					var obj3 = {};
					assert.strictEqual(arguments[0], obj1);
					assert.strictEqual(arguments[1], obj2);
					
					arguments[0] = obj3;
					
					//again arguments and formal parameters share memory space when we are not in strict mode
					assert.strictEqual(arguments[0], obj1);
				}
		
				three({}, {});
				
				function threeStrictMode(obj1, obj2) {
				    "use strict";
					var obj3 = {};
					assert.strictEqual(arguments[0], obj1);
					assert.strictEqual(arguments[1], obj2);
					
					arguments[0] = obj3;
					
					//again arguments and formal parameters do not share memory space in strict mode
					assert.notStrictEqual(arguments[0], obj1);
				}
		
				threeStrictMode({}, {});
				
			}
	});
	
	Suite.tests.push({
		name: "Identifier Creation 1: With function formal parameters",
		body: function() {
			function bar(x) {
				assert.isDefined(x);
				return x;
			}
			function bar2(x) {
			    //When bar2 invoked without passing parameter 'x' is created as identifier (property of the environment created for the function EC) but it is set to 'undefined'
				assert.isUndefined(x);
				return x;
			}
			assert.equal(bar(5), 5);
			assert.isUndefined(bar2());
		}
	});

	Suite.tests.push({
		name: "Identifier Creation 2: With function declaration",
		body: function() {
		    
			function bar() {
				return 5;
			}
			
			//'bar' identifier (property of the environment created for the function EC) is created with value set to the function bar
			assert.isDefined(bar);
			assert.equal(bar(), 5);
			assert.equal(typeof bar, "function");
		}
	});


	Suite.tests.push({
		name: "Identifier Creation 3: With variable declaration",
		body: function() {
		    //'a' identifier (property of the environment created for the function EC) is created 
		    //with value set to 'undefined' at EC creation
		    assert.isUndefined(a);
			var a = 5;
		    //and value rebound to 5 at EC execution
			assert.isDefined(a);
			assert.equal(a, 5);
			assert.equal(typeof a, "number");
		}
	});

	Suite.tests.push({
		name: "Data Creation Order: If multiple formal parameters have the same name, the one occurring latest in the list will take precedence, even if it is undefined.",
		body: function() {
		    
			function bar(x, x) {
				assert.isUndefined(x);
				return x;
			}
			assert.isUndefined(bar(1));
			
		}
	});

	Suite.tests.push({
		name: "Data Creation Order: Function declarations take priority over formal parameters",
		body: function() {

            //On function activation we have execution context creation
            //During this phase first formal parameters are asigned, then function declarations, then variable assignments
            function id(fp1, fp2) {
                assert.equal(1, fp1);
                
                //At EC creation fp2 value of 2 is lost because after it is initially set it is changed with the function assignment that uses the same name
                assert.equal('function', typeof fp2);
                
                var fp1 = 3;
                assert.equal(3, fp1);
                
                //Using the same name as the formal parameter overide it
                function fp2() {}
			}
			id(1, 2);
		}
	});

	Suite.tests.push({
		name: "Data Creation Order: Function declarations take priority over variable declarations at EC Creation but lose on EC Execution",
		body: function() {
		    
		    //Functions take priority over variable declarations at EC Creation
		    assert.equal('function', typeof id);
		    
			//At EC execution 'id' is rebound to number 0
			var id = 0;
            
            //At EC creation this declaration is taken into account and id is set to function where 'var id = 0' does not disturb this setting
            function id() {}
			
			//At EC Execution data has changed
			assert.equal(0, id);
			
		}
	});

	Suite.tests.push({
		name: "Data Creation Order: Function declarations take priority over variable declarations even when variable declaration is done after function declaration",
		body: function() {
			
			function foo() {
                
                //Function declarations are applied at EC Creation
	            //Assignments to variables are done during context execution that is why bar is pointing to a function
			    assert.equal(1, bar());
                
				function bar() {
					return 1;
				}

				//Very important is that this declaration is ignored because 'bar' identifier already exist
				//Assignment is not done until execution so until this point 'bar' is a function
				var bar = 2
				
				//But here 'bar' is rebound to number 2
				assert.equal(2, bar);
			}
			
			foo();
		}
	});

	Suite.tests.push({
		name: "Data Creation Order: Latest function declarations override earlier",
		body: function() {
			
			function foo() {

	            //Everything is created on context creation and latest declaration takes precedence so the bound function to 'bar' is the one that returns 2
				assert.equal(2, bar()); 
	
				function bar() {
					return 1;
				}
	
				function bar() {
					return 2;
				}
	
			}
		}
	});


	Suite.tests.push({
		name: "Data Creation Order: Function Expressions are just Variable Declarations and behave as such",
		body: function() {

		    //At EC Creation only 'fe' identifier is created
		    assert.isUndefined(fe);
		    
            var fe = function() {};			
            
            //But function is created and assigned to 'fe' identifier at EC Execution
            assert.isFunction(fe);
		}
	});
	
	
	Suite.tests.push({
		name: "Data Creation Order: If not assigned to a variable Function Expressions are not preserved",
		body: function() {

            function fn () {
                
                //'x' identifier is never created even on Execution because it is not assigned to a variable
                //For function declarations this is done automatically but not for fucntion expressions
                (function x() {});
                
                //must throw reference error which means that x identifier is not created
                x();
            }    
            
            assert.throw(fn, ReferenceError);
		}
	});

	Suite.tests.push({
		name: "Data Creation Order: Identifiers created without var are not properties of the environment part of this EC, they are properties of the Global Object",
		body: function() {

            //Identifier is created during EC Creation
            assert.isUndefined(v);
            
            var v = 1;            
            
            function fn() {
                //Identifier is not created during EC Creation
                p;
                
                p = 0;    
                
                //from this point on we can use it (if not directly through global object) and it will be resolved from the Global Object with scope chain resolution
                //that is one of the ways we polute the global environment
            }
            
            assert.throw(fn, ReferenceError);
		}
	});
	
	Suite.tests.push({
		name: "Prove that identifiers are created at EC Creation",
		body: function() {

            if (true) {
                var a = 1;
            } 
            else {
                //Note this is not a good practice
                
                //This branch is never executed but still identifiers are created on EC creation
                function f() {}    
                var b = 2;
            }
             
            assert.equal(1, a);
            
            assert.isFunction(f); //Works in Chrome
            //assert.isUndefined(b); //Works like this in Firefox due to Function Statements implementation
            
            //b exists its access does not throw ReferenceError
            assert.isUndefined(b);
		}
	});



    return Suite;
});
