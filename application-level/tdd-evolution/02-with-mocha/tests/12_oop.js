/**
 * RESOURCES:
 * 
 *  http://dmitrysoshnikov.com/ecmascript/chapter-7-1-oop-general-theory/
 *  http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation/
 *  http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
 * 
 * THEORY:
 * 
 * - ECMAScript supports multiple programming paradigms, which are:
 *      -- structured
 *      -- object-oriented
 *      -- functional
 *      -- imperative
 *      -- aspect-oriented
 * 
 * - ECMAScript is the object-oriented programming language with the prototype based implementation.
 * Prototype based model of OOP has a number of differences from the static class based paradigm.
 * The difference class vs. prototype may be not that essential as the difference statics + classes vs. dynamics + prototypes
 * 
 * - Static class based model
 *  -- The class represents a formal abstract set of the generalized characteristics. To create an object first it is necessary to define its class
 *  -- Characteristics of instances are: properties (object description) and methods (object activity). 
 *      So the object are created in its own classification (structure and behavior)
 *  -- Characteristics themselves also can be treated as objects: i.e. whether a property is writable, configurable, active (getter/setter), etc.
 *  -- Objects store a state (i.e. concrete values of all properties described in a class), 
 *      and classes define strict unchangeable structure (i.e. presence of those or other properties) and strict unchangeable behavior (presence of those or other methods) of their instances.
 *  -- For code reuse, classes can extend other classes, bringing necessary additions. This mechanism is called as (hierarchical) inheritance.
 *      Even if at deeper levels of a hierarchy some properties are not needed to object, it will have all of them anyway.
 *  -- Resolution of methods is handled by a strict, direct, unchangeable chain of inheritance.
 *  -- Being created, the class cannot (because of the static model) to change a set of characteristics (neither properties, nor methods) of their instances.
 *  -- Instances (again because of strict static model) cannot have neither additional own (unique) behavior, nor the additional properties which are distinct from structure and behavior of the class.
 * 
 * - Prototype based model
 *  -- Here the basic concept is dynamic mutable objects
 *  -- Objects can independently store all their characteristics (properties, methods) 
 *  -- Objects can easily change (add, delete, modify) their characteristics
 *  -- The code reuse in this case is achieved by referencing to prototype - prototype-based inheritance.
 *  -- Prototypes can also have their own prototypes. This connected combination of prototypes forms a, so-called, prototype chain
 *  -- Delegation based model - Any object can be used as a prototype of another object. (used in ES)
 *  -- Concatenative model - as opposed to delegation model here 
 *      all characteristics are not delegated by copied on object creation so both - the object and its prototype could change independently.
 *  -- Duck typing - since the object has no class it is identified with checking about its characteristics
 * 
 * - Dynamic class based model
 *  -- Classes characteristics can be changed at runtime
 *  -- Such languages are Ruby and Python
 * 
 * - Polymorphism 
 *  -- function can be applied to different objects
 *  -- some functions require particular type of objects - Date.prototype.getTime expects Data or throws TypeError
 *  -- parametric polymorphism - function is defined equally for all data types, 
 *      but however, accepts polymorphic functional argument (example is the .sort method of arrays and its argument — polymorphic sort function)
 *
 * - Encapsulation
 *  -- Encapsulation is an increasing of abstraction, but not a paranoid hiding from “malicious hackers” which, 
 *      “want to write something directly into fields of your classes”.
 *  -- Convenient “sugars” of some OOP implementations are the well known modifiers: private, protected and public 
 *      which also are called as access levels (or access modifiers) to characteristics of objects
 * 
 * - ECMAScript does not support multiple inheritance which is used for code reuse improvement
 * 
 * - Mixins are also a convenient way of a code reuse. Alternative for multiple inheritance.
 * 
 * - Traits are similar to mixins but does not allow naming conflicts. ES simulate them in the form of mixins.
 * 
 * - Interfaces are also alternative to multiple inheritance. Interfaces force classes to completely implement behaviour.
 *  ES does not have interface and abstract class concepts but this could be simulated.
 * 
 * - Object composition (has-a) is another technique for dynamic code reuse. Object composition differs from inheritance with higher flexibility.
 *      Usually this is preffered technique for code reuse than inheritance (is-a).
 * 
 * - Function decorators arefeature of AOP. There is not such term in ES but still fucntions could be decorated with functional arguments.
 * 
 * 
 */
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
