var request = require('superagent');

//Must be configurable
var dataURL = 'http://192.168.0.112:3002/feature1/mockusers';

module.exports = {

  users: function(callback) {
    request.get(dataURL).end(callback);
  }

}
