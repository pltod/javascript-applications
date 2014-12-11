var debug = require('debug')('string-prototoype')
var test = require('tape');

test('### Built-in functions - split ###', function(t) {
  var str = 'Hello world';
  var splitted = str.split(' ');
  t.ok(splitted instanceof Array, 'split function creates Array out of String');
  t.equal(2, splitted.length, 'the number of elements depend on the token we split with');
  t.equal('Hello', splitted[0], 'each token can be used in the way we use Array');
  t.end();
});

