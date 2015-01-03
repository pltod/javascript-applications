/**
 * It must validate the existence of all of my modules.
 * Also this is my MEDIATOR for plugins/modules.
 */
var path = require('path');
var architect = require("architect");

var configPath = path.join(__dirname, "config.js");
var config = architect.loadConfig(configPath);

var app = architect.createApp(config, function (err, app) {
  if (err) {
	  console.log("ERROR!");
	  throw err;
  }
  console.log(app.services);
  console.log("SERVER HAS BEEN STARTED!");
});

app.on("service", function(name){console.log("Registering service...." + name)});
app.on("service", function(name){console.log("Registering plugin...." + name)});
