var api = require('api');

function postServices(res) {
  console.log("SERVICES LOADED");
  var em = require('em');
  em.set("items", res.body);
  em.replace('.main');
}


var app = {
  services: function() {
    api.services(postServices);
  },
  use: function(fn, options) {
    fn(app, options);
  }
}
require('layout').appendTo(document.body);
require('logo').replace('.main');

app.use(require('nav'));
