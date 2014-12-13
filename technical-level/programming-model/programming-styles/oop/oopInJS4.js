// TODO refactor with tape

define(["chai"], function(Chai) {

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Principles of Object-Oriented Programming in JavaScript. Chapter 4, Constructors and Prototypes.",
            tests: []
        };








    Suite.tests.push({
        name: "Functions are objects that inherit Function.prototype",
        body: function() {
            function OBJ() {};
            var fp = Function.prototype;

            assert.isFunction(fp.apply);
            assert.isFunction(fp.bind);
            assert.isFunction(fp.call);

            assert.isFunction(OBJ.apply);
            assert.isFunction(OBJ.bind);
            assert.isFunction(OBJ.call);
        }
    });

    Suite.tests.push({
        name: "Object defined with object literal has its [[Prototype]] set to Object.prototype",
        body: function() {
            var user = {
                    name: "pltod"
                },
                proto = user.__proto__, //nonstandard mechanism
                prototype = Object.getPrototypeOf(user); //only in ES5
                
            //Only in ES5 we can do
            assert.equal(prototype, Object.prototype);

            //Nonstandard mechanism
            assert.equal(proto, Object.prototype);
        }
    });

    Suite.tests.push({
        name: "Objects defined with constructor function with new has its [[Prototype]] set to constructor function prototype",
        body: function() {
            function User () {};
            User.prototype.prop = "value";

            var user = new User(),
                prototype = Object.getPrototypeOf(user);
            
            
            assert.equal(prototype, User.prototype);
            assert.isDefined(user.prop);
            assert.equal(user.prop, "value");
            //assert.strictEqual(Object.prototype, User.prototype);
        }
    });

    Suite.tests.push({
        name: "__proto__ is not consistent acros environments so do not rely on it",
        body: function() {
            var v = Object.create(null);

            //The next statement could be false in some environments
            //assert.isTrue("__proto__" in v);

        }
    });
    
    Suite.tests.push({
        name: "Use Object.create to provide custom prototype for new objects",
        body: function() {
            var proto = {v: 'value'},
                vObj = Object.create(proto);

            assert.isTrue(vObj.v === "value");
            assert.strictEqual(vObj.__proto__, proto);
        }
    });
    

    Suite.tests.push({
        name: "Constrcutors must be 'new' agnostic",
        body: function() {
            //Bad
            function Const1(prop1) {
                this.prop1 = prop1;
            }
            //Better
            function Const2(prop2) {
                'use strict';
                this.prop2 = prop2;
            }
            //Best
            function Const3(prop3) {
                if(!(this instanceof Const3)) {
                    return new Const3(prop3);
                }
                this.prop3 = prop3;
            }
            
            var test3 = Const3("test3");
                
            //TODO Why this cannot be tests???
            //It seems the functions are executed here in strict mode by default
            //Usually only in strict mode TypeError is thrown
            //assert.throw(Const1("test1"), TypeError);
    
            //assert.throw(Const2("test2"), TypeError);
            
            assert.equal(test3.prop3, "test3");
            
        }
    });
    
    
    Suite.tests.push({
        name: "Constrcutor Override Pattern",
        body: function() {
            function User() {
                var self, val;
                if (this instanceof User) {
                  self = this;
                  val = 'Called with new';
                } else {
                  self = Object.create(User.prototype);
                  val = 'Called without new';
                }
                self.val = val;
                //return self;
            }
            var u1 = User(), 
                u2 = new User();
            //assert.isTrue(u1.val == 'Called without new');
            assert.isTrue(u2.val == 'Called with new');
        }
    });
    

    return Suite;
});
