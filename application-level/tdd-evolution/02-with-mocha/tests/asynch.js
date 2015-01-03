/**
 * Resources:
 * 
 *	http://effectivejs.com/
 *
 */
define(["chai"], function(Chai) {
	
	'use strict'
	
	var GLOBAL_OBJECT = window,
		should = Chai.should(),
		expect = Chai.expect,
		assert = Chai.assert,

		Suite = {
			name: "Asynchronous programming with JavaScript",
			tests: []
		};

	Suite.tests.push({
		name: "First",
		body: function() {
		}
	});

	return Suite;
});
