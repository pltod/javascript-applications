/**
 * Resources:
 * 
 * http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory
 * 
 */
define(["chai"], function(Chai) {

    'use strict'

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Data Update",
            tests: []
        };

    Suite.tests.push({
        name: "TODO",
        body: function() {
            //Re-binding and Mutation
            //By-reference, by-value, by-sharing from here http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/
        }
    });


    return Suite;
});
