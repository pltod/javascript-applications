var debug = require('debug')('prototypal-inheritance');
var test = require('tape');

test('### prototypal inheritance ###', function(t) {
  
  debug('Prototypal inheritance is done with Object.create method');
  debug('Before its existince there were shims');
  
  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }
  
  var model = {
    name: 'test'
  }
  
  var child = object(model);
  
  t.equal(child.prototype, model, 'model become the prototype for child')
  t.equal('test', child.name, 'name property has been inherited from the prototype')
  
  t.end();
});

test('### To check the object prototype use Object.getPrototypeOf instead of __proto__ ###', function(t) {
  debug("__proto__ is not consistent acros environments")
  var v = Object.create(null);
  debug("The next statement could be false in some environments");
  t.ok("__proto__" in v);
  t.end();
});

