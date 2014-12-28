var debug = require('debug')('data-binding');
var test = require('tape');

debug("A name binding is the association of an identifier with value");

test('### Binding States ###', function(t) {

  //State 1 - 'x' identifier does not exist cause ReferenceError
  function fn() {
    x
  };
  assert.
  throw (fn, ReferenceError);


  //State 2 - 'y' identifier exists but value is not bound yet - undefined
  var y;
  assert.isUndefined(y);

  //State 3 - 'z' identifier exists and value is bound to it
  var z = 0;
  assert.isDefined(z);
  assert.equal(0, z);

  t.end();
});
