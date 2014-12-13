// TODO refactor with tape

/**
 * RESOURCES: 
 * 
 *  http://dmitrysoshnikov.com/ecmascript/chapter-3-this/
 * 
 * THEORY:
 * 
 * - 'this' value is determined on entering the EC and is immutable while the code is running in the EC.
 * 
 * - 'this' value is not statically bound to a Function EC rather it depends on how the function is called
 * 
 * - There is internal type - ReferenceType - used for 'this' value resolution
 * 
 * - Resolution Rules
 *  -- the value of 'this' depends on the function caller
 *  -- if the caller is of ReferenceType
 *      --- the value of 'this' is set to ReferenceType.base
 *      --- the value of 'this' is set to GlobalObject or 'undefined' (strict mode) when ReferenceType.base = null
 *          This happens in case we invoke directly a function in function EC. Then ReferenceType.base = ActivationOBject which is resolved to null.
 *  -- if the caller is not of a ReferenceType
 *      --- the value of this is set to GlobalObject or 'undefined' in ES5 strict mode

 * - ReferenceType  are created for identifier and property accessors and resolved with GetValue method
 * 
 * - 'this' is the VariableEnvironment for Global EC also known as Global Object
 * 
 * - 'this' object (thus GlobalObject) stores all identifiers defined in Global EC
 * 
 */
var GLOBAL_OBJECT = this,
    GLOBAL_VAR = 1;

//Global function
function fn() {return 2};
        
