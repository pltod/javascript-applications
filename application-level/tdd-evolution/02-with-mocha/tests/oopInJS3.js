/**
 * RESOURCES:
 * 
 *	    
 *      BOOK: Principles of object-oriented programming in JavaScript by Zakas
 *          https://leanpub.com/oopinjavascript
 *      
 *      ARTICLES:
 *          http://ejohn.org/blog/javascript-getters-and-setters/
 * 
 * 
 * THEORY:
 * 
 * - Created objects are wide open for modification
 * 
 * - JS adds object properties with the internal method [[Put]] - similar to adding key to a hash table
 * 
 * - With [[Put]] method apart from the key JS specifies two more things - property value and property attributes
 * 
 * - When new value to existing property is assigned JS use internal method [[Set]]
 * 
 * - All properties added to an object are enumerable by default. Enumerable properties have [[Enumerable]] attribute set to true and appear in for - in loops.
 * 
 * - There are two types of properties - data and accessor properties
 * 
 * - There are two property attributes shared between data and accessor properties - [[Enumerable]] and [[Configurable]]
 * 
 * - Data properties attributes - [[Value]] and [[Writable]]
 * 
 * - Accessor properties attributes - [[Get]] and [[Set]]
 * 
 * - It is possible to define multiple properties on an object at once using Object.defineProperties().
 * 
 * 
 */
