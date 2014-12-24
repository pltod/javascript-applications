var debug = require('debug')('memo');
var test = require('tape');

function memo(fn) {
  var cache = {};
  
  return function (p) {
    debug(cache);
    return p in cache ? cache[p] : cache[p] = fn(p)
  }
}

test('### Memo ###', function(t) {

  function e(p) {
    return p;
  }  
  var m = memo(e);
  
  t.equal(m(1), 1, "calculated");
  t.equal(m(1), 1, "taken from cache");  
  
  t.end();
});