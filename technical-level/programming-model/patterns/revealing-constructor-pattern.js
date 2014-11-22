var debug = require('debug')('lazy-function-definition');
var test = require('tape');

debug('Reference: http://domenic.me/2014/02/14/the-revealing-constructor-pattern/');

test('### Revealing Constructor Pattern ###', function(t) {

  var cc = new C(function (resolve) {
    debug('Usually do something async here...');
    resolve(1);
  })
  
  debug('nothing else than calling then for getting the internal data could be done with constructed instance');
  cc.then(function (data) {
    t.equal(data, 1, 'data is obtained')
    t.end();
  })

});

function C(f) {
  if (!(this instanceof C)) return new C(f)
  
  debug('This is the only place where we can manipulate the state of produced instances');
  debug('Call the executor function and pass reference to resolve function');
  f(resolve);
}

C.prototype.then = function (f) {
  debug('"then" method receives callback that gets injected with the internally stored data')
  f(resolve());
}

// Lazy function definition FTW
function resolve(data) {
  debug('Resolve function is responsible to keep the calculated data');
  debug('It is not exposed as part of the instance interface but just invoked when the client needs this data');

  var res = data;
  
  resolve = function(){
    return res;
  };
  
  return resolve();    
}