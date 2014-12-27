// https://twitter.com/littlecalculist/status/125413301965438976
// https://twitter.com/littlecalculist/status/125413358999568384
// https://twitter.com/littlecalculist/status/125413413269671936

var debug = require('debug')('bind-call-apply');
var test = require('tape');


var obj = {
  prop: "test"
};

function f() {
  return this.prop
}

var a = Function.prototype.apply,
    b = Function.prototype.bind,
    c = Function.prototype.call;


debug("this is call function in which when invoked this === bind function");
var bind = c.bind(b);

test('### Creating bind ###', function(t) {

  var f1 = f.bind(obj);
  
  t.equal(f1(), "test", "obj bound to test");

  var f2 = b.call(f, obj);
  t.equal(f2(), "test", "obj bound to test");

  debug("this is equal to bind.call(f, obj) => f.bind(obj)");
  var f3 = bind(f, obj);
  
  t.equal(f3(), "test", "obj bound to test");

  t.end();

});

test('### Creating call ###', function(t) {

  
  t.equal(f.call(obj), "test", "f called with obj as this");
  
  debug("this is equal to bind.call(call, call)");  
  var call = bind(c, c);
  debug("and the new function is with call body bound to this === call");    
  debug("so the next is call.call(f, obj)");      
  t.equal(call(f, obj), "test", "f called with obj as this");
  
  t.end();

});

test('### Creating apply ###', function(t) {

  debug("this is equal to bind.call(call, apply)");  
  var apply = bind(c, a);  
  debug("and the new function is with call body bound to this === apply");    
  debug("so the next is apply.call(f, obj)");      
  t.equal(apply(f, obj), "test", "f applied with obj as this");
  

  t.end();

});



