//Request is readble writable stream
// So it writes the input from the keyboard and can be read by the output

var request = require('request');

process.stdin.pipe(request.post('http://localhost:8000')).pipe(process.stdout);