console.log("Start application configuration...");
var path = require('path');
var grunt = require("grunt");
grunt.loadTasks(__dirname);

var configPath = path.join(__dirname, "configGrunt.js");
grunt.cli({
  //base: "./",
  //config: "build/configGrunt.js",
  config: configPath,
}, function() {});
