var debug = require("debug")("cache");
var slice = Array.prototype.slice;

/**
 * Cache utilities for no param, single param, and multi param functions.
 * Support delayed execution.
 *
 * @author pltod
 * @version 0.0.1
 */
module.exports = {

  // cache calc res no input -> similar to lazy function definition
  once: function (fn) {
    var res;
    function once() {
      return res = res || fn();
    }
    
    return once;
  },

  // cache calc res one parameter -> memoization
  memo: function(fn) {
    var cache = {};
    return function(p) {
      return p in cache ? cache[p] : cache[p] = fn(p)
    }
  },

  // cache calc res multiple parameter -> memoization
  memoMultiple: function(fn) {
    var cache = {};
    return function() {
      var p = JSON.stringify(arguments);
      return p in cache ? cache[p] : cache[p] = fn.apply(this, arguments);
    }
  },

  // cache parameters -> curry  
  curry: function(fn) {
    return function () {
      var args = slice.call(arguments)
      return function() {
        return fn.apply(null, args.concat(slice.call(arguments)))
      }
    }
  },
  
  // curry the list with parameters - input needed for async oper / callback -> curry
  // cache (memo) the result of async operation -> memo
  curryMemoAsync: function(fn) {
    var done, err, res;
    return function() {
      var args = slice.call(arguments);
      args[arguments.length] = cb;
      fn.apply(this, args);
      return function(f) {
        done ? f(err, res) : cb = f
      }
    }
    // borrowing this callback 
    // it is used in case the async result 
    // is obtained before the client code provide another callback
    // this callback just cache the result
    function cb(e, r) {
      done = true;
      err = e;
      res = r;
    };
  },

  //TODO something like curry but for nodejs cases where we could:
  // start async process with the first set of arguments
  // then work on cached result with the callback

  // thunk
  delay: function(fn, delay) {
    // TODO
  }
}
