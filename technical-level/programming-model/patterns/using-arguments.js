var debug = require('debug')('using-arguments');
var test = require('tape');

test('### Common pattern to work with arguments ###', function(t) {
  
  f({prop: 'test'});

  function f(obj) {
    'use strict'
    
    t.ok(arguments instanceof Object, 'arguments is array like Object');
    t.notOk(arguments instanceof Array, 'arguments is not instanceof Array');    

    debug('we can easely reasign the formal parameter')
    obj = {};
    t.notStrictEqual(arguments[0], obj, 'which will make it different from the value pointed with arguments in strict mode')
    
    debug('So before working with arguments transform it to real Array')
    var res1 = Array.prototype.slice.call(arguments);
    t.ok(res1 instanceof Array, 'arguments is transformed to Array instance via call to slice');
    debug('... this is also possible with shorter notation')    
    var res2 = [].slice.call(arguments);
    t.ok(res2 instanceof Array, '[].slice is shorter form of Array.prototype.slice');
    
    t.strictEqual(res1[0], arguments[0], 'noe we can use the same physical value via real Array');
    
    debug('TL;DR: either work with formal parameters only or with arguments object that is transform to real Array');
  }

  t.end();

});