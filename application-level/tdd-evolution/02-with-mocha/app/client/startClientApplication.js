/**
 * This is the architect of our front-end application.
 * It is responsible to weave all dependencies used in our application.
 *
 * The architect decides which dependencies to weave according to
 * what is specified declaratively in its configuration file.
 *
 */
require(["./configArchitect", "architect"], function(Config, Architect) {
	
	"use strict";
	
	Architect.resolveConfig(Config, function(err, config) {
		if (err) {
			throw err;
		}
		Architect.createApp(config, function(err, app) {
			if (err) {
				throw err;
			}
			console.log("App Front-End Ready!");
		});
	});

});

