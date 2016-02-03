var debug = require('debug')('app-api');
module.exports = function (app) {

  app.get("/doc", function(req, res) {
    debug('Getting all docs...');
    app.db.findAll(function(err, docs) {
      err ? pong(res, 500, {"result": "Unable to find docs!"}) : pong(res, 200, docs) 
    });
  });  
  
  app.get("/doc/:id", function(req, res) {
    debug('Getting doc with id...');
    debug(req.params.id);

    app.db.findById(req.params.id, function(err, doc) {
      err ? pong(res, 500, {"result": "Unable to find doc!"}) : pong(res, 200, doc) 
    });
  });
  
  app.post("/doc", function(req, res) {
    debug('Saving doc...');
  
    app.db.save(req.body, function (err, result) {
      err ? pong(res, 500, {"result": "Unable to save doc!"}) : pong(res, 200, result) 
    });
  });
  
  app.put("/doc/:id", function(req, res) {
    debug('Updating doc...');
    debug(req.params.id);
    debug(req.body);
    app.db.update(req.params.id, req.body.body, function (err, result) {
      err ? pong(res, 500, {"result": "Unable to update doc!"}) : pong(res, 200, result) 
    });
  });
  
  app.delete("/doc/:id", function(req, res) {
    debug('Deleting doc...');
    debug(req.params.id);
    app.db.delete(req.params.id, function (err, result) {
      err ? pong(res, 500, {"result": "Unable to delete doc!"}) : pong(res, 200, result) 
    });
  });  
  
  return app;
}

function pong(res, code, data) {
  res.writeHead(code, {'Content-Type': 'application/json'});
  debug(data);
  (typeof data === "string") ? res.write(data) : res.write(JSON.stringify(data));
  res.end();
}