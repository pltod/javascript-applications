// TODO refactor with tape

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
