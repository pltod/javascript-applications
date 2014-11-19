// Callback approach
exports.connect1 = function(mongo, url, callback) {
  mongo.connect(url, {}, callback);
}

exports.insertMany1 = function(collection, data, callback) {
  collection.insertMany(data, callback);
}

exports.close1 = function(db, callback) {
  db.close(callback);
}


// Promise approach
exports.connect2 = function(mongo, url) {
  return new Promise(function (resolve, reject) {
    mongo(url, function (err, db) {
      err ? reject(err) : resolve(db)
    })
  });  
}

exports.insertMany2 = function(db, collection, data) {
  return new Promise(function (resolve, reject) {
    collection.insertMany(data, function (err, result) {
      err ? reject(err) : resolve({data: result.ops, db: db})
    })
  });
}

exports.close2 = function(db) {
  return new Promise(function (resolve, reject) {
    db.close(function (err, db) {
      err ? reject(err) : resolve(db)
    })
  });
}


// Generator approach (Actually it is thunk that is used in generator based control flow)
exports.connect3 = function (mongo, url) {
  return function(callback) {
    mongo.connect(url, {}, callback);
  }
}

exports.insertMany3 = function (collection, data) {
  return function(callback) {
    collection.insertMany(data, callback);
  }
}

exports.close3 = function(db) {
  return function(callback) {
    db.close(callback);
  }
}


