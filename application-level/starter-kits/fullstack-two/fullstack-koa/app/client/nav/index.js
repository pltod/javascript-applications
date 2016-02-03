var ripple = require('ripple');
var events = require('events');
var template = require('./index.html');
var Nav = ripple(template);

Nav.use(events);

module.exports = function(app, options) {

  Nav.prototype.showUsers = function() {
    app.users();
  }

  var nav = new Nav();
  nav.replace(".nav");

}
