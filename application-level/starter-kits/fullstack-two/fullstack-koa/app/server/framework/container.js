// Kind of Application Server where the applications are running.

// Mediator between the components part of an application.

// Configured externally as suggested by 12factor to play nice within different deployment environments.

// Use node modules for each aspect via adapters with stable interfaces so the replacement of external modules does not reflect it.

module.exports = function(options) {

  /*
    TODO check options
  */

  var db = require('./database')(options.dbAdapter);
  var server = require('./server')(options.serverAdapter);
  var apps = options.apps;

  return {
    play: function *() {

      console.log('Opening DB...');

      db.openDb();

      apps.forEach(function(app) {
        server.addNewApp(app(db));
      });

      server.start();
    }
  }
};
