// Set the require.js configuration for your application.
require.config({
	deps : ["startClientApplication"],
	paths : {
		
		extendables : "/assets/js/extendables",
		events : "/assets/js/events",
		architect : "/assets/js/architect",
		
		underscore : "/assets/js/underscore",
		jquery: "/assets/js/jquery-1.10.2",
		
		mocha : "/assets/js/mocha",
		chai : "/assets/js/chai",
		
		flight : "assets/js/flight",
		
		use : "/assets/js/use",
		require : "/assets/js/require",
		
		tests : "/tests"
	},
	
	shim : {
		underscore : {
			exports : "_"
		},
		jquery : {
			exports : "$"
		},
		flight : {
            exports : "flight"
		}
	},
	
	use : {
			mocha : {
				attach : 'mocha'
			}
		}
	
});
