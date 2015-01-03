require([
	'subfolder/moduleB'
], function(sharedInstanceOfModuleB) {
	sharedInstanceOfModuleB.callIt();
});