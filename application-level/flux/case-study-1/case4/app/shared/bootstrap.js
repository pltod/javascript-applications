//NOTE: this is basically the framework (read Fluxy, Fluxxor)

'use strict';

var Dispatchr = require('dispatchr')();

var NavStore = require('./stores/NavStore');
Dispatchr.registerStore(NavStore);

var Actions = require('./stores/Actions');

var Router = require('./components/router');

function bootstrap(route, cb){
  var dispatcher = new Dispatchr({});
  var actions = new Actions(dispatcher);

  console.log(route);
  
  actions.route(route, function(err){
    if(err){
      return cb(err);
    }

    cb(null, Router({ actions: actions }));
  });
}

module.exports = bootstrap;
