var debug = require('debug')('everything-is-object');
var test = require('tape');

test('### Functions are objects that inherit Function.prototype object###', function(t) {
  function OBJ() {};

  t.equal(typeof Function.prototype, 'object');
  t.equal(typeof Function.prototype.apply, 'function');
  t.equal(typeof OBJ.apply, 'function');

  t.end();
});

test('### arguments is object ###', function(t) {

  debug('Each function has access to array-like arguments object that contains input parameters.');
  
  t.ok(arguments);
  t.notOk(Array.isArray(arguments), 'arguments is object not array');

  t.end();

});

test('### Primitives are autoboxed - turned to reference types. So they are objects. ###', function(t) {

  debug("strings, numbers, and booleans have methods despite being primitive types");

  var name = 'NAME';
  t.deepEqual('name', name.toLowerCase(), 'string has toLowerCase method');
  t.deepEqual('N', name.charAt(0), 'charAt method');
  t.deepEqual('NA', name.substring(0, 2), 'substring method');

  var number = 10;
  t.deepEqual('a', number.toString(16), 'number has toString method');

  var flag = true;
  t.deepEqual('true', flag.toString(), 'boolean has toString method');

  t.end();

});

test('### Objects could be expressed in literal form ###', function(t) {

  t.ok({} instanceof Object, 'Object literal');
  t.ok(['1', '2', '3'] instanceof Array, 'Array literal');
  t.ok(/\d+/g instanceof RegExp, 'RegExp literal')
  t.ok(fn instanceof Function, 'Function Declaration a.k.a. Literal Form')

  debug("function literal known as function declaration in contrast with using new Function() which has some implications")

  function fn() {
    return 1;
  }

  t.end();

});

test('### NaN and objects ###', function(t) {
  t.pass('##### NaN and objects');  
  t.equal(isNaN({}), true, 'Objects are NaN when checking with isNaN function');
  t.end();
});

