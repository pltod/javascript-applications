var path = require('path');
var architect = require("architect");

var configPath = path.join(__dirname, "configArchitect.js");
var config = architect.loadConfig(configPath);

architect.createApp(config, function (err, app) {
  if (err) throw err;
  console.log("App Ready!");
});
