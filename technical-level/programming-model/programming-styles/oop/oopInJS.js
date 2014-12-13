// TODO refactor with tape

define(["chai"], function(Chai) {

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Principles of Object-Oriented Programming in JavaScript. Chapter 1, Primitive And Reference Type.",
            tests: []
        };


    Suite.tests.push({
        name: "strings, numbers, and booleans have methods despite being primitive types",
        body: function() {
            
            var name = 'NAME';
            assert.strictEqual('name', name.toLowerCase());
            assert.strictEqual('N', name.charAt(0));
            assert.strictEqual('NA', name.substring(0, 2));
            
            var number = 10;
            assert.strictEqual('a', number.toString(16)); // convert to "a"
            
            var flag = true;
            assert.strictEqual('true', flag.toString());

        }
    });


    Suite.tests.push({
        name: "Literal forms",
        body: function() {
            
            var objLiteral = {},
                arrayLiteral = ['1', '2', '3'],
                regExpLiteral = /\d+/g;
            
            //function literal known as function declaration in contrast with using new Function() which has some implications
            function fn() {
                return 1;
            }
            
        }
    });


    Suite.tests.push({
        name: "Property Access - Dot and Bracket notation",
        body: function() {
            
            var objLiteral = {prop: 'a'},
                arrayLiteral = ['0', '1', '2'];

            
            assert.equal('a', objLiteral.prop);
            assert.equal('a', objLiteral['prop']);
            
            arrayLiteral.push('3');
            arrayLiteral['push']('4');
            
            assert.equal('3', arrayLiteral[3]);
            assert.equal('4', arrayLiteral[4]);
            
            //Using a variable to store the method name and invoke it also work with dot notation
            var method = "push";
            arrayLiteral[method]('5');
            assert.equal('5', arrayLiteral[5]);
        }
    });

    Suite.tests.push({
        name: "typeof does not give relevant information regarding Reference types except for functions",
        body: function() {

            var array = [];
            
            function fn() {}

            //Concrete type is hidden            
            assert.equal('object', typeof array);
            assert.equal('function', typeof fn);
        }
    });

    Suite.tests.push({
        name: "To identify reference types, JavaScript has the instanceof operator - instanceof works with inheritance.",
        body: function() {

            var array = [];
            
            assert.isTrue(array instanceof Array);
            
            //since Array inherits Object
            assert.isTrue(array instanceof Object);
        }
    });


    Suite.tests.push({
        name: "Use Array.isArray() in ES5 because using instanceof to compare reference types created by different browser frames could be a problem",
        body: function() {

            var array = [];
            
            assert.isTrue(Array.isArray(array));
        }
    });


    Suite.tests.push({
        name: "Autoboxing - creating Wrapper type autopmatically to provide methods to primitives.",
        body: function() {

            var name = "name";
            assert.equal('n', name.charAt(0));
            
            //When calling charAt JS engine is doing the following:
            var name1 = "name";
            var temp = new String(name1);
            var firstChar = temp.charAt(0);
            temp = null;
            assert.equal('n', firstChar);
        }
    });

    Suite.tests.push({
        name: "Autoboxing does not make instanceof operator work on primitives",
        body: function() {
            
            var name = "name";
            var count = 10;
            var found = false;
            
            // Temporary object is only created when the value is read.
            // Since instanceof doesn’t actually read the value, the temporary object isn’t created
            // So instanceof correctly identifies the values as not being instances of primitive wrapper types.
            assert.isFalse(name instanceof String);
            assert.isFalse(count instanceof Number); 
            assert.isFalse(found instanceof Boolean);
        }
    });


    Suite.tests.push({
        name: "Manual usage of wrapper types. Be aware for implications",
        body: function() {
            
            var valid = new Boolean('false');
            
            //Concrete type is lost as usual with typeof operator. This is an object now.
            assert.equal('object', typeof valid);
            
            //instanceof returns the concrete type
            assert.isTrue(valid instanceof Boolean);
            
            //and preserve the hierarchy as well
            assert.isTrue(valid instanceof Object);
            
            
            //but be careful about the semantics
            var executed = false;
            if (valid) {
                //'valid' is object and it is coerced to true inside the conditional statement
                executed = true;
            }
            
            assert.isTrue(executed);
        }
    });



    return Suite;
});
