var debug = require('debug')('data-binding');
var test = require('tape');

debug("A name binding is the association of an identifier with value");

test('### Binding States ###', function(t) {

  //State 1 - 'x' identifier does not exist cause ReferenceError
  function fn() {
    x
  };
  t.throws(fn, ReferenceError);


  //State 2 - 'y' identifier exists but value is not bound yet - undefined
  var y;
  t.notOk(y);

  //State 3 - 'z' identifier exists and value is bound to it
  var z = 1;
  t.ok(z);
  t.equal(1, z);

  t.end();
});
