/**
 * RESOURCES:
 * 
 *  http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory/
 *  http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/
 * 
 * THEORY:
 * 
 * 
 * - ECMAScript program runtime is presented as the execution context (EC) stack, where top of this stack is an active execution context
 * So with other words when executing a program we run through a stack of execution contexts - Global Context (that contains global environment) on bottom 
 * and Local Contexts (that contains local environment as a result of function activation - even if the function is called recursively or as the constructor or is built-in eval function).
 * When executing a function (running through its code) we say that we run through its Execution Context.
 * 
 * - With programs we manage data
 * 
 * - In ECMAScript programs data is managed with mechanism called 'environment'
 * 
 * - Environment contains a set of bindings: identifier - value. DEFINITION: A name binding is the association of an identifier with data. Data is accessed via these name bindings.
 * 
 * - Name bindings are stored with mechanism called declarative environment record (ES3 Activation Object)
 * The main thing which we should understand why it was needed to replace old activation object concept with the declarative environment record is 
 * first of all the efficiency of the implementation.
 * Declarative records are assumed to be stored directly at low level of the implementation (for example, in registers of a virtual machine, thus providing fast access).
 * 
 * - 'with' and 'catch' statements creates new environments (they augment 'Lexical Environment' value of the calling environment). 
 * While 'catch' uses declarative record to store bindings, 'with' uses object environment record which is more inneficient that is why with is not allowed in ES5 strict mode.
 * 
 * - Environment types - global and local environments
 *  -- Global environment has no parent while each local environment holds link to its outer environment (parent)
 *  -- Local environments are created for the purpose of Execution Context by activation of functions (even of eval function, constructor functions, and recursive invocation)
 * 
 * - Note that for particular EC when resolving identfier not only own environment but also its outer environments down the EC stack are considered.
 * So all these environments are kind of data environment for particular Execution Context.
 * 
 * - So to summarize. ECMAScript program runtime is presented as the execution context (EC) stack.
 * EC is comprised of two parts:
 *  1) Dynamic (Contextual) Data that becomes clear at runtime. This data is resolved with Prototype Chain and 'this' binding.
 *  2) Static Data that could be infered by a parser. This data is resolved with so called Scope Chain - stored in Environment (set of own and outer) in the form of identifier - value bindings
 * 
 * EC keeps a copy of VariableEnvironment called LexicalEnvironment for the purpose of dynamic features of ECMAScript released with 'with' and 'catch' clauses in combination with function expressions.
 * Basically as a result of these features LexicalEnvironment in ES5 is replaced rather than augmented as it was in ES3.
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
			name: "Execution Context and Environment",
			tests: []
		};
		
		

	Suite.tests.push({
		name: "Execution Context Structure - Pseudocode",
		body: function() {
            
            //The structure of Execution Context in ES3
            var ExecutionContextES3 = {
                
                //'this' is language defined identifier and its value is different according to how the function is invoked
                //this identifier is also known as 'Context' because its value is defined at runtime according to function invocation
                //Context object
                thisValue: this, 
                
                //Access to Own Data
                //vars, function declarations, arguments etc. 
                VariableObject: {}, 
                
                //Access to Parent Data
                //This is used in the process of Identifier Resolution (Scope Chain Resolution) - finding the value of particular identifier
                //Variable Object + all parent VariableObject down the stack of Execution Contexts
                ScopeChain: {}
            };
            
            //The structure of Execution Context in ES5
            var ExecutionContextES5 = {
                
                //'this' is language defined identifier and its value is different according to how the function is invoked
                //this identifier is also known as 'Context' because its value is defined at runtime according to function invocation
                ThisBinding: this, 
                
                //Access to Own Data and Parent Data via outer environments
                //Holds the bindings created for the needs of current Execution Context 
                VariableEnvironment: {}, 
                
                //Initially it is a copy of VariableEnvironment.
                //Access to 1) Parent Data and 2) dynamically created new data ( kind of Child Data :) )
                //In addition to Variable Environment:
                //  - keep a reference to the bindings stored in Environments of the parent Execution Contexts
                //  - augments it with new set of bindings dynamically (with, catch clauses)
                //
                //This is used in the process of Identifier Resolution (Scope Chain Resolution) - finding the value of particular identifier inside Environments down the stack of Execution Contexts
                LexicalEnvironment: {}
            };

		}
	});
	
	Suite.tests.push({
		name: "ThisBinding",
		body: function() {
            
            //By default if invoked directly the 'this' value inside the function execution context would be the GLOBAL OBJECT            
            function local() {
                assert.strictEqual(this, GLOBAL_OBJECT);
            }
            
            local();
            
            //In ES5 strict mode 'this' will be undefined
            function localStrictMode() {
                'use strict';
                
                assert.isUndefined(this);
            }

            localStrictMode();
		}
	});
	
	Suite.tests.push({
		name: "VariableEnvironment",
		body: function() {
		    
            //This is the Variable Environment of the EC created by foo function activation (see function bellow)
            var fooContext_VariableEnvironment = {
              environmentRecord: {
                arguments: {0: 10, length: 1, callee: foo},
                a: 10,
                b: 20
              },
              outer: 'globalEnvironment'
            };
            
            function foo(a) {
                var b = 20;
                
                assert.equal(fooContext_VariableEnvironment.environmentRecord.a, a);
                assert.equal(fooContext_VariableEnvironment.environmentRecord.b, b);
                assert.equal(fooContext_VariableEnvironment.environmentRecord.arguments['0'], arguments[0]);

            }
 
            foo(10);
		}
	});
	
	/**
	 * - Needed for the cases of with and catch combined with function expression and function definition theory
	 **/
	Suite.tests.push({
		name: "LexicalEnvironment",
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
             
              // FD inside 'with' statement usually must throw but none of implementations is doing it
              // NOTE: It is not working like this in Firefox since it uses a term called 'Function Statements'
              // See here for more details: http://kangax.github.io/nfe/#function-statements
              function fooInWith() { 
                return a;
              }
              
              // Function Expression
              var bar = function () {
                  return a;
              };
             
              assert.equal(10, foo()); // 10, from VariableEnvrionment
              assert.equal(10, fooInWith()); // 10, from VariableEnvrionment
              assert.equal(20, bar()); // 20,  from LexicalEnvrionment
             
            }
             
              // 10, because its [[Scope]] property during function creation is copied from VariableEnvrionment
              // This is normal because function creation for FD is done in the very beginning on Execution Context creation phase
              assert.equal(10, foo()); 
              assert.equal(10, fooInWith());
              
              // still 20,  because its [[Scope]] during function creation is copied from LexicalEnvrionment
              // It is copied from Lexical Environment because function expressions create functions during Context Execution Phase
              assert.equal(20, bar());
              

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
		name: "Environments and Declarative Environment Record Structure - Pseudocode",
		body: function() {

            //For the following code
            var x = 10;
             
            function foo() {
              var y = 20;
              assert.equal(x, 10);
              assert.equal(y, 20);
            }
            assert.equal(x, 10);
            
            // We have environment of the global context
            var globalEnvironment = {
              environmentRecord: {
                  
                type: 'declarative',             
                // built-ins:
                //Object: function,
                //Array: function,
                // etc ...
             
                // our bindings:
                x: 10
              },
              // no parent environment
              outer: null 
             
            };
             
            //And environment of the "foo" function
            var fooEnvironment = {
              environmentRecord: {
                y: 20
              },
              outer: globalEnvironment
            };
		}
	});














	Suite.tests.push({
		name: "Environments and Object Environment Record Structure - Pseudocode",
		body: function() {

            var a = 10;
            var b = 20;
             
            with ({a: 30}) {
              assert.equal(50, a + b);
            }
             
            assert.equal(30, a + b);

            //'with' creates environment with following structure
            var environment = {
              environmentRecord: {
                  
                type: 'object',             
                bindingObject: {
                    //store binding here in ordinary object that is not efficient - no immutable properties
                }
              },
              outer: 'Link to the parent environment'
            };
		}
	});





	Suite.tests.push({
		name: "Local Environment",
		body: function() {
            
            //This test is simplified more related information exists in data creation and data resolution test suites
            function local() {
                var localVar = 1;
                assert.equal(1, localVar);
                
                //localVar is part of new local environment it is not bound in the global environment
                assert.isUndefined(GLOBAL_OBJECT.localVar);
            }
            
            local();
		}
	});


	return Suite;
});
