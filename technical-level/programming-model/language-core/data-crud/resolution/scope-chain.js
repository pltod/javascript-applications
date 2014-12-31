var debug = require('debug')('scope-chain');
var test = require('tape');

debug("Definition: Scope is an enclosing environment in which a variable is associated with a value.");
debug("Resolving data in ECMAScript is based on static scoping principle");
debug("Static scoping imply that an identifier refers to a value defined in its nearest environment - we can infer it by looking at the code that is why it is called static");

test('### Data Resolution Rule 0: Static scoping which means that identifiers are resolved to the existing value at the time of its creation ###', function(t) {

    //This is context 1
    var identifier0 = 0;

    function env1() {
      assert.equal(identifier0, 0);
    }

    function env2() {
      //we set the 'identifier0' to 1 here and call the env1 but it still has value of 0 - that is static (lexical) scoping
      var identifier0 = 1;
      env1();
    }

    env2();
  }

  t.end();
});


test('### Data Resolution Rule 1: Data is visible in the environment where defined ###', function(t) {

  //This is context 1
  var identifier0 = 0,
    identifier1 = 1;

  //Still visible here
  assert.equal(identifier0, 0);
  assert.equal(identifier1, 1);

  t.end();
});

test('### Data Resolution Rule 2: Higher environments see data declared in lower environments (the lowest is the global environment) ###', function(t) {


  //This is lower context 1
  var identifier0 = 0;
  var identifier1 = 1;

  function envrionment() {
    //This function creates new environment which see its outer environment data

    //Find them into the lower context
    assert.equal(identifier0, 0);
    assert.equal(identifier1, 1);
  };

  envrionment();

  t.end();
});

test('### Data Resolution Rule 3: Lower envrionments do not see data declared in higher environments (the lowest is the global environment) ###', function(t) {

  function environment() {

    var identifier0 = 0;

    //look into the current context
    assert.equal(identifier0, 0);
  };

  environment();

  //data from 'envrionment' is not exposed into the outer environment so identifer0 does not exists at all here

  function fn() {
    identifier0
  };
  assert.
  throw (fn, ReferenceError);


  t.end();
});

test('### Data Resolution Rule 4: Data from the closest environment is visible first ###', function(t) {


  //This is lower (outer) environment
  var identifier0 = 0;

  function environment1() {

    //This is higher envrionment
    var identifier0 = 1;

    function environment2() {
      //This is even higher in the stack environment 2
      //We see data as it is set in outer environment 1
      assert.equal(identifier0, 1);
    }

    environment2();
  };

  environment1();

  assert.equal(identifier0, 0);

  t.end();
});

test('### Data Resolution Rule 5 - hoisting and FD and FE difference ###', function(t) {

  assert.isFunction(foo);
  assert.isNotFunction(bar);
  assert.isUndefined(bar);

  function foo() {}

  var bar = function bar() {};

  t.end();
});

test('### Data Resolution Rule 6 - dynamic scope feature in ECMAScript - with ###', function(t) {


  t.end();
});

test('### Data Resolution Rule 7 - dynamic scope feature in ECMAScript - eval ###', function(t) {


  t.end();
});

test('### Data Resolution Rule 8 - closures ###', function(t) {

  //Definition: A closure is a pair consisting of the function code and the environment in which the function is created.
  var x = 10;

  (function(funArg) {

    var x = 20;
    assert.equal(10, funArg()); // 10, not 20

  })(function() { // create and pass a funarg
    return x;
  });


  t.end();
});
