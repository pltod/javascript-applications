module.exports = function setup(options, imports, register) {

	/**
	 * So this plugin is instantiated at runtime according to the lets say user input.
	 * We do not have to check what is the user input and do something.
	 * Imagine the following use case - browser with a single input field that say do you want a mocked db version or real db version
	 * 	- Then you create application with mocked db or real db without changing the code
	 *  - I must be able to say open the db version in the same process with no change in the configuration (other DI can't do it)
	 * So I could end up with two browser regions one is working with the mock db and the other is working with the real db.
	 *  
	 */
	var context = options.context;
	console.log("Lazy loaded plugin working in context: " + context);

    register(null, {
    	//This must be the same as the plugin name
        lazyLoadPlugin: {
        	item: {}
        }
    });
};
