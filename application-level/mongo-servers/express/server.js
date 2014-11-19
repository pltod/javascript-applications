var config = require('../config.json');
var url = 'mongodb://' + config.server + ":" + config.port + "/" + config.defaultDatabase;
var mongo = require('mongodb');

var express = require("express");
var app = express();

app.get("/db", function(req, res) {
  console.log(app.db);
  res.json('OK');
});

mongo.connect(url, function (err, db) {
  app.db = db;
  app.listen(8000);
})

