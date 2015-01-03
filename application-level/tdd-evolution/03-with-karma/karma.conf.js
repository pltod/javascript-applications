// Karma configuration
// Generated on Fri Nov 29 2013 11:29:48 GMT+0200 (GTB Standard Time)

module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath : '',

		// frameworks to use
		// using mocha and chai adapters to karma allow us not importing them manually into our test files
		//	https://github.com/karma-runner/karma-mocha
		//	https://github.com/karma-runner/karma-requirejs
		//	https://github.com/princed/karma-chai-plugins  -  note that this could be used directly with manual import
		frameworks : ['mocha', 'requirejs', 'chai'],

		// list of files / patterns to load in the browser
		files : [
		
		'bower_components/jquery/jquery.js',
		
		//this is very heavy because loads all the files downloaded from bower
		//{
		//	pattern : 'components/**/*.js',
		//	included : false
		//},
		{
			pattern : 'src/**/*.js',
			included : false
		}, 
		{
			pattern : 'test/**/*Spec.js',
			included : false
		}, 
		
		//{
		//	pattern : 'components/flight/lib/*.js',
		//	included : false
		//},

		//Note that chai must be included exactly in this manner
		//otherwise requirejs is not loading it properly
		//Check what this pattern is doing ????
		{
			pattern : 'bower_components/chai/chai.js',
			included : false
		},
		//{
		//	pattern : 'components/sinon-chai/lib/sinon-chai.js',
		//	included : false
		//},


		//the bellow one is not working and I am not sure why
		//'components/chai/chai.js',

		//but underscore works...why is that???
		'bower_components/underscore/underscore.js',
		
		//'components/sinon/lib/sinon.js',
		//'components/sinon/lib/sinon/spy.js',
		//'components/sinon/lib/sinon/call.js',
		
		'test/test-main.js',
		
		//This adds mocha plugin for flight in karma pool so we can later invoke it to add some methods for testing flight components with mocha
		//'components/mocha-flight/lib/mocha-flight.js'	
		],

		// list of files to exclude
		exclude : [],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters : ['progress'],

		// web server port
        hostname: process.env.IP || '127.0.0.1',
        port: process.env.PORT || 9876,		
        runnerPort: 0,
		//port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		//browsers : ['PhantomJS'],
		browsers : ['Chrome'],
		
		// If browser does not capture in given timeout [ms], kill it
		captureTimeout : 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun : false
	});
};
