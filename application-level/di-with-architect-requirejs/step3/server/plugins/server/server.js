var architect = require("architect");
module.exports = function setup(options, imports, register) {
	
	var objectMapper = imports.objectMapper;
	
	//TODO make this with some sort of assert
	console.log(objectMapper.Schema);
	
	//TODO make this with promises because of the asynchronous nature of the code
	for (var i=0; i < 2; i++) {
	  var context = "dynamic"+i,
	  	  config = [{
				packagePath: "../lazyLoadPlugin",
				context: context
			}],
		  resolvedConfig = architect.resolveConfig(config, __dirname);
		architect.createApp(resolvedConfig, function (err) {
		  if (err) {
			  console.log("ERROR!");
			  throw err;
		  }
		  console.log("New lazyLoadPlugin has been loaded in context: " + context);
		});	  
	};
	
	/**
	 * This needs to be called even when you do not need to register something.
	 * It says to the asynchronous app that this plugin is ready so the application could continue.
	 */
	register()

};
