var config = require('../config.json');
var url = 'mongodb://' + config.server + ":" + config.port + "/" + config.defaultDatabase;
var mongo = require('mongodb');

var koa = require('koa');
var app = koa();

app.use(function *(){
  console.log(app.db);
  this.body = 'OK';
});

mongo.connect(url, function (err, db) {
  app.db = db;
  app.listen(8000);
})