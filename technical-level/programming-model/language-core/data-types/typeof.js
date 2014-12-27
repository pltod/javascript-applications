var debug = require('debug')('typeof');
var test = require('tape');

test('### typeof does not give relevant information regarding Reference types except for functions ###', function(t) {

  var array = [];

  function fn() {}

  //Concrete type is hidden            
  t.equal('object', typeof array, 'typeof array is object');
  t.equal('function', typeof fn, 'typeof function is function');


  t.end();

});