/**
 * Node HTTP Server with Connect Middleware and Express Web Application Framework.
 *
 * @param {Object} options
 * @param {Object} imports
 * @param {Object} register
 */
module.exports = function setup(options, imports, register) {
	"use strict";

	var fs = require("fs"), 
		express = require('express'), 
		server = express(), 
		
	mapStaticFolders = function() {
		console.log("Mapping static folders....");
		Object.keys(options.folders).sort().reverse().forEach(function(key) {
			console.log(key + "->" + options.folders[key]);
			server.use("/" + key, express.static(options.folders[key]));
		});
		console.log("End mapping static folders....");
	}, 
	configureServer = function() {
		server.configure(function() {
			server.use(express.bodyParser());
			server.use(express.methodOverride());
			server.use(express.cookieParser());
		});
	}, 
	startServer = function() {
		server.listen(options.port);
		console.log('Express HTTP Server is listening on ' + options.host + ':' + options.port);
	};


	server.get("/", function(req, res) {
		fs.createReadStream(options.indexPage).pipe(res);
	});

	server.get("/testsMocha", function(req, res) {
		fs.createReadStream(options.testPageMocha).pipe(res);
	});


	

	configureServer();
	mapStaticFolders();
	startServer();

	register(null, {
		httpServer : {}
	});
};

