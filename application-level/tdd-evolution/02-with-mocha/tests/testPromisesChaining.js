/*
The next big step is making it easy to compose promises, to make new promises
using values obtained from old promises.  Supposing that you have received
promises for two numbers from a couple function calls, we would like to be
able to create a promise for their sum.  Consider how this is achieved with
callbacks.

Cons:
	- We must watch whether a callback has been called
	- One must also take care to account for cases where callbacks are issued before the end of the event loop turn: the `consider` function must appear before it is used.
*/
var oneOneSecondLater = function (callback) {
	    setTimeout(function () {
	        callback(1);
	    }, 1000);
	},

	twoOneSecondLater = function (callback) {
	    var a, b,
	    	
	    	consider = function () {
	        
		        if (a === undefined || b === undefined) {
		            return;
		        }
		        callback(a + b);
		    };
	
	    oneOneSecondLater(function (_a) {
	        a = _a;
	        consider();
	    });
	    
	    oneOneSecondLater(function (_b) {
	        b = _b;
	        consider();
	    });
	},

/*
In a few more steps, we will be able to accomplish this using promises in less
code and handling error propagation implicitly.
We need:
	- The "then" method must return a promise.
	- The returned promise must be eventually resolved with the return value of the callback.
	- The return value of the callback must be either a fulfilled value or a promise.
	
	With other words for the promise is true the following:
	- The "then" method must return a promise
	- The "then" method callback must return
		-- the resolved value or
		-- another promise (with the same rules for it)  
*/
	//a = oneOneSecondLater(), //a is a promise
	//b = oneOneSecondLater(), //b is a promise
	//c = a.then(function (a) { //c is a promise that is resolved 1) either by 'then' callback or 2) if the callback return promise resolved by its 'then' callback    
	//			    return b.then(
	//			    	function (b) {
	//			        	return a + b;
	//			    	}
	//			    );
	//			}
	//),
/*	
 This is a promise that immediately informs any observers that the value has already been fulfilled.
*/
	ref1 = function (value) {
		    return {
		        then: function (callback) {
		            callback(value);
		        }
		    };
	},
	ref2 = function (value) {
		
		//Coerce the argument into a promise regardless of whether it is a value or a promise already.
	    if (value && typeof value.then === "function") {
	        return value;
		}
	    return {
	        then: function (callback) {
	            callback(value);
	        }
	    };
	},
	ref3 = function (value) {
		
	    if (value && typeof value.then === "function") {
	        return value;
		}
	    return {
	        then: function (callback) {
	        	//Now, we need to start altering our "then" methods so that they return promises for the return value of their given callback.
	        	// Here there is a recursion but it is OK because it will be invoked on a future loop 
	            ref3(callback(value)); 
	        }
	    };
	},
	//Chainable version of defer1 from Step 4.
	//The implementation at this point uses "thenable" promises and separates the "promise" and "resolve" components of a "deferred".
	defer2 = function() {
		var pending = [], value;
	    return {
	       		resolve: function (_value) {
		        	var i = 0;
		        	if (pending) { //Prevents resolving the promise multiple times.
			            
			            //value = _value;
			            value = ref3(_value); // values wrapped in a promise
			            
			            for (i; i < pending.length; i++) {
			                var callback = pending[i];
			                value.then(callback(value));
			            }
			            pending = undefined;
	  				} else {
	  					//We can just ignore this case or throw
		                throw new Error("A promise can only be resolved once.");
	    	        }
		        },
				promiseToResolveIt: {
		            then: function (_callback) {
		            	var result = defer2();
							
		      			// callback is wrapped so that its return value is captured and used to resolve the promise that "then" returns
		                var callback = function (value) {
		                    result.resolve(_callback(value));
		                };
		                if (pending) {
		                    pending.push(callback);
		                } else {
		                    value.then(callback);
		                }
		                return result.promiseToResolveIt
					}
        		}
		};
	};
	
		


twoOneSecondLater(function (c) {
    console.log(c === 2);
});



//TODO Verify how to use this one
var ad = defer2(); 		
var a = ad.promiseToResolveIt;

var bd = defer2();
var b = bd.promiseToResolveIt;

ad.resolve(1);
bd.resolve(1);


var c = a.then(function (a) {    
				    return b.then(
						function (b) {
							console.log(a+b);
							return a + b;
						}
				    );
				}
			);