/**
 * RESOURCES:
 * 
 *  http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#execution-context-stack
 * 
 * THEORY
 * 
 *  - eval is a function that define function and execute it immediatelly after that
 *  - eval function creates execution context and hoisting is valid for it as well
 */
var GLOBAL_OBJECT = this, //window in browser environment
	GLOBAL_VAR1 = 1,
	GLOBAL_VAR2 = {},
	GLOBAL_FUNC = function globalFunc() {};
	
eval('var GLOBAL_EVAL = 2;');
	
define(["chai"], function(Chai) {
	
	var should = Chai.should(),
		expect = Chai.expect,
		assert = Chai.assert,

		Suite = {
			name: "Dynamic Environment",
			tests: []
		};

	Suite.tests.push({
		name: "eval statements invoked in Global Environment creates data into Global Environment",
		body: function() {

			assert.equal(2, GLOBAL_OBJECT.GLOBAL_EVAL);
			assert.strictEqual(GLOBAL_EVAL, GLOBAL_OBJECT.GLOBAL_EVAL);
			
		}
	});

	Suite.tests.push({
		name: "eval function invoked in Local Environments creates data into the calling Environment",
		body: function() {
		    
            eval('function x(){}');
		    assert.isFunction(x);
		    
		    var x = 10;
		    assert.equal(10, x);
	    }
	});

	Suite.tests.push({
		name: "eval function invoked in Local Environments does not leave data into the calling Environment only in strict mode",
		body: function() {
		    
		    "use strict";

            eval('function x(){}');
		    assert.isUndefined(x);
		    
		    var x = 10;
		    assert.equal(10, x);
	    }
	});

    //Very interesting test case
	Suite.tests.push({
		name: "eval 1) creates new Execution Context and 2) hoisting principles are valid, but 3) sets identifiers into caller environment",
		body: function() {
            
            //Definition and declaration is hoisted (created on execution context creation)
		    assert.isFunction(x);
		    
		    //During runtime identifier 'x' is rebound
		    var x = 10;
		    assert.equal(10, x);
		    
		    //During runtime identifier 'x' is rebound again
		    x = 20;
		    assert.equal(20, x);

            //This is set at context creation
		    function x() {};

            //And now 'x' is not a function anymore
		    assert.isNotFunction(x);
    		
    		
        	//With eval 'x' is function again because it is inside a newly created execution context where hoisting principles are still working
	        eval('assert.isFunction(x);var z = 10;assert.equal(10, z);function x() {}');
	        eval('var z = 10;assert.equal(10, z);');
	        
	        //And here we can see that 'x' is again rebound - its usage in eval EC rebind the value found in the caller EC
	        assert.isFunction(x);
	        //And eval EC is creating identifiers into caller EC environment
	        assert.equal(10, z);
	        
	        //Execution Context created by eval is using properly the scope chain to resolve identifiers from parent execution context
	        var y = 50;
	        eval('assert.equal(50, y);');
	        
	    }
	});
	

	return Suite;
});
