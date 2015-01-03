var assert = require("assert");
module.exports = function setup(options, imports, register) {
	//assert.equal(typeof options.numberOfDances, "number", "Option 'numberOfDances' is required");

	var mongoose = require('mongoose');

    register(null, {
    	//This must be the same as the plugin name
        objectMapper: {
        	Schema: mongoose.Schema
        }
    });
};
