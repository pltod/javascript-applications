var debug = require('debug')('monkey-patching');
var test = require('tape');
var proto = {
  incValue: function (p) {
    return p + 1;
  }
}
var obj = Object.create(proto);
var obj1 = Object.create(proto);

test('### monkey patching ###', function(t) {
  debug('This is implicit override in current environment - not good practive')
  var flag = false;
  t.equal(obj.incValue(1), 2, 'the object has method incValue');
  
  var original = obj.incValue;
  obj.incValue = function (p) {
    var r = original(p);
    debug('I am doing some more stuff here') 
    flag = true;
    return r;  
  }
  
  t.equal(obj.incValue(2), 3, 'the method incValue has been monkey patched');
  t.ok(flag, 'and did some additional work');

  t.end();

});

test('### explicit override ###', function(t) {
  var flag = false;
  
  function override(object, methodName, callback) {
    object[methodName] = callback(object[methodName])
  }  
  
  override(obj1, 'incValue', function(original) {
    return function(p) {
      var returnValue = original.apply(this, arguments);
      flag = true;
      return returnValue;
    }
  })
  
  t.equal(obj1.incValue(1), 2, 'explicitely overriden function');
  t.ok(flag, 'extra behaviour applied');
      
  t.end();  
});  