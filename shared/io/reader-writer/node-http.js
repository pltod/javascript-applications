var http = require('http');
var https = require('https');

module.exports = {
  
  // this method is very specific
  // needed to comply with reader local file interface
  async: httpsGet,
  
  httpGet: httpGet,
  httpsGet: httpsGet,
  httpPost: httpPost,
  httpDelete: httpDelete 
}

function httpGet(url, callback) {
  doGet(http, url, callback)
}

function httpsGet(url, callback) {
  doGet(https, url, callback)
}

function doGet(protocol, url, callback) { 
  protocol.get(url, function(res) {
    var payload = "";
    res.on('data', function(data) {
      payload = payload.concat(data);
    });
    
    res.on('end', function () {
      callback(null, res.statusCode, payload.toString());
    })
  })
  .on('error', function(e) {
    callback(e, null, null);
  });  
}

function httpPost(options, data, callback) {
  options.method = 'POST';
  handle(http, options, data, callback);
}

function httpDelete(options, data, callback) {
  options.method = 'DELETE';
  handle(http, options, data, callback);
}


function handle(protocol, options, data, callback) {
  var req = protocol.request(options, function(res) {
    var payload = "";
    res.on('data', function(data) {
      payload = payload.concat(data);
    });
    
    res.on('end', function () {
      callback(null, res.statusCode, payload.toString());
    })  
  });
  
  req.on('error', function(e) {
    callback(e, null, null);
  });
  
  if (data) {
    req.write(JSON.stringify(data));
  }
  
  req.end();
}


