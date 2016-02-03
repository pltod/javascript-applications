var server = require('./koaServer')();
var middleware = require('./koaMiddleware');

middleware.available.forEach(function(item) {
  server.plug(item);
});

module.exports = {
  start: function() {
    var s = server.start();
    return s;
  },
  addNewApp: function(appData) {
    var newApp = server.addNewApp();

    appData.routes.map(function(path, index) {
      var handler = function * (next) {
        this.type = 'html';
        this.body = yield appData.handlers[index]();
      }
      newApp.use(middleware.addGetRoute(path, handler));
    });

    server.plug(middleware.mountNewApp(appData.appNamespace, newApp));
  }
}
