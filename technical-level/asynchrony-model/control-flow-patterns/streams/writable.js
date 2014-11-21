var debug = require('debug')('test-writeable');
var test = require('tape');
var fs = require('fs');

// OTHER EVENTS
// drain - when emitted the upstream could continue with data sending
// pipe/unpipe - emitted when upstream pipe or unpipe to this writeable stream
// error - emitted on error

test('### Write into Writable Array Stream ###', function(t) {
  var SArray = require('./lib/array-stream');
  var write = new SArray(function (data) {
    t.deepEqual(data, [ 'he', 'll', 'o ', 'wo', 'rl', 'd!' ], 'data is written')
    t.end();
  })
  var rs = fs.createReadStream('file1.txt');
  rs.setEncoding('utf8') 
  debug("result from write could be false which means a backpressure - no possible to handle more data");
  rs.on('readable', function() {
    var res;
    while (null !== (chunk = rs.read(2))) {
      res = write.write(chunk.toString());
    }
  });
  rs.on('end', function() {
    debug("end - this method is called when there is no more data to write");
    debug("When using pipe by default end() is called on the destination when the source stream emits end, so that destination is no longer writable. Do reader.pipe(writer, { end: false }) to keep the destination stream open.");
    write.end();
  });
});
