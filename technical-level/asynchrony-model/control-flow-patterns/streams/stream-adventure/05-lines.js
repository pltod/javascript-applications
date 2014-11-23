//Simple way to create a ReadableWritable stream that works

//Usually used for transformation

var through = require('through');
var split = require('split');
var transform = false;

process.stdin
    .pipe(split())
    .pipe(through(function (line) {
      transform ? this.queue(line.toString().toUpperCase()+'\n') : this.queue(line.toString().toLowerCase()+'\n');
      transform = !transform;
    }))
    .pipe(process.stdout);