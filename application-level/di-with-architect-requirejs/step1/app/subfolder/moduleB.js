define([
	'moduleA'
], function(sharedInstanceOfModuleA) {
	return {
		callIt: function() {
			console.log(sharedInstanceOfModuleA.name);
		}
	};
});