var debug = require('debug')('oop');
var test = require('tape');


test('### Composition example ###', function(t) {

  var methodsPool = {
    foo: function() {
      return 'aggregated by: ' + this.name;
    }
  };

  var aggregator1 = {
    name: 'aggregator 1',
    delegate: methodsPool,
    foo: function() {
      return this.delegate.foo.call(this);
    }
  };

  var aggregator2 = {
    name: 'aggregator 2',
    delegate: methodsPool,
    foo: function() {
      return this.delegate.foo.call(this);
    }
  };

  debug('An object could compose methods from other objects')
  t.equal('aggregated by: aggregator 1', aggregator1.foo(), 'Proper context is taken in the aggregated methods');
  t.equal('aggregated by: aggregator 2', aggregator2.foo(), 'Proper context is taken in the aggregated methods');

  t.end();
});
