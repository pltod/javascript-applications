define(function() {

	"use strict";

	function setup(options, imports, register) {

		var testRunner = imports.testRunnerImpl;
 		testRunner.run();
 		
	}


	  
	setup.provides = ["testRunner"];
	setup.consumes = ["testRunnerImpl"];
	return setup;
	

	

}); 