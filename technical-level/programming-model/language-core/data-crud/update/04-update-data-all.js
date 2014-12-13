var test = require('tape');

test('### Update Data - Primitives, Functions, Objects ###', function(t) {
  
  t.pass('##### Definitions');
  t.pass('Binding (Create): the association of an identifier with value.');
  t.pass('Rebinding (Update): unbinds the identifier (if it was previously bound) from an old object and binds it to another one (to another block of memory).');
  t.pass('Mutation (Update): in contrast with rebinding, the operation of mutation already affects the content of the object.');

  t.pass('Invocation strategy 1, Call by Value: the value of passed variable is copied to newly allocated memory');
  t.pass('Invocation strategy 2, Call by Reference: the function receives implicit (exactly the same) reference to object');
  t.pass('Invocation strategy 3, Call by Sharing: function receives a copy of the reference to object');  

  t.pass('##### Binding States');
  function fn(){x};
  t.throws(fn, ReferenceError, 'State 1: identifier that does not exist cause ReferenceError');
  var y;
  t.ok(y == undefined, 'State 2: identifier exist but not default value is set so it is undefined');
  var z = 1;
  t.equal(z, 1, 'State 3: identifier exists and initial value is bound to it');

    
  t.pass('##### Rebinding for primitives use Call by Value strategy - the value of passed variable is copied to newly allocated memory');  
  
  t.pass('Although we assign one identifier to another we still have two separate identifiers that in some point in time could point to the same memory (share the same value)');
  t.pass('When we change the value of identifier - we create new value in memory and set the identfier to point to this piece of memory');
  
  var v = 'v';
  var v1 = v;
  t.equal(v1, 'v', "Assigning one identifier to another means we copy the value of the first to the second which points to another location in memory");
  v = 'vv';
  t.equal(v, 'vv', "When we change the first...");
  t.equal(v1, 'v', "...the second does not change because both are two different copies of the same value");

  var c = 1;
  
  function f1(c) {
      
    t.pass('Since "c" is formal parameter a new identifier is created in the VariableEnvironment for the invoked(child) context. The created identifier hides the one from the parent environment.');
    t.pass('We are changing the local variable rather than the parent variable.');
    t.pass('Basically the value of "c" from the outer context is copied into the identifier created in this context.');
    t.pass('What could confuse us is that "c" has no var declaration here. However we know that JS creates identifiers for formal parameters.');
  
    c++;
    t.equal(2, c);
  }   

  t.pass('Now lets call a function passing identifier "c"...');
  f1(c);
  
  t.equal(1, c, '"c" in this calling context is still the same');

  t.pass('##### Rebinding for objects uses Call by Sharing strategy');

  var c1 = {a: 1};
  var c2 = {a: 1};
  
  function f2(c1, c2) {
    c1 = {z: 1}; 
    c2.a++
  }     
  
  f2(c1, c2);
  
  t.equal(1, c1.a, 'rebinding is done and identifier is not affected similar to pass by value behaviour');
  t.equal(2, c2.a, 'mutation is done on the external object - similar to pass by reference behaviour');
  
  
  t.pass('The copy of the reference is associated with the formal parameter and is its value.');
  t.pass('Regardless the fact that the concept of the reference in this case appears, this strategy should not be treated as call by reference because we are not using direct alias but copy of the address');
  
  t.pass('sharing vs. value = pass copy of reference vs. pass copy of data');
  t.pass('sharing vs. reference = pass copy of reference (so new assignment do rebinding rather than mutation) vs. pass the same reference (so we get mutation in all cases)');
  
  var foo = {x: 10};
  var bar = foo;
   
  t.equal(foo, bar, 'both object holds has their own copies of the same reference');
  t.equal(10, bar.x, 'the reference can be used to get actual values'); 
   
  t.pass('now rebind the first object to the new object...');
   
  foo = {x: 20};
   
  t.equal(20, foo.x, 'object is rebound'); 
   
  t.equal(10, bar.x, 'the second object still points to the old data');
  t.notEqual(bar, foo, 'the references are now different');
  
  
  t.pass('##### Mutation');  

  // bind an array to the "foo" identifier
  var foo = [1, 2, 3];
   
  // and here is a *mutation* of the array object contents
  foo.push(4);
   
  t.equal(4, foo[3], 'mutation on array - adding new element - has been made');
   
  // also mutations
  foo[0] = 0;
  t.equal(0, foo[0], 'mutation on array - updating existing element - has been made');
  
  
  t.end();
});