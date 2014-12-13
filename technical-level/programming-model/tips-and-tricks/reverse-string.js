var debug = require('debug')('reverse-string')
var test = require('tape');

test('### Reversing string with - split, reverse, join ###', function(t) {

  var str = 'Hello World';
  var reversed = str.split('').reverse().join('');
  t.equal(reversed, 'dlroW olleH', "Reversing 'Hello World' backwords is 'dlroW olleH'");

  t.end();
});
