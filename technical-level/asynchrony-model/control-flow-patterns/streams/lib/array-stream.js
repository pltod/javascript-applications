var debug = require('debug')('stream-array');
var Writable = require('stream').Writable;
var util = require('util');

util.inherits(SArray, Writable);

function SArray(cb) {
  
  if(!cb && typeof cb !== 'function') {
    console.log('Warning: callback is not provided. Will be unable to obtain the data written to this stream');
  }

  debug('Protect against calling without new');
  if (!(this instanceof SArray)) return new SArray(cb)
    
  debug('"decodeStrings" false will stop the decoding into Buffer before pasing it to _write method')
  Writable.call(this, {decodeStrings: false});
  debug(this);
  
  debug('We handle finish event because this is the point when the stream has ended writing - we have all data')
  if (cb) this.on('finish', function () { cb(this.getBody()) })
  this.body = []
}


SArray.prototype._write = function (chunk, encoding, cb) {
  this.body.push(chunk);
  cb();
}

SArray.prototype.getBody = function () {
  return this.body
}

module.exports = SArray