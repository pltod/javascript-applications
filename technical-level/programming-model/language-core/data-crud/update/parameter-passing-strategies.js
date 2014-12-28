var debug = require('debug')('parameter-passing-strategies');
var test = require('tape');

debug("Depending on the strategy the program could have different behavior regarding data update");

test('### Call by value ###', function(t) {

  debug("New allocation of memory is made and the value of variable passed is copied");
  
  //http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/

  //1.Primitives
  //bar = 10

  //procedure foo(barArg):
  //  barArg = 20;
  //end

  //foo(bar)

  // changes inside foo didn't affect
  // on bar which is outside
  //print(bar) // 10

  //2. Objects

  //bar = {
  //  x: 10,
  //  y: 20
  //}

  //procedure foo(barArg, isFullChange):

  //  if isFullChange:
  //    barArg = {z: 1, q: 2}
  //    exit
  //  end

  //  barArg.x = 100
  //  barArg.y = 200

  //end

  //foo(bar)

  // with call by value strategy,
  // object outside has not been changed 
  //print(bar) // {x: 10, y: 20}

  // the same with full change
  // (assigning the new value)
  //foo(bar, true)

  //also, there were no changes made
  //print(bar) // {x: 10, y: 20}, but not {z: 1, q: 2}

  t.end();
});

test('### Call by reference ###', function(t) {

  debug("The function receives implicit reference to object");
  
  //bar = {
  //  x: 10,
  //  y: 20
  //}

  //procedure foo(barArg, isFullChange):

  //  if isFullChange:
  //    barArg = {z: 1, q: 2}
  //    exit
  //  end

  // barArg.x = 100
  //  barArg.y = 200

  //end

  //foo(bar)

  // with call by reference strategy, object outside is changed 
  //print(bar) // {x: 100, y: 200}

  // the same with full change
  //foo(bar, true)

  //also, there were changes made during full change
  //print(bar) //  {z: 1, q: 2}

  t.end();
});

test('### Call by sharing ###', function(t) {

  debug("function receives the copy of the reference to object - used in ECMAScript");
  debug("In this strategy we have two identifiers that holds the same reference that point to the same object");
  debug("We could either mutate the object or change the second reference to point to hold another reference to another object");

  debug("sharing vs. value = pass copy of reference vs. pass copy of data");
  debug("sharing vs. reference = pass copy of reference (so new assignment do rebinding rather than mutation) vs. pass the same reference (so we get mutation in all cases");

  //bar = {
  //  x: 10,
  //  y: 20
  //}

  //procedure foo(barArg, isFullChange):

  //  if isFullChange:
  //    barArg = {z: 1, q: 2}
  //    exit
  //  end

  // barArg.x = 100
  // barArg.y = 200

  //end

  //foo(bar)

  // with call by sharing properties of the object are changed 
  // during this call we have mutation
  //print(bar) // {x: 100, y: 200}

  // but it is not the same with full change
  //foo(bar, true)

  //also, there were no changes made from the full change and the object is the same from the last change
  //during this call we have rebinding
  //print(bar) //  {x: 100, y: 200}

  t.end();
});

test('### ECMAScript is doing Call By Value for primitives ###', function(t) {

  var c = 1;

  function f(c) {

    debug("Since 'c' is formal parameter a new identifier is created in this VariableEnvironment that hides the one from the parent environment.");
    debug("We are changing the local variable rather than the parent variable.");
    debug("Basically the value of 'c' from the outer context is copied into the identifier created in this context.");
    debug("What could confuse us is that 'c' has no var declaration here. However we know that JS creates identifiers for formal parameters.");
    
    c++;
    t.equal(2, c);
  }

  f(c);

  //'c' in this context is still the same
  t.equal(1, c);

  t.end();
});

test('### ECMAScript is doing Call By Sharing for objects ###', function(t) {

  debug("Some people still name it call by value because ECMAScript pass copy of the reference to the object");
  var c1 = {
    a: 1,
    b: 2
  };
  var c2 = {
      a: 1,
      b: 2
  };

  function f(c1, c2) {
    debug("rebinding is done and c1 is not affected similar to pass by value behavior");
    c1 = {
      z: 1
    };

    debug("mutation is done on the external object - similar to pass by reference behaviour");
    c2.a++
    c2.b++
  }

  f(c1, c2);

  t.equal(1, c1.a);
  t.equal(2, c1.b);

  t.equal(2, c2.a);
  t.equal(3, c2.b);

  t.end();
});

