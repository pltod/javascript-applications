var debug = require('debug')('date-prototoype');
var test = require('tape');

test('### getTime and valueOf ###', function(t) {

  var birthday = new Date(2000, 2, 2);
  t.equal(birthday.getTime(), birthday.valueOf(), "The value returned by the getTime() and valueOf() methods is the number of milliseconds since 1 January 1970 00:00:00 UTC")
    
  t.end();
});
