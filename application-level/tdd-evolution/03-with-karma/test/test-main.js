/**
 * Filter function that takes the files available to karma and takes only the tests that are later loaded by require to be runned  
 */
var tests = Object.keys(window.__karma__.files).filter(function(file) {
	return (/Spec\.js$/.test(file));
});

requirejs.config({
	// Karma serves files from '/base'
	baseUrl : '/base',

	paths : {
		jquery : "bower_components/jquery/jquery",
		underscore : "bower_components/underscore/underscore"
	},

	shim : {
		jquery : {
			exports : 'jQuery'
		},
		underscore : {
			exports : '_'
		}
	},

	// ask Require.js to load these files (all our tests)
	deps : tests,

	// start test run, once Require.js is done
	callback : window.__karma__.start
}); 