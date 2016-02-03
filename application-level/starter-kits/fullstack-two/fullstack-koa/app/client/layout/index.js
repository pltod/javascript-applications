var ripple = require('ripple');
var template = require('./index.html');
var Layout = ripple(template);

module.exports = new Layout();
