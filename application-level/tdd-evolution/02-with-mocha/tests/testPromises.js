//From: 
// Main tutorial 	- https://raw.github.com/kriskowal/q/master/design/README.js
// POLA 			- http://en.wikipedia.org/wiki/Principle_of_least_authority


/**
 * operation 1 could fail or execute in particular amount of time.
 *  
 * @param {Object} options
 */
var interval = 1000,
	//Step 1: Asynchronous code with Callback with success and error handling - return values or throw exception
	operation1 = function(options) {
		if (options.forceFail) {
			setTimeout(function() {
				options.errorback(new Error("Error during execution!"));
			}, interval);
			return;
		}
		setTimeout(function() {
			options.callback(1);
		}, interval);
	},
	 
	postProcessOperation = function(val) {
		console.log(val);
	},
	errorHandler = function(error) {
		console.log(error);
	},
	//Step2: Asynchronous code with Eventual Results (Defferred, Promise) - return object that represents the eventual result and helps us register callbacks when the resolution is a fact
	//
	//Consider a more general approach, where instead of returning values or
	//throwing exceptions, functions return an object that represents the eventual
	//result of the function, either successful or failed.
	//
	//Problems:
	//  we do not control the resolution
	//	callback could be registered after the operation has been done and in such case it will not be called
	//	new callbacks can not be added after the operation has been done
	operation2 = function () {
	    var callback;
	    setTimeout(function () {
	        callback(1);
	    }, interval);
	    return {
	        then: function (_callback) {
	            callback = _callback;
	        }
	    };
	},
	//Step3 - this function + defer function 
	//This operation is using promise and return it so we can use to add handlers
	operation3 = function() {
  		var result = defer();
	    setTimeout(function () {
	        result.resolve(1);
	    }, interval);
	    return result;
	},
	//Step3: Asynchronous code with Eventual Results (Defferred, Promise) - return object that represents the eventual result that helps us register callbacks when the resolution is a fact 
	//This is improved version 2. Here we could handle multiple callbacks, callbacks added after resolution, and multiple resolutions (throw on each after the first one or just skip it)
	defer = function() {
		var pending = [], value;
	    return {
	        resolve: function (_value) {
	        	var i = 0;
	        	if (pending) { //Prevents resolving the promise multiple times.
		            value = _value;
		            for (i; i < pending.length; i++) {
		                var callback = pending[i];
		                callback(value);
		            }
		            pending = undefined;
  				} else {
  					//We can just ignore this case or throw
	                throw new Error("A promise can only be resolved once.");
    	        }		            
	        },
	        then: function (callback) {
	            if (pending) {
	                pending.push(callback);
	            } else {
	                callback(value);
	            }
	        }
	    }
	},
	//Step 4: We must keep POLA so separate promise from the resolver.
	// 
	//The disadvantage of separation, however, is the additional burden on the
	//garbage collector to quickly dispose of used promise objects.
	operation4 = function() {
  		var result = defer1();
	    setTimeout(function () {
	        result.resolve(1);
	    }, interval);
	    return result.promiseToResolveIt;
	},
	//Step 4
	defer1 = function() {
		var pending = [], value;
	    return {
	        resolve: function (_value) {
	        	var i = 0;
	        	if (pending) { //Prevents resolving the promise multiple times.
		            value = _value;
		            for (i; i < pending.length; i++) {
		                var callback = pending[i];
		                callback(value);
		            }
		            pending = undefined;
  				} else {
  					//We can just ignore this case or throw
	                throw new Error("A promise can only be resolved once.");
    	        }		            
	        },
			promiseToResolveIt: {
	            then: function (callback) {
	                if (pending) {
	                    pending.push(callback);
	                } else {
	                    callback(value);
	                }
	            }
			}
        }
	};

operation1({
	callback: postProcessOperation,
	errorback: errorHandler,
	forceFail: false
});


operation1({
	callback: postProcessOperation,
	errorback: errorHandler,
	forceFail: true
});

operation2().then(postProcessOperation);

var promiseToDoIt1 = operation3();
//promiseToDoIt1.resolve is exposed and we can call it here which is not good 
promiseToDoIt1.then(postProcessOperation);
promiseToDoIt1.then(postProcessOperation);

var promiseToDoIt2 = operation4();
promiseToDoIt2.then(postProcessOperation);

