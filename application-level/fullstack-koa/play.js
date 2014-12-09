//Holds configurations to deploy in different environments
//Configs the environment so we can use process.env('KEY') in our app
require('./config');

var container = require('./app/server/framework/container')({
  dbAdapter: require('./app/server/adapter/mongo/mongoAdapter'),
  serverAdapter: require('./app/server/adapter/koa/koaAdapter'),
  apps: [
    // Add more apps/features if you need to
    require('./app/server/api/feature1'),
    require('./app/server/api/feature2')
  ]
});

require('co')(container.play)();


if (process.env.NODE_ENV === 'development') {
  var browserSync = require('browser-sync');

  //Just in case to make sure the app server is running before browser sync is launched
  setTimeout(function() {
    browserSync.init("app/client/**/*", {
      proxy: "localhost:" + process.env.PORT
    });
  }, 1500);
}
