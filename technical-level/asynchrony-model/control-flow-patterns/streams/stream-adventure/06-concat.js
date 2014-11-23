// Writable stream that cache the input
// One more artice about it is here: http://reidburke.com/2013/07/03/stream-concat-anti-pattern/

var concat = require('concat-stream');

process.stdin.pipe(concat(function (src) {
    var s = src.toString().split('').reverse().join('');
    console.log(s);
}));