//Simple way to create a ReadableWritable stream that works

//Usually used for transformation

var through = require('through');

//var tr = through(write, end);
var tr = through(write);

process.stdin.pipe(tr).pipe(process.stdout);

// This is the function used to transform the data before pass it forward
function write (buf) { this.queue(buf.toString().toUpperCase()); }

//This is not needed because this is the default impl of end
//function end () { this.queue(null); }