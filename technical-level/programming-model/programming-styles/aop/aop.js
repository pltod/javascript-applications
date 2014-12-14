var debug = require('debug')('aop');
var test = require('tape');

test('### AOP example with function decorators achieved with functional arguments ###', function(t) {
  var logedIn = false;
  var getDataAfterLoggedIn = validateDecorator(getData);

  function getData() {
    return 'data';
  }

  function validateDecorator(originalFunction) {
    return function() {
      if (!logedIn) {
        return false;
      }

      return originalFunction();
    };
  }

  t.equal('data', getData(), "Data is obtained without logging in");
  t.notOk(getDataAfterLoggedIn(), 'Validator sees that user is not logged in and do not return the data');
  logedIn = true;
  t.equal('data', getDataAfterLoggedIn(), "Now the user is logged in, validator is ok and data is returned");

  t.end();
});
