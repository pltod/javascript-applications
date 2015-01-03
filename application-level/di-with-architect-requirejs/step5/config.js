// Set the require.js configuration for your application.
require.config({
	// Initialize the application with the main application file
	deps : ["start"],

	/**
	 * This means that when we load with require and particular name
	 * it will be replaced with the corresponding string e.g. require(events) = js/events.js
	 */
	paths : {
		// JavaScript folders
		//libs : "js",
		//plugins : "js",

		// Libraries
		jquery : "js/jquery",
		backbone : "js/backbone",
		/**
		 * This is a library that extends underscore and provide better performance and more functionality.
		 * See: https://github.com/bestiejs/lodash
		 */
		lodash : "js/lodash",
		
		
		
		architect: "js/architect",
		/**
		 * Architect dependency
		 */
		events: "js/events",
	
		/**
		 * Architect plugins
		 */
		math: "js/math",
		app: "js/app",
		mvc: "js/mvc"
	},


	shim : {
		backbone : {
			deps : ["lodash", "jquery"],
			exports : "Backbone"
		}
	}

});
