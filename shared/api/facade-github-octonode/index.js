var debug = require('debug')('facade-github-octonode');
var github = require('octonode');

module.exports = function(options) {
  var token, client;
  
  if (options.mock) {
    return require('./mock')(options.mockData);
  } else {
    client = github.client(options.token)
    return {
      //callback -> err, body, headers
      following: function(user, callback) {
        debug('Searching who ' + user + ' is following');
        var ghuser = client.user(user);
        ghuser.following(callback);
      },
      //callback -> err, left, max
      limit: function(callback) {
        client.limit(callback)
      }
    }
  }
}
