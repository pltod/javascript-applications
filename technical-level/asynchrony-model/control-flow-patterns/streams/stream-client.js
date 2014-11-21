var debug = require('debug')('stream-client');
var test = require('tape');

test('### Test Count Stream ###', function(t) {
  var Counter = require('./lib/count-stream');  
  var countStream = new Counter();
  var c = 0;
  countStream.on('data', function (chunk) {
    t.equal(chunk.toString(), (++c).toString(), 'counter match');
  })

  countStream.on('end', function (chunk) {
    t.end();
  })  
});

