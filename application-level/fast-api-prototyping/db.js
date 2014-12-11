var debug = require('debug')('app-db');

var config = require('./config.json');
var url = 'mongodb://' + config.server + ":" + config.port + "/" + config.defaultDatabase;
var mongo = require('mongodb');
var ObjectID = mongo.ObjectID;

module.exports = function(app, callback) {

  var collection;

  mongo.connect(url, function(err, db) {
    collection = db.collection(config.defaultCollection);
    app.db = {
      findById: function(id, callback) {
        collection.findOne({_id: ObjectID(id)}, function(err, doc) {
          callback(err, doc)
        });
      },
      findAll: function(callback) {
        collection.find().toArray(function(err, docs) {
          callback(err, docs);
        });
      },
      save: function(doc, callback) {
        collection.insert(doc, function(err, result) {
          callback(err, result)
        });
      },
      update: function(id, body, callback) {
        debug(body);
        collection.update({_id: ObjectID(id)}, {$set: {body: body}}, function(err, result) {
          debug(err)
          callback(err, result)
        });
      },
      delete: function(id, callback) {
        collection.remove({_id: ObjectID(id)}, function(err, result) {
          callback(err, result)
        });
      }
    };
    app.closeDb = db.close.bind(db);
    app.cleanColl = function (callback) {
      collection.remove(function (err, result) {
        callback(err, result)
      })
    };

    callback(err);
  });

}
