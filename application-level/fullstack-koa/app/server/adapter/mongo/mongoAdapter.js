process.env.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
process.env.MONGO_PORT = process.env.MONGO_PORT || 27017;
process.env.DB = process.env.DB || 'testdb';

var url = 'mongodb://' + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.DB;

var mongojs = require('mongojs');
var JSONStream = require('JSONStream');
var db;

// Very initial impl
// Note that cursor is not closed after first execution of findAllEntities
// Still here is the place to introduce new functionality against the DB

module.exports = {

  openDb: function() {
    db = mongojs(url, ['users']);
  },

  findAllEntities: function(entity) {
    var data = db[entity].find({}).pipe(JSONStream.stringify());
    data.pipe(process.stdout);
    return data;
  }

}
