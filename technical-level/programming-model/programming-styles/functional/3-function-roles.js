// http://speakingjs.com/es5/ch15.html

// pure function
// Constructor (Factory)
// method


/**
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * 
 */
define(["chai"], function(Chai) {

    'use strict'

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Functions and Functional Programming Theory",
            tests: []
        };

	Suite.tests.push({
		name: "Function called as a function, method, and constructor",
		body: function() {
			var f = function() {
						return 'test';
					},
				obj = {
					f: function() {
						//note that this is bound to the object that calls the method
						//if this function is assigned to property of another object it will return different value 
						return this.val;
					},
					val: 'test'
				},
				obj1 = {
					f: obj.f,
					val: 'testOfObj1'
				},
				f1 = new F('test');
			
			function F(value){
				this.value = value;
			}
			
			assert.equal(f(), 'test');
			assert.equal(obj.f(), 'test');
			assert.equal(obj1.f(), 'testOfObj1');
			assert.equal(f1.value, 'test');
		}
	});		

	Suite.tests.push({
		name: "Higher Order Functions: Functions that recieve other functions. Map function example.",
		body: function() {
			var values = ['test', 'value'],
				upperValues = values.map(function(item) {
										return item.toUpperCase();
								});
								
			assert.equal('TEST,VALUE', upperValues.toString());								
		}
	});

	Suite.tests.push({
		name: "TODO",
		body: function() {
		    //First-class functions
		    //Funargs and higher order functions
		    //Free variable
		    
		}
	});

    return Suite;
});
