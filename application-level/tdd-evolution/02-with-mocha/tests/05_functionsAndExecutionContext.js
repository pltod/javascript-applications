/**
 * Resources:
 * 
 *	http://effectivejs.com/
 *  http://dmitrysoshnikov.com/
 *  http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory/#rules-of-function-creation-and-application
 *
 * - Several lifecycle phases must be considered - EC Creation, EC Execution, Function Creation, Function Execution (Activation)
 * 
 * - PHASE1: Function Creation => Triggered by EC Creation for FD
 *      •Function.[[Scope]] property is initialized with EC.VariableEnvironment
 *
 * - PHASE1: Function Creation => Triggered during EC Execution for FE
 *      •Function.[[Scope]] property is initialized with EC.LexicalEnvironment
 *  
 * - PHASE2: Function Activation => Triggers EC Creation
 *      •All declarations are turned into VariableEnvironment properties
 *      •Data is set only on VariableEnvironment properties related to function declarations and formal parameters
 *      •Function.[[Scope]] property has been initialized on all declared functions with VariableEnvironment created by activated function
 * 
 * - PHASE3: Function Execution = EC Execution
 *      •Data is set on VariableEnvironment properties related with variable declarations
 * 
 */
define(["chai"], function(Chai) {
	
	var GLOBAL_OBJECT = window,
		should = Chai.should(),
		expect = Chai.expect,
		assert = Chai.assert,

		Suite = {
			name: "Function And Execution Context Lifecycle. Function Declaration vs. Function Expression",
			tests: []
		};


	Suite.tests.push({
		name: "Function Creation Algorithm - Function Declaration, Function Expression",
		body: function() {
		    
		    //This is Function Declaration
		    function f() {}
		    
		      //This is Function Expression
		    var f = function () {};
		    
		    //When function is created the following algorithm is applied
		    
		        //F = new NativeObject();
  
            // property [[Class]] is "Function"
                
                //F.[[Class]] = "Function"
              
            // a prototype of a function object
                
                //F.[[Prototype]] = Function.prototype
              
            // reference to function itself
            // [[Call]] is activated by call expression F()
            // and creates a new execution context
                
                //F.[[Call]] = <reference to function>
              
            // built in general constructor of objects
            // [[Construct]] is activated via "new" keyword
            // and it is the one who allocates memory for new
            // objects; then it calls F.[[Call]]
            // to initialize created objects passing as
            // "this" value newly created object 
            
                //F.[[Construct]] = internalConstructor
              
            
            // scope chain of the current context
            // i.e. context which creates function F
                
                //F.[[Scope]] = activeContext.Scope
            
            
            // if this functions is created 
            // via new Function(...), then
            
            // There is internal difference in FD and FE related to this field see the next test
            
                //F.[[Scope]] = globalContext.Scope
              
            
            // number of formal parameters
                
                //F.length = countParameters
              
            
            // a prototype of created by F objects
            
                //__objectPrototype = new Object();
                //__objectPrototype.constructor = F // {DontEnum}, is not enumerable in loops
                //F.prototype = __objectPrototype
              
                //return F
		}
	});

	Suite.tests.push({
		name: "Function Creation - [[Scope]] Difference in Function Declarations and Function Expressions",
		body: function() {

        /* This is why, closures formed as function declarations (FD) save the VariableEnvironment component as their [[Scope]] property, 
        and function expressions (FE) save exactly LexicalEnvironment component in this case. 
        This is the main (and actually the only) reason of separation of these two, at first glance the same, components.
        Source: http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#lexical-environment */
        
        
            var a = 10;
             
            // Function Declaration
            function foo() {
                return a;
            }
             
            with ({a: 20}) {
             
              // Function Expression
              var bar = function () {
                  return a;
              };
             
              assert.equal(10, foo()); // 10, from VariableEnvrionment
              assert.equal(20, bar()); // 20,  from LexicalEnvrionment
             
            }
             
          assert.equal(10, foo()); // 10, from VariableEnvrionment
          assert.equal(20, bar()); // still 20,  from LexicalEnvrionment


            //Pseudocode
            // "foo" is created
            
                //foo.[[Scope]] = globalContext.[[VariableEnvironment]];
             
            // "with" is executed
            
                //previousEnvironment = globalContext.[[LexicalEnvironment]];
                 
                //globalContext.[[LexicalEnvironment]] = {
                //  environmentRecord: {a: 20},
                //  outer: previousEnvironment
                //};
             
            // "bar" is created
                
                //bar.[[Scope]] = globalContext.[[LexicalEnvironment]];
             
            // "with" is completed, restore the environment
                
                //globalContext.[[LexicalEnvironment]] = previousEnvironment;

		}
	});

	Suite.tests.push({
		name: "Function Creation and Function Activation Phases",
		body: function() {

            //At function creation we capture the parent environment in function object [[Scope]] property
            //At function execution we create new environment (execution context) 

		    
		    //1. Function Creation
		    
            // global "x"
            var x = 10;
             
            // function "foo" is created relatively
            // to the global environment
            function foo(y) {
              var z = 30;
              return x + y + z;
            }
    
            // As a result of Function Creation Algorithm we have "foo" function
             
            //foo = functionObject {
            //  code: "console.log(x + y + z);"
            //  environment: {x: 10, outer: null}  //the environment in which is defined
            //};
            
            
            //2. Function Application
            assert.equal(60, foo(20));
            
            // create a new environment with formal 
            // parameters and local variables (Note that this is simplified the function application creates execution context 
            // so foo.code is executed in Execution Context that holds fooEnvironment + context (the value of this variable which value depends on the way function foo is invoked))
            
            //fooEnvironment = {
            //  y: 20,
            //  z: 30,
            //  outer: foo.environment
            //};
             
            // and evaluate the code
            // of the "foo" function 
             
            //execute(foo.code, fooEnvironment); // 60

		}
	});

	Suite.tests.push({
		name: "Function Activation -> Execution Context Creation - Function Activation triggers Execution Context Creation",
		body: function() {
		    
			function fn(){x};
			assert.throw(fn, ReferenceError);
			
			function test() {
				
				/**
				 * When test function is invoked JS creates new EC
				 * that stores identifiers as properties of its Variable Environment (ES3 - Variable Object, Activation Object).   
				 */
				var x = 0;
				assert.isDefined(x);
				assert.equal(x, 0);
			}
			
			test();

		}
	});



	Suite.tests.push({
		name: "Function Activation and Execution -> Execution Context Creation and Execution - identifiers for variable declarations are created on context creation but assignments are applied on context execution",
		body: function() {
			
			//Values for variables are bound during execution so here 'p' identifier exist but it is not bound yet
			assert.isUndefined(p);
			
			var p = 5;
			
			assert.isDefined(p);
			assert.equal(5, p);

			var p = 6;

			assert.isDefined(p);
			assert.equal(6, p);
		}
	});

	Suite.tests.push({
		name: "Function Activation and Execution -> Execution Context Creation and Execution - identifiers for function expressions (behave like variable declarations) are created on context creation but functions are created and bound to identifiers on context execution",
		body: function() {
			
			assert.isUndefined(p);
			
			var p = function() {
			    return 5;
			}
			
			assert.isDefined(p);
			assert.equal(5, p());
		}
	});

	Suite.tests.push({
		name: "Function Activation and Execution -> Execution Context Creation and Execution - identifiers for function declarations are created on context creation and assignments are applied on context creation",
		body: function() {
			
			//Identifiers for function declarations, function creation and binding is done on context creation
			assert.isDefined(bar);
			assert.equal(2, bar());
			
			function bar() {
				return 2;
			}
		}
	});


	Suite.tests.push({
		name: "Function Activation and Execution -> Execution Context Creation and Execution - obviously identifiers for formal parameters are created and bound on context creation",
		body: function() {
			
			function foo(fp) {
    			assert.isDefined(fp);
    			assert.equal(1, fp);
			}
			
			foo(1);
		}
	});
	
	return Suite;
});
