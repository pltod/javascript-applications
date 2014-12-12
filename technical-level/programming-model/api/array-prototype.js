var debug = require('debug')('array-prototoype')
var test = require('tape');


test('### slice ###', function(t) {
  function s() {
    debug(arguments)
    var result = [].slice.call(arguments)
    debug(result)
    debug(result instanceof Array)  
      
  }
  
  s(1, 2)

  var obj = {a: 1, b: 2};
  t.end();
});

test('### splice ###', function(t) {

  t.end();
});

test('### reverse ###', function(t) {

  t.end();
});

test('### join ###', function(t) {

  t.end();
});

