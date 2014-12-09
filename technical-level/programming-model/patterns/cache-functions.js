// TODO Make it as test suite
// IDEA from: Addy Osmani Performance Article in Smashing Magazine

// Shows the most performant way of reusing functions
var Timer = require('../../../shared/util/timer/index');

// Prototypal pattern
Klass1 = function() {}
Klass1.prototype.foo = function() {
  log('foo');
}
Klass1.prototype.bar = function() {
  log('bar');
}

// Module pattern
Klass2 = function() {
  var foo = function() {
    log('foo');
  },
    bar = function() {
      log('bar');
    };

  return {
    foo: foo,
    bar: bar
  }
}


// Module pattern with cached functions
var FooFunction = function() {
  log('foo');
};
var BarFunction = function() {
  log('bar');
};

Klass3 = function() {
  return {
    foo: FooFunction,
    bar: BarFunction
  }
}

var standardObject = {
        foo: function(){
        },
        bar: function(){
        }
    };

// Iteration tests

// Prototypal
var myTimer1 = Timer('Prototypal').start();
var i = 1000000,
  objs = [];
while (i--) {
  var o = new Klass1()
  objs.push(new Klass1());
  o.bar;
  o.foo;
}
myTimer1.stop();

var myTimer2 = Timer('Module').start();
// Module pattern
var i = 1000000,
  objs = [];
while (i--) {
  var o = Klass2()
  objs.push(Klass2());
  o.bar;
  o.foo;
}
myTimer2.stop();

var myTimer3 = Timer('ModuleCached').start();
// Module pattern with cached functions
var i = 1000000,
  objs = [];
while (i--) {
  var o = Klass3()
  objs.push(Klass3());
  o.bar;
  o.foo;
}
myTimer3.stop();

var myTimer4 = Timer('Object').start();
var i = 1000000,
  objs = [];
while (i--) {
  objs.push(standardObject);
  o.bar;
  o.foo;
}
myTimer4.stop();

