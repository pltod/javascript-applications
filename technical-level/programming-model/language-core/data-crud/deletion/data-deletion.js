var debug = require('debug')('data-deletion');
var test = require('tape');

test('### Deletion of properties and variables ###', function(t) {
  function fn() {
    debug("The code does not create variable in this EC but property of the global object");
    a = 1;
    t.equal(1, a);
    
    debug("This property could be deleted");
    t.ok(delete a);
    
    return a;
  }
  
  t.throws(fn, ReferenceError, "Now it does not exist anymore");
  
  var b = 2;
  t.equal(2, b);

  t.notOk(delete b, "Variables have {DontDelete} attribute set to true");
  debug("In ES5 {DontDelete} is renamed into the [[Configurable]] and can be manually managed via Object.defineProperty method");
  t.equal(2, b);
  
  t.end();
});

test('### In eval context {DontDelete} attribute is not set to true for variables ###', function(t) {
  var b = 0; 
  t.notOk(delete b);
  
  eval('var a = 1;');
  t.equal(1, a);
  t.ok(delete a);

  function fn() {
    t.equal(0, b, "b is not deleted since its a variable with {DontDelete} = true");
    return a;
  }
  
  t.throws(fn, ReferenceError, "variable 'a' is deleted because it is created with eval statement");
  
  t.end();
});