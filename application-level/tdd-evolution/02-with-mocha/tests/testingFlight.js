/**
 * Resources:
 * 
 */
define(["chai", "flight"], function(Chai, Flight) {

    'use strict'

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Testing Twitter Flight",
            tests: []
        };


    Suite.tests.push({
        name: "Main Interface",
        body: function() {
            console.log(Flight);
            
            assert.isFunction(Flight.component);
            assert.isFunction(Flight.logger);
            
            assert.isObject(Flight.advice);
            assert.isObject(Flight.utils);
            assert.isObject(Flight.compose);
            assert.isObject(Flight.registry);
        }
    });
    
    Suite.tests.push({
        name: "Main Interface",
        body: function() {
            console.log(Flight);

            var Component = Flight.component;            
            
        }
    });

    return Suite;
});
