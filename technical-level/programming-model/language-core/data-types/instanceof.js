var debug = require('debug')('instanceof');
var test = require('tape');

test('### use instanceof for objects that are not functions to get concrete reference type ###', function(t) {
  t.equal(typeof [], 'object', 'typeof does not give relevant information regarding Reference Types');
  t.equal(typeof fn, 'function', '...except for functions');
  t.end();
});

test('### To identify reference types, JavaScript has the instanceof operator - instanceof works with inheritance. ###', function(t) {
  t.ok([] instanceof Array, 'instanceof mitigate this problem since it works with inheritance and shows actual type');  
  t.ok([] instanceof Object, 'Array inherits Object so arrays are also instanceof Object')
  t.end();
});


test('### Use Array.isArray() in ES5 because using instanceof to compare reference types created by different browser frames could be a problem ###', function(t) {
  t.ok(Array.isArray(arrayLiteral), 'even better alternative to instanceof is ES5 method isArray - instanceof could be misleading due to some browsers differences');
  t.end();
});
