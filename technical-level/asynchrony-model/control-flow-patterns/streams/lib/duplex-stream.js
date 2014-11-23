// TODO Clean this file

var Duplex = require('stream').Duplex;
var util = require('util');

module.exports = Timer;

util.inherits(Timer, Duplex);
function Timer(options) {
  if(!(this instanceof MyD)) {
    return new Timer(options);
  }
  Duplex.call(this, options);
  this.storage = [];
  this.timer = setInterval(addTime, 1000, this.storage);
}

Timer.prototype._read = function readBytes(n) {
  var self = this;

  while(this.storage.length) {
    var chunk = this.storage.shift();
    if(!self.push(chunk)) {
      break;
    }
  }
  
  if(self.timer){
    setTimeout(readBytes.bind(self), 1000, n);
  } else {
    self.push(null);
  }
}

Timer.prototype._write = function (chunk, enc, cb) {
  console.log('write: ', chunk.toString());
  cb();
}

Timer.prototype.stopTimer = function () {
  if (this.timer) {
    clearInterval(this.timer);
  }
  
  this.timer = null;
}

function addTime(storage) {
  storage.push((new Date()).toString());
}


// 
// var d = new MyD();
// d.on('readable', function () {
//   var chunk;
//   while(null !== (chunk = d.read())) {
//     console.log('read: ', chunk.toString());
//   }
// });
// 
// d.write('Hello');
// d.write('World');
// d.end();
// 
// setTimeout(function () {
//   d.stopTimer();
// }, 3000)
//  
