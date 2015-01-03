module.exports = function(grunt) {
	
	grunt.registerTask('myserver', 'Start my static web server.', function(prop) {

		
		var props = ["server"];
		
		// If a prop was passed as the argument, use that sub-property of server.
		if (prop) { 
			console.log(prop);
			props.push(prop); 
		}
		

		var options = grunt.config(props) || {};
		require(options.path);
		
	});
	
};
