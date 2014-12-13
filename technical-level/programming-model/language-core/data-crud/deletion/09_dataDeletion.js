/**
 * RESOURCES:
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript
 * 
 * 
 * THEORY:
 * 
 */
define(["chai"], function(Chai) {

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Data Deletion",
            tests: []
        };

    Suite.tests.push({
        name: "Deletion of properties and variables",
        body: function() {

            function fn() {
                //The code does not create variable in this EC but property of the global object
                a = 1;
                assert.equal(1, a);
                //This property could be deleted
                assert.isTrue(delete a);
                
                //Now it does not exist anymore
                return a;
            }
            assert.throw(fn, ReferenceError);
            
            var b = 2;
            assert.equal(2, b);
            //Variables have {DontDelete} attribute set to true
            //In ES5 {DontDelete} is renamed into the [[Configurable]] and can be manually managed via Object.defineProperty method
            assert.isFalse(delete b);
            assert.equal(2, b);
            
        }
    });

    Suite.tests.push({
        name: "In eval context {DontDelete} attribute is not set to true for variables",
        body: function() {
            
            var b = 0; 
            assert.isFalse(delete b);
            
            eval('var a = 1;');
            assert.equal(1, a);
            assert.isTrue(delete a);
        
            function fn() {
                //b is not deleted since its a variable with {DontDelete} = true
                assert.equal(0, b);
                
                //variable 'a' is deleted because it is created with eval statement
                return a;
            }
            
            assert.throw(fn, ReferenceError);
        }
    });

    return Suite;
});
