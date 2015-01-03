/**
 * Resources:
 * 
 *    http://www.functionaljavascript.com/
 * 
 *  Chapter 3.
 *
 */
define(["chai"], function(Chai) {

    'use strict'

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Functional programming with JavaScript. Chapter 3, Variable Scope and Closures.",
            tests: []
        };

    Suite.tests.push({
        name: "TODO",
        body: function() {
            
            //Scope
            // - the value of this binding
            // - the EC defined by the value of this
            // - the lifetime of variable
            // - the variable resolution scheme - lexical binding  (this definition is used in the book)
            
            //Resolution schemes
            // - Global Scope
            // - Lexical (Static) Scope - this is related with data visibility... I call this 4 rules for data resolution
            // - Dynamic Scope - involves the creation of dynamic scopes - call, apply
            // - this scope
            // - Function Scope
            // - with and eval simulate dynamic scope in ES - “Runtime scope augmentation”
            // - Closures, free variables etc.
            
        }
    });


    return Suite;
});
