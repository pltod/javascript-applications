/**
 *  Resources:
 * 
 *      http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory
 * 
 *
 *  - Definition: Scope is an enclosing environment in which a variable is associated with a value.
 * 
 *  - Resolving data in ECMAScript is based on static scoping principle
 * 
 *  - Static scoping imply that an identifier refers to a value defined in its nearest environment - we can infer it by looking at the code that is why it is called static
 */
define(["chai"], function(Chai) {


    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        
        Suite = {
            name: "Data Resolution via Scope Chain",
            tests: []
        };

	

	Suite.tests.push({
		name: "Data Resolution Rule 0: Static scoping which means that identifiers are resolved to the existing value at the time of its creation",
		body: function() {
			//This is context 1
			var identifier0 = 0;

			function env1() {
			    assert.equal(identifier0, 0);
			}	
			
			function env2() {
			    //we set the 'identifier0' to 1 here and call the env1 but it still has value of 0 - that is static (lexical) scoping
			    var identifier0 = 1;
			    env1();
			}
            
            env2();
		}
	});

	Suite.tests.push({
		name: "Data Resolution Rule 1: Data is visible in the environment where defined",
		body: function() {
			//This is context 1
			var identifier0 = 0,
				identifier1 = 1;
				
			//Still visible here
			assert.equal(identifier0, 0);
			assert.equal(identifier1, 1);
		}
	});

	Suite.tests.push({
		name: "Data Resolution Rule 2: Higher environments see data declared in lower environments (the lowest is the global environment)",
		body: function() {
			
			//This is lower context 1
			var identifier0 = 0;
			var identifier1 = 1;
	
			function envrionment() {
				//This function creates new environment which see its outer environment data
				
				//Find them into the lower context
				assert.equal(identifier0, 0);
				assert.equal(identifier1, 1);
			};
	
			envrionment();
		}
	});

	Suite.tests.push({
		name: "Data Resolution Rule 3: Lower envrionments do not see data declared in higher environments (the lowest is the global environment)",
		body: function() {
			
			function environment() {
				
				var identifier0 = 0;
	
				//look into the current context
				assert.equal(identifier0, 0);
			};
	
			environment();
	
			//data from 'envrionment' is not exposed into the outer environment so identifer0 does not exists at all here
			function fn(){identifier0};
			assert.throw(fn, ReferenceError);
		}
	});

	Suite.tests.push({
		name: "Data Resolution Rule 4: Data from the closest environment is visible first",
		body: function() {
			
			//This is lower (outer) environment
			var identifier0 = 0;
	
			function environment1() {
	
				//This is higher envrionment
				var identifier0 = 1;

				function environment2() {
					//This is even higher in the stack environment 2
					//We see data as it is set in outer environment 1
					assert.equal(identifier0, 1);
				}	
				
				environment2();	
			};
	
			environment1();
	
			assert.equal(identifier0, 0);
			console.log(window);
		}
	});
	
	Suite.tests.push({
		name: "Data Resolution Rule 5 - hoisting and FD and FE difference",
		body: function() {
			assert.isFunction(foo);
			assert.isNotFunction(bar);
			assert.isUndefined(bar);
	
			function foo() {
			}
	
			var bar = function bar() {
			};
		}
	});
	
	Suite.tests.push({
		name: "Data Resolution Rule 6 - dynamic scope feature in ECMAScript - with",
		body: function() {
		}
	});

	Suite.tests.push({
		name: "Data Resolution Rule 7 - dynamic scope feature in ECMAScript - eval",
		body: function() {
		}
	});

	Suite.tests.push({
		name: "Data Resolution Rule 8 - closures",
		body: function() {
            //Definition: A closure is a pair consisting of the function code and the environment in which the function is created.
            var x = 10;
             
            (function (funArg) {
             
              var x = 20;
              assert.equal(10, funArg()); // 10, not 20
             
            })(function () { // create and pass a funarg
              return x;
            });
		}
	});


	
    return Suite;
});
