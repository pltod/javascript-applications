//https://github.com/maxogden/websocket-stream

var ws = require('websocket-stream');
var stream = ws('ws://localhost:8080');

stream.write('hello\n');
stream.end();
