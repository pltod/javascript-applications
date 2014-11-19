var test = require('tape');
var log = console.log;

test('### Language Defined Identifiers ###', function(t) {
  
  log('########################################');
  t.pass('##### All built-in language functions are kind of accessed via their corresponding predefined identifiers');
  t.pass('For example: ');
  t.ok(Object, '"Object" identifier is used to access built-in constructor function object');

  t.pass('Of particular interest are:')
  t.ok(this, "'this' built-in identifier that holds the current context")
  t.ok(arguments, "'arguments' built in identifier")

  t.end();

});


test('### arguments ###', function(t) {

  function one(x, y, z) {
    t.ok(arguments, "arguments holds the parameters of function invocation");

    t.ok(one, "identifier for the enclosing function is also accessible in the scope of the function")
    t.equal(3, one.length, "dsds");

    // the number of the passed arguments (only x, y)
    assert.equal(2, arguments.length);
  }

    one(10, 20);

    function two(x, y, z) {


      assert.equal(10, x);
      assert.equal(10, arguments[0]);

      assert.equal(20, y);
      assert.equal(20, arguments[1]);

      assert.isUndefined(z);
      assert.isUndefined(arguments[2]);

      assert.equal(x, arguments[0]);
      assert.equal(y, arguments[1]);
      assert.equal(z, arguments[2]);

      // formal parameter and arguments point to the same physical data
      // that is why when we change arguments[0] we also change 'x' value
      arguments[0] = 20;
      assert.equal(20, arguments[0]);
      assert.equal(20, x);

      // however this sharing is not valid for formal parameters that are not passed on function execution
      z = 40;
      assert.equal(40, z);

      arguments[2] = 50;
      assert.equal(50, arguments[2]);
      assert.equal(40, z);
    }

    two(10, 20);

    function twoStrictMode(x, y, z) {

      "use strict";

      assert.equal(10, x);
      assert.equal(10, arguments[0]);

      assert.equal(20, y);
      assert.equal(20, arguments[1]);

      assert.isUndefined(z);
      assert.isUndefined(arguments[2]);


      assert.equal(x, arguments[0]);
      assert.equal(y, arguments[1]);
      assert.equal(z, arguments[2]);

      // formal parameter and arguments do not point to the same physical data in strict mode
      // that is why when we change arguments[0] we do not change 'x' value
      arguments[0] = 20;
      assert.equal(20, arguments[0]);
      assert.equal(10, x);
    }

    twoStrictMode(10, 20);

    // the same demonstration with passing objects

    function three(obj1, obj2) {
      var obj3 = {};
      assert.strictEqual(arguments[0], obj1);
      assert.strictEqual(arguments[1], obj2);

      arguments[0] = obj3;

      //again arguments and formal parameters share memory space when we are not in strict mode
      assert.strictEqual(arguments[0], obj1);
    }

    three({}, {});

    function threeStrictMode(obj1, obj2) {
      "use strict";
      var obj3 = {};
      assert.strictEqual(arguments[0], obj1);
      assert.strictEqual(arguments[1], obj2);

      arguments[0] = obj3;

      //again arguments and formal parameters do not share memory space in strict mode
      assert.notStrictEqual(arguments[0], obj1);
    }

    threeStrictMode({}, {});

  }

  t.end();

});
