var debug = require('debug')('test-readable');
var test = require('tape');
var fs = require('fs');

test('### Readable Stream Default Non-Flowing Mode ###', function(t) {
  var rs = fs.createReadStream('file.txt'); 
  var body = "";
  var counter = 0;
  t.pass('"readable" event must be captured in the default Non-Flowing mode to collect the data');
  rs.on('readable', function() {
    debug('Capture "readable" event');
    counter++;
    while (null !== (chunk = rs.read())) {
      body = body.concat(chunk);
    }
  });  
  rs.on('end', function () {
    debug('Capture "end" event')    
    t.equal(body, 'text', 'Readable stream emits "end" event to denote that all data is passed');
    t.equal(counter, 2, '"readable" event is called at least two times')
  }) 
  rs.on('close', function () {
    debug('Capture "close" event') 
    t.pass('"close" event emitted when the underlying resource (for example, the backing file descriptor) has been closed')
    t.end();
  }) 
  
});

test('### Readable Stream Flowing Mode ###', function(t) {
  var rs = fs.createReadStream('file.txt'); 
  var body = "";
  rs.on('data', function(chunk) {
    debug('capture "data" event')
    body += chunk;
    t.pass('In Flowing Mode readable stream emits "data" event when data is available');
    t.equal(typeof chunk, 'object', 'default chunk type is Buffer');   
    t.equal(chunk.length, 4, 'The passed chunks keep their size');
  })
  rs.on('end', function () {
    debug('capture "end" event')    
    t.equal(body, 'text', 'Readable stream emits "end" event to denote that all data is passed');
    t.end();
  })  
});


test('### Flowing Mode vs. Non-Flowing Mode ###', function(t) {
  var rs = fs.createReadStream('file.txt'); 
  var counter = 0;
  rs.on('data', function(chunk) {
    debug('capture "data" event')
    t.pass('Capturing "data" event switch on the Flowing Mode');
    t.equal(chunk.toString(), 'text', 'data is handled with "data" event handler');   
  })
  rs.on('readable', function() {
    debug('capture "readable" event');
    while (null !== (chunk = rs.read())) {
      counter++;
    }
  });  
  rs.on('end', function () {
    debug('capture "end" event')
    t.equal(counter, 0, 'in "readable" handler data is not available because is already consumed in "data" handler')
    t.end();
  })  
});

test('### setEncoding ###', function(t) {
  var rs = fs.createReadStream('file.txt');  
  rs.setEncoding('utf8')
  rs.on('data', function(chunk) {
    t.equal(typeof chunk, 'string', 'setEncoding can be used to change the default chunk type');
    t.end();
  })  
});

test('### Error Event ###', function(t) {
  var rs = fs.createReadStream('fileMissing.txt');  
  rs.on('error', function(chunk) {
    debug('capture "error" event');    
    t.pass('"error" event emitted if there was an error receiving data.');
    t.end();
  })  
});


test('### Readable Stream Non-Flowing Mode - Size ###', function(t) {
  var rs = fs.createReadStream('file.txt');
  rs.setEncoding('utf8') 
  rs.on('readable', function() {
    while (null !== (chunk = rs.read(2))) {
      t.equal(chunk.length, 2, 'This will be printed two times because 4 bytes were called with rs.read(2)');
    }
  });  
  rs.on('end', function () {
    t.end();
  }) 
  
});

test('### Go To Flowing Mode With Resume ###', function(t) {
  var rs = fs.createReadStream('file.txt');
  rs.resume();
  rs.on('end', function () {
    t.pass('The stream went to Flowing Mode with resume that is why we reach end without reading anything')
    t.end()
  }) 
});

// pause - pausing the flowing stream; in non-flowing mode just swith the flowing mode but paused
// resume - resuming paused stream; in non-flowing mode just swith the flowing mode
// pipe - automatically moving data from one stream to another dealing with all backpressure and stuff
// unshift - unconsuming data
// wrap - for working with old streams
