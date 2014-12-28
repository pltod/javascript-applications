var debug = require('debug')('rebinding-vs-mutation');
var test = require('tape');

debug("A rebinding relates to an identifier.");
debug("This operation unbinds the identifier (if it was previously bound) from an old object");
debug("Then binds it to another one (to another block of memory).");
debug("Often (and in ECMAScript in particular) rebinding is implemented via a simple operation of assignment.");

debug("In contrast with rebinding, the operation of mutation already affects the content of the object.");

test('### Rebinding ###', function(t) {

  //Although we assign the value of one identifier to another we still have two separate identifiers that in some point in time could point to the same memory (share the same value)
  //When we change the value of identifier - we create new value in memory and set the identfier to point to this piece of memory

  var a = 1;
  var b = a;

  t.equal(1, a);
  t.equal(1, b);

  a = 2;

  t.equal(2, a);
  t.equal(1, b);


  //The same behavior is valid for objects
  // bind "foo" to {x: 10} object
  var foo = {
    x: 10
  };

  t.equal(10, foo.x);


  // bind "bar" to the *same* object
  // as "foo" identifier is bound

  var bar = foo;

  t.deepEqual(foo, bar);
  t.equal(10, bar.x);

  // and now rebind "foo" to the new object

  foo = {
    x: 20
  };

  t.equal(20, foo.x);

  // and "bar" still points to the old object
  t.equal(10, bar.x);
  t.notStrictEqual(bar, foo);

  t.end();
});

test('### Mutation ###', function(t) {

  // bind an array to the "foo" identifier
  var foo = [1, 2, 3];

  // and here is a *mutation* of the array object contents
  foo.push(4);

  assert.equal(4, foo[3]);

  // also mutations
  foo[4] = 5;
  foo[0] = 0;

  assert.equal(5, foo[4]);
  assert.equal(0, foo[0]);

  t.end();
});

