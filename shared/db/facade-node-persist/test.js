var debug = require('debug')('db-test');
var test = require("tape");
var _ = require('underscore');
var collection = 'subscribers.json';
var db = require("./db")([collection]);

var testData = [
  {"email": "1@4th.dim", "keywords": ["coffee", "destruction", "omniscience"], "type": ["story", "comment"]},
  {"email": "2@4th.dim", "keywords": ["nodejs", "javascript"], "type": ["story"]}
];
var item = {"email": "3@4th.dim", "keywords": ["nodejs", "javascript"], "type": ["story"]};

test('### Insert - Find - Check - Delete ###', function(t) {
  db.rmAll(collection);  
  db.insertMany(collection, testData, true);
  var data = db.findAll(collection);
  debug(data);
  t.equal(testData.length, data.length, testData.length + " records exists")
  t.ok(data[0].uid, 'UID has been generated');
  t.equal(data[0].confirmed, false, 'confirmed set to false');
  db.rmAll(collection);
  t.equal(0, db.findAll(collection).length, 'everything has been removed')
  t.end();
});

test('### Insert One Item ###', function(t) {
  db.rmAll(collection);  
  db.insertOne(collection, item, true);
  var data = db.findAll(collection);
  t.equal(1, data.length, 'Item has been inserted');
  t.ok(data[0].uid, 'UID has been generated');
  t.equal(data[0].confirmed, false, 'confirmed set to false');
  t.end();
});

test('### Remove Item ###', function(t) {
  db.rmAll(collection);
  db.insertMany(collection, testData);
  var data = db.findAll(collection);
  var item = data[0];
  var removed = db.rmOne(collection, item.uid);
  var data2 = db.findAll(collection);
  t.equal(data.length-1, data2.length, 'Item has been removed');
  t.equal(removed.uid, item.uid, 'Removed item has been returned');
  t.end();
});