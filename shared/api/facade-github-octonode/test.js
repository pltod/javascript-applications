var debug = require('debug')('facade-github-test');
var config = require('./config');
var api = require('./index')(config.token);
var owner = 'pltod';
api.following(owner, function (err, following, headers) {
  console.log(following);
});