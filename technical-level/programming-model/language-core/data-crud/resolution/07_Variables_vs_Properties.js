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
            name: "Core JavaScript API",
            tests: []
        };

    Suite.tests.push({
        name: "Array.concat",
        body: function() {
            
            //Concat creates a new array consisting of the elements in the this object on which it is called
            var concatenated = [1,2,3].concat([4,5,6], [7,8,9]);
            assert.isArray(concatenated);
            assert.equal(concatenated.length, 9);
        }
    });


    return Suite;
});