define(["chai"], function(Chai) {

    var should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,
        
        Suite = {
            name: "Data Resolution Via Prototype Chain",
            tests: []
        };

    Suite.tests.push({
        name: "'this' is the VariableEnvironment for Global EC also known as Global Object",
        body: function() {
            //Global declarations of functions and variables creates properties inside 'this' object because it is VariableEEnvironment for the Global EC
            assert.equal(1, GLOBAL_OBJECT.GLOBAL_VAR);
            assert.equal(2, GLOBAL_OBJECT.fn());
        }
    });
    
    
    Suite.tests.push({
        name: "Reference Type representation and resolution with GetValue",
        body: function() {
            
            function bar() {}
            
            //Reference Type for bar identifier.
            //this in the EC created by the function is equal to the 'base' of its ReferenceType
            var barReferenceType = {
                base: 'GlobalObject',
                propertyName: "bar"
            };        
            //GetValue(barReferenceType); // function object "bar"
            
            var obj = {
                foo: function() {}
            },
            //Reference Type for obj.foo (or obj['foo']) property.
            //this in the EC created by the function is equal to the 'base' of its ReferenceType
            objFooReferenceType = {
                base: 'obj',
                propertyName: "foo"
            };
            //GetValue(objFooReferenceType); // function object "foo"
            
            //Pseudocode of GetValue used to obtain the value of a reference type
            //
            //function GetValue(value) {
             
            //  if (Type(value) != Reference) {
            //    return value;
            //  }
             
            //  var base = GetBase(value);
             
            //  if (base === null) {
            //    throw new ReferenceError;
            //  }
             
            //  return base.[[Get]](GetPropertyName(value));
             
            //}            
        }
    });    
    
    Suite.tests.push({
        name: "'this' value can not be changed during context execution",
        body: function() {
        
            function fn() {
                //This is not allowed
                //this = 'something';
                throw new Error();
            }
            assert.throw(fn, Error);
        }
    });

    Suite.tests.push({
        name: "'this' value depends on the caller",
        body: function() {
            
            var foo = {x: 20};
            var bar = {
                x: 10,
                testCalledWithBar: function() {
                    assert.strictEqual(bar, this);
                    assert.strictEqual(10, this.x);
                },
                testCalledWithFoo: function() {
                    assert.strictEqual(foo, this);
                    assert.strictEqual(20, this.x);
                }
            };
            
            bar.testCalledWithBar();
            
            foo.test = bar.testCalledWithFoo;
            foo.test();
        }
    });

    Suite.tests.push({
        name: "Calling global functions - 'this' = ReferenceType.base = GlobalObject",
        body: function() {
        
            function fn() { 
                assert.strictEqual(this, GLOBAL_OBJECT); 
            }
            
            //ReferenceType.base = GlobalObject
            fn();
            
            function fn1() {
                assert.strictEqual(this, fn1.prototype);
            }
            
            //constructor property in the prototype has the same value as fn1 function
            assert.strictEqual(fn1, fn1.prototype.constructor);
            
            //So if we call fn1 in this way we will have its prototype as 'this' value inside its EC
            //Because ReferenceType.base = fn1.prototype
            fn1.prototype.constructor();
        }
    });
    
    Suite.tests.push({
        name: "Calling functions used as methods - 'this' = ReferenceType.base = 'Object used for calling'",
        body: function() {
            
            var foo = {
                barCalledWithFoo: function() {
                    assert.strictEqual(this, foo);
                },
                barCalledWithAnotherObj: function() {
                    assert.strictEqual(this, anotherObj);
                },
                barCalledAsGlobalFunc: function() {
                    assert.strictEqual(this, GLOBAL_OBJECT);
                }
            }, 
            anotherObj = {
                anotherObjMethod: foo.barCalledWithAnotherObj
            },
            fn = foo.barCalledAsGlobalFunc;       
            
            //this = foo
            //because ReferenceType.base = foo
            foo.barCalledWithFoo();
            
            //this = anotherObj
            //because ReferenceType.base = anotherObj            
            anotherObj.anotherObjMethod();
            
            //this = GlobalObject
            //because ReferenceType.base = GlobalObject            
            fn();
        }
    });    
    
   Suite.tests.push({
        name: "Calling function within Function EC - 'this' = ReferenceType.base = GlobalObject or 'undefined' in strict mode",
        body: function() {
            function foo() {
                function bar() {
                    assert.equal(GLOBAL_OBJECT, this);
                }
                
                // it is implicit ActivationObject.bar()
                // but AO return null for 'this' value so we have null.bar()
                bar(); 
            }
        }
    }); 


   Suite.tests.push({
        name: "Calling function within Function EC - 'with' statement - 'this' = ReferenceType.base = __withObject",
        body: function() {
            function foo() {
                var x = 10;
                
                with({
                    foo: function() {
                        assert.equal(20, this.x);
                    },
                    x: 20
                }) {
                    //Here we have dynamicly augmented environment
                    //So our reference type is
                    //var  fooReference = {
                    //    base: __withObject,
                    //    propertyName: 'foo'
                    //};
                    foo();
                }
            }
        }
    }); 
    
   Suite.tests.push({
        name: "Calling function within Function EC - 'catch' clause - 'this' = ReferenceType.base = GlobalObject or 'undefined' in strict mode",
        body: function() {
            try {
                throw function() {
                  assert.equal(GLOBAL_OBJECT, this);  
                };
            } catch(e) {
                 // __catchObject - in ES3, global - fixed in ES5
                e();
            }
            
            // ES 3
            var eReference = {
              base: '__catchObject',
              propertyName: 'e'
            };
             
            // but, as this is a bug
            // then this value is forced to global in ES 5
            // null => global
            var eReference = {
              base: 'global',
              propertyName: 'e'
            };                
        }
    }); 

   Suite.tests.push({
        name: "Calling function within Function EC - recursion with named function expression - 'this' = ReferenceType.base = GlobalObject  or 'undefined' in strict mode",
        body: function() {
            
            (function foo(bar) {
             
              assert.equal(GLOBAL_OBJECT, this);
             
              // In second execution it is a ReferenceType call and it "should" be special object, but it is always (the correct one) GlobalObject
              // Closely related with NFE - http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#feature-of-named-function-expression-nfe
              !bar && foo(1);
             
            })(); // in initial execution 'this' is set to GlobalObject - it is actually a non-ReferenceType call
            
        }
    }); 

   Suite.tests.push({
        name: "Calling function as a Constructor - 'this' = ReferenceType.base = NewlyCreatedObject",
        body: function() {
            
            //How this works:
            // - the new operator calls the internal [[Construct]] method of the ConstObj function
            // - which after that calls the internal [[Call]] method of the ConstObj function providing the newly created object as 'this' value
            var obj = new ConstObj();
            
            function ConstObj() {
                this.ref = this;
            }
            
            assert.strictEqual(obj, obj.ref);
            
        }
    }); 
    
    Suite.tests.push({
        name: "Calling function with non-Reference Type - example 1",
        body: function() {
            (function () {
                //This invocation is not with a ReferenceType so this is set to null and converted to GlobalObject automatically
                assert.strictEqual(GLOBAL_OBJECT, this);
            })();
        }
    }); 
    
    Suite.tests.push({
        name: "Calling function with non-Reference Type - example 2",
        body: function() {
            (function () {
                'use strict';
                
                //This invocation is not with a ReferenceType so 'this' is set to undefined in ES5 strict mode
                assert.isUndefined(this);
                
            })();
            
        }
    }); 


    Suite.tests.push({
        name: "Calling function with non-Reference Type - example 3",
        body: function() {
            var foo = {
              bar1: function () {
                assert.equal(foo, this);
              },
              bar2: function () {
                assert.equal(foo, this);
              },
              bar3: function () {
                assert.equal(GLOBAL_OBJECT, this);
              },
              bar4: function () {
                assert.equal(GLOBAL_OBJECT, this);
              },
              bar5: function () {
                assert.equal(GLOBAL_OBJECT, this);
              }
            };
            
            // Reference, OK => foo
            foo.bar1();
            
            // Reference, OK => foo
            // grouping operator which does not call GetValue so the call is still of ReferenceType
            (foo.bar2)(); 
             
             // non-Reference type call -> global or "undefined" in strict mode
             // assignment operator calls GetValue as a result we lose the ReferenceType and have the function object itself
            (foo.bar3 = foo.bar3)(); 
            
            // non-Reference type call ->  global or "undefined" in strict mode
            // logical OR expression calls GetValue as a result we lose the ReferenceType and have the function object itself
            (false || foo.bar4)(); 
            
            // non-Reference type call -> global or "undefined" in strict mode
            // comma operator calls GetValue as a result we lose the ReferenceType and have the function object itself
            (foo.bar5, foo.bar5)(); 
        }
    }); 
    
    
   Suite.tests.push({
        name: "Manual setting of 'this' value - call and apply",
        body: function() {

            var obj1 = {b: 20},
                obj2 = {b: 30};
             
            function a1(c) {
                assert.equal(GLOBAL_OBJECT, this);
                assert.equal(20, c);
            }

            function a2(c) {
                assert.equal(obj1, this);
                assert.equal(20, this.b);
                assert.equal(30, c);
            }

            function a3(c) {
                assert.equal(obj2, this);
                assert.equal(30, this.b);
                assert.equal(40, c);
            }
             
            // this === global, this.b == 10, c == 20 
            a1(20); 
            
            // this === {b: 20}, this.b == 20, c == 30 
            a2.call(obj1, 30); 
            
            // this === {b: 30}, this.b == 30, c == 40
            a3.apply(obj2, [40]) 
            
        }
    });     
    
    
    
    return Suite;
});
