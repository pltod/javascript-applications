/**
 * Note that the setup method is executed only for the defined plugin on the first place.
 * Probably this is considered the main file from which all other dependencies are invoked in certain point in time.
 */
define(function() {
	"use strict";
	return [
		{ 
			packagePath: "plugins/mochaPlugin",
			testStyle: "bdd",
			tests: ["tests/mochaTests.js"]
		},
		"./testRunner"
	];
});
