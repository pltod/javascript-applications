var debug = require('debug')('counter-stream');
var Readable = require('stream').Readable;
var util = require('util');

debug('1. Extend the appropriate parent class in your own subclass.');
util.inherits(Counter, Readable);


debug('2. Call the appropriate parent class constructor in your constructor');
function Counter(opt) {
  Readable.call(this, opt);
  
  // the state
  // here this is predefined state
  this._max = 100;
  this._index = 1;
  
}

debug('3. Implement one or more specific methods')
debug('"In the implementation code, it is very important to never call the methods described in API for Stream Consumers:"');
debug(Object.getOwnPropertyNames(Readable.prototype));
debug('Exactly this lack of proper encapsulation is critisized in Revealing Constructor Pattern.');

Counter.prototype._read = function () {
  var i = this._index++;
    if (i > this._max) {
      this.push(null)
    }
    else {
      var str = '' + i;
      var buf = new Buffer(str, 'ascii');
      this.push(buf);
    }
}

module.exports = Counter;