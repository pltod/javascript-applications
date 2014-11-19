var config = require('../config.json');
var url = 'mongodb://' + config.server + ":" + config.port + "/" + config.defaultDatabase;

var Hapi = require("hapi");
var mongo = require('mongodb');

var options = { "url": url };

var server = new Hapi.Server(8000);

server.pack.register(
  { plugin: require('hapi-mongodb'), options: options }, 
  errorHandler
);

server.route( {
  "method"  : "GET",
  "path"    : "/db",
  "handler" : handler
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});


function handler(request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

  console.log(db);
  console.log(ObjectID);
  
  reply('OK');
};


function errorHandler(err) {
  if (err) {
    console.error(err);
    throw err;
  }
}