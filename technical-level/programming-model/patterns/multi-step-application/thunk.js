var debug = require('debug')('thunk');
var test = require('tape');

test('### Thunk ###', function(t) {

  function test(what, by) {
    return what + "/" + by
  }
  
  function thunkedTest() {
    return test;
  }

  t.ok(1, "Thunk: A function that wraps some behavior for later execution is typically called a thunk");
  t.equal(thunkedTest()("feature1", "pl"), "feature1/pl", "application via thunk");
  
  t.end();
});