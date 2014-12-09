var koa = require('koa');

module.exports = function() {

  var server = koa();

  return {
    start: function() {
      var s = server.listen(process.env.PORT);
      console.log('...listening on port: ' + process.env.PORT);
      return s;
    },

    plug: function(middleware) {
      server.use(middleware);
    },

    addNewApp: function() {
      return koa();
    }
  }
}
