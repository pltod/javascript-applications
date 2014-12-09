var debug = require('debug')('db-test');
var storage = require('node-persist');
var dbUtils = require("../utils");
var _ = require('underscore');



module.exports = function (collections) {
  storage.initSync();
  
  // init empty
  _.each(collections, function (collection) {
    if (!storage.getItem(collection)) {
      storage.setItem(collection, []);  
    }
  })
  
  return {
    init: init,
    insertMany: insertMany,
    insertOne: insertOne,  
    findAll: findAll,
    rmAll: rmAll,
    rmOne: rmOne,
    //TODO update to handle the case with confirmed = true
  }
}

function init() {
  storage.initSync();
}

function insertMany(collection, data, needTag) {
  if (needTag) {
    _.each(data, function (item) {
      tagItem(item);
    })
  }
  debug(data);
  storage.setItem(collection, data);
}

function insertOne(collection, item, needTag) {
  var data = storage.getItem(collection);
  needTag && tagItem(item);
  data.push(item);
  storage.setItem(collection, data);
  return item.uid;
}

function findAll(collection) {
  return storage.getItem(collection);
}

function rmAll(collection) {
  storage.setItem(collection, []);
}

/**
 * Removes one and return the removed.
 * @param {String} collection - the collection to search in
 * @returns the removed one
 * @type Object
 */
function rmOne(collection, uid) {
  var removed;
  debug(uid);
  var items = storage.getItem(collection);
  debug(items);
  var remaining = _.filter(items, function (item) {
    if (item.uid === uid) {
      debug('For removing: ' + item.uid);
      removed = item
    }
    return item.uid != uid;
  })
  debug(remaining);
  storage.setItem(collection, remaining);
  return removed;
}

function tagItem(item) {
  item.uid = dbUtils.uid();
  
  // TODO This is application specific
  item.confirmed = false;
}