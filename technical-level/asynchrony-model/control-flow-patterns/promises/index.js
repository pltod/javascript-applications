var debug = require('debug')('stream-test');
var test = require('tape');


debug('Promises are using "Revealing constructor function”');
debug('The ability to resolve or reject the promise is only revealed to the constructing code');
var okPromise = new Promise(function(resolve, reject) {
  debug('Running “executor function”...');
  debug('Invoking "resolve" to manipulate the state of promise instance')
  debug('Promise could succeed or fail only once');
  resolve("OK");
})

var koPromise = new Promise(function(resolve, reject) {
  debug('Running “executor function”...');  
  debug('Invoking "reject" to manipulate the state of promise instance')  
  reject(new Error("KO"));
})

debug(okPromise instanceof Promise)
debug(okPromise.constructor === Promise)
debug(Object.getPrototypeOf(okPromise) === Promise.prototype)


// Does not give access to anything different than these
// [ 'constructor', 'chain', 'then', 'catch' ]
debug(Object.getOwnPropertyNames(Promise.prototype))

test('### Consume Promises - OK ###', function(t) {
  debug('Attaching callback to promise after the promise has finished still will cause the callback to be invoked');      
  okPromise.then(function(result) {
    t.equal(result, 'OK', 'resolve handler is invoked with the async obtained value')
    t.end()
  })
});

test('### Consume Promises - KO ###', function(t) {
  koPromise.then(null, function(err) {
    t.equal(err.toString(), 'Error: KO', 'reject handler is invoked on failure')
    t.end()
  })
});
