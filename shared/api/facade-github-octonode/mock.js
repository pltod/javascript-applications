var debug = require('debug')('facade-github-mock');
var _ = require('underscore');

module.exports = function(data) {
  var data = data;
  
  return {
    following: function(name, callback) {
      setTimeout(function() {
        debug('Searching who ' + name + ' is following');
        var result = _.findWhere(data, {user: name}).following;
        callback(null, result);
      }, 0);
    }
  }
}
