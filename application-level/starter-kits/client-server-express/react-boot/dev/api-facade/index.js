var request = require("superagent");

module.exports = {
  loadSteps: function (callback) {
    var url = "/api/steps";
    request.get(url, callback);
  }
}