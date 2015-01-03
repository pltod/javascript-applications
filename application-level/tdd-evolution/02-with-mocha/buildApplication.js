var grunt = require("grunt");


grunt.loadTasks(__dirname + "/tasks");
/**
 * Runs the local installation (in node_modules in this project) of Grunt.
 * Uses Gruntfile.js configuration.
 */ 
grunt.cli();


