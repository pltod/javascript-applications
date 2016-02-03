var koa = require('koa');
var route = require("koa-route");

var mount = require('koa-mount');
var serveStatic = require('koa-static');

var compress = require('koa-compress');

var logger = require('koa-logger');

var favicon = require("koa-favicon");
var fav = favicon();

var neededMiddleware = [];

//in this way we give middleware a name useful for debuging
fav._name = "favicon";
neededMiddleware.push(fav);



function *timer(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;

  //Set a response header of how much time is needed to execute the request
  this.set('X-Response-Time', ms + 'ms');

  console.log('%s %s - %s ms', this.method, this.url, ms);
  console.log('timer ends');
}
neededMiddleware.push(timer);


// use a real logger in production
// hide the logger during tests because it's annoying
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  neededMiddleware.push(logger());
}

neededMiddleware.push(compress());


//Serve static dir in all cases...
neededMiddleware.push(serveStatic(process.env.STATIC_DIR));

// don't serve components in production
if (process.env.NODE_ENV !== 'production') {
  console.log("Extra static routes");

  // only load this dependency when necessary
  var serveComponent = require('component-koa');
  // serve build.js and build.css
  neededMiddleware.push(serveComponent());

  // serve your components' files
  neededMiddleware.push(serveStatic(process.env.ROOT_DIR));

  // serve your dependencies' files
  neededMiddleware.push(serveStatic(process.env.COMPONENTS_DIR));
}

module.exports = {
  available: neededMiddleware,
  addGetRoute: function(path, handler) {
    return route.get(path, handler);
  },
  mountNewApp: function(namespace, app) {
    return mount(namespace, app);
  }
}
