define(["chai"], function(Chai) {

    'use strict'

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Object Oriented Programming in JavaScript",
            tests: []
        };


    Suite.tests.push({
        name: "Immitation of encapsulation in JS",
        body: function() {
            
            //Everybody understands that for each created object, the pair of methods “getA/setA” is created 
            //and what causes the memory issues directly proportional to quantity of created objects 
            //(in contrast with if methods would be defined in a prototype)
            
            //Note that in older engines _a could be accessed in two more ways
            // - with passing EC to eval                -> eval('_a = 100', a.getA);
            // - with accessing EC.AO with __parent__   -> a.getA.__parent__._a = 20;
            function A() {
                var _a;
                
                this.setA = function(a) {
                    _a = a;
                };
                
                this.getA = function() {
                    return _a;
                }
            }
            
            var a = new A();
            a.setA(10);
            assert.equal(10, a.getA());
            assert.isUndefined(a._a);
            
        }
    });

    Suite.tests.push({
        name: "Mixin example - creating a mixin method",
        body: function() {
            
            Object.extend = function(destination, source) {
                for (var property in source) {
                    if (source.hasOwnProperty(property)) {
                        destination[property] = source[property];
                    }
                }
                return destination;
            };
            
            var X = {a: 10};
            var Y = {b: 20};
            
            Object.extend(X, Y);
            assert.equal(20, X.b);
            
            //Note that this is undefined it is not a ReferenceError
            //because we resolve property rather than identifier (variable)
            assert.isUndefined(Y.a);
        }
    });

    Suite.tests.push({
        name: "Composition example",
        body: function() {

            var _delegate = {
                foo: function() {
                    return 'foo from delegate 1';
                }
            };
            
            var aggregate = {
                delegate: _delegate,
                foo: function() {
                    return this.delegate.foo.call(this);
                }
            };
            
            assert.equal('foo from delegate 1', aggregate.foo());
            
            aggregate.delegate = {
                foo: function() {
                    return 'foo from delegate 2';
                }
            };
            
            assert.equal('foo from delegate 2', aggregate.foo());
        }
    });

    Suite.tests.push({
        name: "AOP example with function decorators achieved with functional arguments",
        body: function() {

            function test() {
                return 'test function executed';
            }
            
            //Just execute a function
            assert.equal('test function executed', test());            
            
            
            var valid = false;
            
            function validateDecorator(originalFunction) {
                return function() {
                    if (!valid) {
                        return false;
                    }
                    
                    return originalFunction();
                };
            }
            
            //Now we want to add 'validate' aspect to test function
            var testWithValidation = validateDecorator(test);
            
            //Validation do not pass
            assert.isFalse(testWithValidation());
            
            valid = true;
            
            //Now validation is ok
            assert.equal('test function executed', testWithValidation());
            
        }
    });
    
    
    return Suite;
});