define(["chai"], function(Chai) {

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Principles of Object-Oriented Programming in JavaScript. Chapter 3, Understanding Objects.",
            tests: []
        };


    Suite.tests.push({
        name: "Detecting object properties",
        body: function() {
            
            var obj = {
                    prop: 0,
                    method: function() {}
                }, 
                executed = false;
            
            
            //prop property exist but its value is falsy so the code in if block is not executed
            if (obj.prop) {
                executed = true;
            }
            
            //executed is still false
            assert.isFalse(executed);
            
            //proper way of property detection
            if ('prop' in obj) {
                executed = true;
            }
            
            assert.isTrue(executed);
            
            //methods are also properties so they are checked the same way
            assert.isTrue('method' in obj);
        }
    });


    Suite.tests.push({
        name: "Detecting own object properties",
        body: function() {
            
            var obj = {
                    method: function() {}
                };
            
            //has such property but it is defined in 'obj' parent
            assert.isTrue('toString' in obj);
            
            //must use special method to check if the property exists and if it is an own property
            assert.isTrue(obj.hasOwnProperty('method'));
            assert.isFalse(obj.hasOwnProperty('toString'));
        }
    });


    Suite.tests.push({
        name: "Deleting properties with 'delete' invokes internal operation [[Delete]]",
        body: function() {
            
            var obj = {
                    method: function() {}
                };
            
            assert.isDefined(obj.method);
            assert.isNotNull(obj.method);
            assert.isTrue(obj.hasOwnProperty('method'));
            
            obj.method = null;
            
            //Still exists
            assert.isDefined(obj.method);
            assert.isTrue(obj.hasOwnProperty('method'));
            
            //but it is null
            assert.isNull(obj.method)
            
            
            delete obj.method;
            assert.isUndefined(obj.method);
            assert.isFalse(obj.hasOwnProperty('method'));
            
        }
    });


    Suite.tests.push({
        name: "Loop through object properties",
        body: function() {
            
            var obj = { method: function() {} },
                obj2 = Object.create(obj, 
                        {
                            name: {
                                configurable: true,
                                enumerable: true,
                                value: "Greg",
                                writable: true
                            }
                        }),
                properties = Object.keys(obj2),
                i, 
                len,
                counter = 0,
                property;
            
            //Iterate only trough own properties
            for(i=0, len=properties.length; i < len; i++) {
                //name = properties[i]
                //value = obj[properties[i]]
                counter++;
            }
            
            assert.equal(1, counter);
            
            counter = 0;
            //Iterate through all properties on prototype chain
            for (property in obj2) {
                //name: property
                //value: obj[property]
                counter++;
            }
            
            //The counter is 2 because most of the built-in properties are not enumerable - [[Enumerable]] = false
            assert.equal(2, counter);
            
            //For example
            assert.isFalse(obj2.propertyIsEnumerable('toString'));
        }
    });


    Suite.tests.push({
        name: "Data and accessor properties - could be useful to add validation, logging, etc.",
        body: function() {
            
            var obj = {
                
                    //Data property
                    _name: 'name',
                    
                    //Accessor property 'name'
                    get name() {
                        return this._name;
                    },
                    
                    set name(value) {
                        this._name = value;
                    }
            };
            
            
            //Outside of the object we refer to 'name' accessor property to manipulate value inside '_name' data property
            assert.equal('name', obj.name);
            
            obj.name = 'new name';
            
            assert.equal('new name', obj.name);
            
            //Note that '_name' is not hidden and we still have direct access to it
            assert.equal('new name', obj._name);
            
        }
    });

    Suite.tests.push({
        name: "Data and accessor properties - could be read and write only",
        body: function() {
            
            var obj1 = {
                
                    //Data property
                    _name: 'name',
                    
                    get name() {
                        return this._name;
                    }
            };
            
            var obj2 = {
                
                    //Data property
                    _name: 'name',
                    
                    set name(value) {
                        this._name = value;
                    }
            };
            
            assert.equal('name', obj1.name);
            //Does not have effect will throw in strict mode - TypeError: Cannot set property name of #<Object> which has only a getter
            obj1.name = "new name";
            assert.equal('name', obj1.name);
            
            
            //we do not have getter so getting the _name will return undefined
            assert.isUndefined(obj2.name);
            obj2.name = "new name";
            assert.isUndefined(obj2.name);
            
            //But the setter has set the value correctly
            assert.equal('new name', obj2._name);
        }
    });


    Suite.tests.push({
        name: "[[Enumerable]] and [[Configurable]] attributes",
        body: function() {
            
            var obj = {
                    name: 'name',
                    address: 'address'
            };
            
            //By default a property is enumerable
            assert.isTrue(obj.propertyIsEnumerable('name'));
            
            //By default a property is configurable becuse we can change its attributes
            Object.defineProperty(obj, 'name', {enumerable: false});
            assert.isFalse(obj.propertyIsEnumerable('name'));
            
            //When the property is configurable we can delete it -> by default we can do that
            delete obj.name;
            assert.isUndefined(obj.name);
            
            //we can make property to be not configurable anymore
            Object.defineProperty(obj, 'address', {configurable: false});
            //will throw in strict mode since this is not configurable property
            //now fails silently
            delete obj.address; 
            //still exists
            assert.equal('address', obj.address);
            
            function fn() {
                //Will throw TypeError: Cannot redefine property: address
                //So once made not configurable this is irreversable
                Object.defineProperty(obj, 'address', {configurable: true});
            }
            
            assert.throw(fn, TypeError);
            
        }
    });


    Suite.tests.push({
        name: "[[Value]] and [[Writable]] attributes",
        body: function() {

            var obj = {};
            
            //Here we create property with values the same as default values put by JS engine
            //Note that if we ommit some of these we will have false values and this will contradict with normal behaviour
            Object.defineProperty(obj, "name", {
                value: "name",
                enumerable: true,
                configurable: true,
                writable: true
            });
            
            assert.equal('name', obj.name);
            
        }
    });


    Suite.tests.push({
        name: "[[Get]] and [[Set]] attributes",
        body: function() {
            
            //[[Get]] and [[Set]] contain the getter function and the setter function, respectively.
            
            var obj = {
                _name: 'name'
            };

            // we want not writable and non enumerable accessor property
            Object.defineProperty(obj, 'name', {
                //note that we define 'get' as function in comparison with object literal notation where function keyword is ommited
                //the same can be done with 'set'
                get: function() {
                    return this._name;
                }
            });
            
            //it is not writable
            obj.name = 'new name';
            assert.equal('name', obj.name);
            
            //not enumerable
            assert.isFalse(obj.propertyIsEnumerable('name'));
            
            //Basically the property is immutable unless we use directly '_name'
            //Which comes to show that accessor properties are to specify some custom logic - validation, logging - but not prevent access to internal data property '_name'
            assert.isTrue(obj.propertyIsEnumerable('_name'));
            obj._name = 'new name';
            assert.equal('new name', obj.name);
        }
    });


    Suite.tests.push({
        name: "Retreiving property attributes",
        body: function() {
            var obj = {
                name: 'name'
            };
            
            var propertyAttributes = Object.getOwnPropertyDescriptor(obj, 'name');
            
            //The current value
            assert.equal('name', propertyAttributes.value);
            
            //Default values for attributes
            assert.isTrue(propertyAttributes.enumerable);
            assert.isTrue(propertyAttributes.configurable);
            assert.isTrue(propertyAttributes.writable);
        }
    });


    Suite.tests.push({
        name: "Preventing object modification - preventing extensions",
        body: function() {
            
            'use strict';
            
            var obj = {
                name: 'name'
            };
            
            assert.isTrue(Object.isExtensible(obj));
            
            Object.preventExtensions(obj);
            
            assert.isFalse(Object.isExtensible(obj));
            
            function fn() {
                //Will throw TypeError: Can't add property newprop, object is not extensible
                //In non strict mode will fail silently
                obj.newprop = 'value';
            }
            
            assert.throw(fn, TypeError);
            
        }
    });


    Suite.tests.push({
        name: "Precenting object modification - sealing objects",
        body: function() {
            
            //this mode is especially useful for sealed objects to see inproper use of the sealed objects explicitely
            'use strict';
            
            /**
                The second way to create a non-extensible object is to seal the object. A sealed object is nonextensible
                and all of its properties are non-configurable. That means not only can you not add new
                properties to the object but you also can’t remove properties or change their type (from data to
                accessor or vice versa). Sealed objects can only have their properties read from and written to.
            */
            
            var obj = {
                name: 'name'
            };
            
            assert.isTrue(Object.isExtensible(obj));
            assert.isFalse(Object.isSealed(obj));
            
            Object.seal(obj);
            assert.isFalse(Object.isExtensible(obj));
            assert.isTrue(Object.isSealed(obj));
            
            //not extensible anymore
            function fn() {
                //TypeError: Can't add property newprop, object is not extensible
                //in non strict mode will fail silently
                obj.newprop = 'value';    
            }
            assert.throw(fn, TypeError);
            
            function fn1() {
                //after sealing all properties become non-configurable
                //TypeError: Cannot delete property 'name' of #<Object>
                //in non strict mode will fail silently
                delete obj.name;
            }
            assert.throw(fn1, TypeError);
            
            //But its properties are still writable
            obj.name = 'new name';
            assert.equal('new name', obj.name);

        }
    });

    Suite.tests.push({
        name: "Precenting object modification - freezing objects",
        body: function() {
            
            'use strict';
            
            /**
              The last way to create a non-extensible object is to freeze it. A frozen object is non-extensible, all
              of its properties are non-configurable, and all data properties are non-writable. In essence, a frozen
              object is a sealed object where all data properties are also read-only. Frozen objects are simply snapshots of an object at a particular point in time. 
              They are of limited use and should be used rarely. As with all non-extensible objects, it’s recommended to use strict mode with frozen objects.
            */
            
            var obj = {
                name: 'name'
            };
            
            assert.isTrue(Object.isExtensible(obj));
            assert.isFalse(Object.isSealed(obj));
            assert.isFalse(Object.isFrozen(obj));
            
            Object.freeze(obj);
            assert.isFalse(Object.isExtensible(obj));
            assert.isTrue(Object.isSealed(obj));
            assert.isTrue(Object.isFrozen(obj));
            
            
            function fn() {
                
                //Now appart from the extensible and sealed limitation we have one more we can not change properties values
                //TypeError: Cannot assign to read only property 'name' of #<Object>
                //in non strict mode will fail silently
                obj.name = 'new name';
            }

            assert.throw(fn, TypeError);
            
        }
    });





    return Suite;
});
