/**
 * RESOURCES:
 * 
 *	BOOK: Principles of object-oriented programming in JavaScript by Zakas
 *          https://leanpub.com/oopinjavascript
 * 
 * 
 * THEORY:
 * 
 *  - ES defines internal properties for objects. They are notated with double square bracket notation.
 * 
 *  - The defining characteristic of a function that distinguishes it from any other object is the presence of an internal property called [[Call]].
 * 
 *  - The typeof operator return 'function' for any object with such property.
 * 
 *  - There are function declarations and function expressions - FD and FE
 * 
 *  - Functions can be used as values - functional programming theory
 * 
 *  - Functions can be invoked with as many parameters as we want even if formal parameters are missing.
 *      These input parameters could be accessed via arguments object.
 * 
 *  - 'length' property shows function's arity - the number of parameters it expects
 * 
 *  - Function overloading - the bility of a single function to have multiple signatures (the name and the number and type of parameters)
 * 
 *  - In JS functions do not have signatures, thus, they can not be overloaded.
 *      -- in case with two functions with the same name the second definition in the context wins
 *      -- another possibility is to check arguments object to see which version (by the number of parameters) of the function is invoked
 * 
 *  - Function used for values of object properties are methods
 * 
 *  - In ES5 we have one more method to change the context - bind function - which behaves differently from call and apply
 * 
 *  - 
 */
define(["chai"], function(Chai) {

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Principles of Object-Oriented Programming in JavaScript. Chapter 2, Functions.",
            tests: []
        };

    Suite.tests.push({
        name: "Each function has access to array-like arguments object that contains input parameters.",
        body: function() {
            
            assert.isDefined(arguments);
            
            //However arguments is not an instance of Array
            assert.isFalse(Array.isArray(arguments));
        }
    });

    Suite.tests.push({
        name: "Using 'bind' function to change context",
        body: function() {
            var context1 = {value: 1},
                context2 = {value: 2};
                
            function fn() {
                return this.value;
            }
            fn.prop = 5;
            
            var fnInContext1 = fn.bind(context1),
                fnInContext2 = fn.bind(context2);
                
            assert.equal(1, fnInContext1());
            assert.equal(2, fnInContext2());
            
            
            //bind creates completely new function in memory
            assert.notStrictEqual(fn, fnInContext1);
            assert.notStrictEqual(fn, fnInContext2);
            
            //that is why fn properties does not exists on the newly created fucntion objects with bind
            assert.equal(5, fn.prop);
            assert.isUndefined(fnInContext1.prop);
            fn = 3;
            assert.isNotFunction(fn);
            
            //and when we change fn reference the created with bind functions are still working
            assert.isFunction(fnInContext1);
            
            
        }
    });


    return Suite;
});
