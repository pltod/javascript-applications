/**
 * This is the architect of our back-end application.
 * It is responsible to weave all dependencies used in our application.
 *
 * The architect decides which dependencies to weave according to
 * what is specified declaratively in its configuration file - configApplication.js.
 *
 */
var path = require('path'),
	architect = require("architect"),
	configPath = path.join(__dirname, "configApplication.js"),
	config = architect.loadConfig(configPath);



architect.createApp(config, function(err, app) {
	"use strict";
	if (err) {
		throw err;
	}
	console.log("App Back-End Ready!");
});

