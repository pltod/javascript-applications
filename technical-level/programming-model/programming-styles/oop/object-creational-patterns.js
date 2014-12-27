var debug = require('debug')('object-creational-patterns');
var test = require('tape');

test('### Constructor functions has problems when not calling with new ###', function(t) {

  var p1 = Person1('test');
  var p2 = Person2('test');
  
  t.notOk(p1, 'calling constructor function without new does not create object');
  t.equal(global.name, "test", 'and sets the things assigned to this to the global context');
  t.end();

  function Person1(name) {
    this.name = name;
  }
  
  function Person2(name) {
    "use strict";
    t.notOk(this, 'calling constructor function without new in strict mode make "this" inside it undefined');
  }

});

test('### Solution1: Constructor functions that call themselves with new ###', function(t) {

  var p3 = Person3('test');
  
  t.equal('test', p3.name, 'using this pattern we can invoke constructor function without new');
  t.end();

  function Person3(name) {
    debug("this is the best way to mitigate constructor function calling without new");
    if (!(this instanceof Person3)) return new Person3(name);
      
    this.name = name;
  }

});

test('### Solution2: Constrcutor Override Pattern ###', function(t) {
  var u1 = User();
  var u2 = new User();
  t.ok(u1.val == 'Called without new', 'called without new still has the property assigned');
  t.ok(u2.val == 'Called with new', 'called with new is working as expected');
  t.deepEqual(u1.constructor, u2.constructor, 'constructors are the same');
  t.deepEqual(Object.getPrototypeOf(u1), Object.getPrototypeOf(u2), 'prototypes are the same')
  t.end();

  function User() {
    var self, val;
    if (this instanceof User) {
      self = this;
      self.val = 'Called with new';
    } else {
      debug("Function is invoked without new so the this object must be created manually, thus, constructor override pattern");
      self = Object.create(User.prototype);
      self.val = 'Called without new';
      return self;
    }
  }
});
