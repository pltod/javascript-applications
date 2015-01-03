define(["use!mocha"], function(Mocha) {
	"use strict";

	function setup(options, imports, register) {
		register(null, {
			testRunnerImpl : {
				Mocha : Mocha,
				run : function() {
					Mocha.setup(options.testStyle);
		 			/**
		 		 	* 'describe' and 'it' are set up by mocha.setup()
		 		 	* So require all the tests that uses these after calling setup().
		 		 	*/
					requirejs(options.tests, function() {
				    	Mocha.run();
					});
				}    		
			}
		});
	}
	  
	setup.provides = ["testRunnerImpl"];

	return setup;
	
}); 