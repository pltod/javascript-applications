var debug = require('debug')('app-server');
var express = require("express");
var bodyParser = require('body-parser');

module.exports = function (callback) {
  var app = express();

  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
    res.header("Access-Control-Allow-Methods", ["GET"]);
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  require('./db')(app, function (err) {
    err ? callback(err, null) : callback(null, require('./api')(app))
  });
}