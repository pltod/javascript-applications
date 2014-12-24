var to = require('./index');
var test = require("tape");

test('### lazy ###', function(t) {
  var count = 0;

  function e() {
    count++;
    return 1 + 1;
  }
  
  var onceE = to.once(e);

  t.equal(onceE(), 2, 'function invoked once')
  t.equal(count, 1, 'body executed')  
  t.equal(onceE(), 2, 'function invoked second time')
  t.equal(count, 1, 'body not executed; value taken form the cache')

  t.end();
});

test('### memo ###', function(t) {
  var count = 0;

  function e(p) {
    count++;
    return 1 + p;
  }
  
  var memoE = to.memo(e);

  t.equal(memoE(1), 2, 'function invoked once')
  t.equal(count, 1, 'body executed')  
  t.equal(memoE(1), 2, 'function invoked second time')
  t.equal(count, 1, 'body not executed; value taken form the cache')
  t.equal(memoE(2), 3, 'function invoked third time with different param')
  t.equal(count, 2, 'body executed')  

  t.end();
});

test('### memo ###', function(t) {
  var count = 0;

  function e(p1, p2) {
    count++;
    return p1 + p2;
  }
  
  var memoE = to.memoMultiple(e);

  t.equal(memoE(1, 1), 2, 'function invoked once')
  t.equal(count, 1, 'body executed')  
  t.equal(memoE(1, 1), 2, 'function invoked second time')
  t.equal(count, 1, 'body not executed; value taken form the cache')
  t.equal(memoE(1, 2), 3, 'function invoked third time with different param')
  t.equal(count, 2, 'body executed')  

  t.end();
});

test('### curry ###', function(t) {
  var count = 0;

  function e(p1, p2, p3) {
    count++;
    return p1 + p2 + p3;
  }
  
  var curryE = to.curry(e);
  var withOneAndTwo = curryE(1, 2);
  t.equal(count, 0, 'function waits for more parameters')  
  t.equal(withOneAndTwo(3), 6, 'second set of parameters supplied')
  t.equal(count, 1, 'body executed')  

  t.end();
});

test('### curry async ###', function(t) {
  
  // function that accepts callback for invoking when async operation is done
  function e(p1, p2, callback) {
    // simulate async
    setTimeout(function () {
      callback(null, p1 + p2);
    }, 2000)
  }
  
  var curryMemoAsyncE = to.curryMemoAsync(e);
  
  // pass params to trigger the async operation
  // two operations in parallel in this case
  var f1 = curryMemoAsyncE(1, 2);
  var f2 = curryMemoAsyncE(2, 3);  
  
  f1(function (e, r) {
    t.equal(r, 3, 'callback provided before async operation end');  
  });
  
  // pass callback whenever is needed
  setTimeout(function () {
    f2(function (e, r) {
      t.equal(r, 5, 'callback provided after async operation end');  
      t.end();
    })  
  }, 3000)
});


/**
 * Simulate curry, thunk, and partial execution in one.
 *
 * @private
 * @param {Boolean} delayeied true if you want a thunk - delayied execution
 * @param {Function} fn the function that will be curried and optionally delayed
 * @param {Number} numberParams (optional) the number of formal parameters needed in case they are not explicit
 * @returns Describe what it returns
 * @type String|Object|Array|Boolean|Number
 */
// function cute(delayied, fn, numberParam) {
//   var d = delayied
//   var required = numberParam || fn.length;
//   var pCount = 0;
//   
//   return function () {
//     // DO nothing
//   }
  // 
  // return function () {
  //   var args = Function.prototype.slice.call(arguments);
  //   passed = passed + args.length;
  //   return (required === passed) ? fn.apply(null) : function () {
  //     console.log(done)
  //     passed = passed + args.length;
  //     var newArgs = Function.prototype.slice.call(arguments);
  //     return f.apply(args.concat(newArgs))
  //   }
  // }
  //}

