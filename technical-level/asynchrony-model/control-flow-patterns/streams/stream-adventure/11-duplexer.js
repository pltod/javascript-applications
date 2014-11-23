//Demonstrate what is duplexer
//More info at: http://codewinds.com/blog/2013-08-31-nodejs-duplex-streams.html

var spawn = require('child_process').spawn;
var duplexer = require('duplexer');



module.exports = function (cmd, args) {
  var ps = spawn(cmd, args);
  
  return duplexer(ps.stdin, ps.stdout);
}