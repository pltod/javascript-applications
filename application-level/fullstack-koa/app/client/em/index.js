var ripple = require('ripple');
var each = require('each');
var template = require('./index.html');
var EM = ripple(template);
EM.use(each);
module.exports = new EM({
  data: {
    items: []
  }
});
