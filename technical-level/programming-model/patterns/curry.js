var debug = require('debug')('curry');
var test = require('tape');

function curry(fn) {
  var args1 = Array.prototype.slice.call(arguments, 1)
  return function(args) {
    var args2 = Array.prototype.slice.call(arguments)
    return fn.apply(null, args1.concat(args2))
  }
}

test('### Functions are actually applied ###', function(t) {

  function test(what, by) {
    return what + "/" + by
  }

  t.equal(test("feature1", "pl"), "feature1/pl", "application via direct invocation");
  t.equal(test.call(null, "feature1", "mj"), "feature1/mj", "application via call");
  t.equal(test.apply(null, ["feature1", "lj"]), "feature1/lj", "application via apply");

  t.ok(1, 'In case we have many invocations of feature1 testing by different people, currying the function would be a good approach');
  t.end();
});


test('### Curried functions - those that could be partially applied ###', function(t) {

  t.ok(1, "Source: http://shop.oreilly.com/product/9780596806767.do");


  function curriedTest(what, by) {
    if (by === undefined) {
      return function(by) {
        return what + "/" + by
      }
    }
    return what + "/" + by
  }

  t.equal(curriedTest("feature1")("pl"), "feature1/pl", "partial application via direct invocation - curriedTest supports partial application");
  t.end();
});


test('### Curried util ###', function(t) {

  function test(what, by) {
    return what + "/" + by
  }

  t.equal(curry(test, "feature1")("pl"), "feature1/pl", "make curry on the fly");
  t.end();
});
