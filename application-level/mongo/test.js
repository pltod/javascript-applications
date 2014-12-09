var test = require('tape');
var config = require('./config.json');
var mongo = require('mongodb');
var url = 'mongodb://' + config.server + ":" + config.port + "/" + config.defaultDatabase;
var run = require('../../shared/control-flow/async-loop');
var dbUtils = require('./db-utils');

test('Connect - Insert - Close flow with Callbacks', function(t) {
  var data = [{"a": "1"}, {"a": "2"}];
  
  // Callback hell
  dbUtils.connect1(mongo, url, function (err, db) {
    t.ok(db, 'DB is available')
    dbUtils.insertMany1(db.collection(config.defaultCollection), data, function (err, result) {
      t.deepEqual(data, result.ops, 'Data has been inserted');
      dbUtils.close1(db, function (err) {
        t.notOk(err, 'DB is closed');
        t.end();
      })
    })
  })

});

test('Connect - Insert - Close flow with Promises', function(t) {
  var data = [{"a": "1"}, {"a": "2"}]; 
  
  // Method chaining
  // The flow is: connect => close => print state
  dbUtils.connect2(mongo, url)
    .then(handleObtainSuccess, handleError)
    .then(handleInsertSuccess, handleError)    
    .then(handleCloseSuccess, handleError)
  
  function handleError(err) {
    t.notOk(err);
  }

  function handleInsertSuccess(res) {
    t.deepEqual(data, res.data, 'Data has been inserted');
    return dbUtils.close2(res.db);
  }

  function handleObtainSuccess(db) {
    t.ok(db, 'DB is available!');
    return dbUtils.insertMany2(db, db.collection(config.defaultCollection), data);
  }
  
  function handleCloseSuccess() {
    t.pass('DB is closed!');
    t.end();
  }
  
});

test('Connect - Insert - Close flow with Generators', function(t) {
  
  // Async code looks like sync code
  function *main () {
    var db = yield dbUtils.connect3(mongo, url);
    t.ok(db, 'DB is available');
    
    var data = [{"a": "1"}, {"a": "2"}];
    var r1 = yield dbUtils.insertMany3(db.collection(config.defaultCollection), data);
    t.deepEqual(data, r1.ops, 'Data has been inserted');
    
    var r2 = yield dbUtils.close3(db);
    t.notOk(r2, 'DB is closed');
    t.end();
  }

  run(main);
});