var debug = require('debug')('lazy-function-definition');
var test = require('tape');

test('### Lazy Function Definition ###', function(t) {
  function lazy() {
    
    debug('function export function - all local variables remain private');
    debug('they are kind of internal state or cache if you want');

    var res = 1 + 1;
    
    debug('function identifier is reassigned to point out to a new function that returns calculated result');
    t.equal(typeof lazy, 'function', 'function name is exposed as identifier valid only in its EC and can be overriden without any global scope leakage');
    lazy = function(){
      return res;
    };
    
    return lazy();    
  }
  t.equal(lazy(), 2, 'the result is calculated on the first invocation');
  t.equal(lazy(), 2, 'the cached result is returned on the second invocation - no other operations at all');  

  t.end();

});
