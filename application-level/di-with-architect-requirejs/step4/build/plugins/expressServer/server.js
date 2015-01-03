module.exports = function setup(options, imports, register) {
	var express = require('express');
	var app = express();
	app.get('/hello.txt', function(req, res){
	  res.send('Hello World');
	});
	app.listen(options.port);
	console.log('Listening on port ' + options.port);
	
    register(null, {
        expressServer: {}
    });
};

