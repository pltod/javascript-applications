/**
 * RESOURCES:
 *	
 *  http://effectivejs.com/
 *  http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/
 *	
 *
 *  Additional:	 
 *	    http://webreflection.blogspot.com/2010/10/javascript-coercion-demystified.html
 *	    http://qfox.nl/weblog/214
 * 
 * 
 * THEORY:
 * 
 * 
 */
define(["chai"], function(Chai) {
	var should = Chai.should(),
		expect = Chai.expect,
		assert = Chai.assert,
		Suite = {
			name: "Primitives, object wrappers, coercion, falsy and truthy values, conditionals, equal and strict equal, concatenation",
			tests: []
		};

	Suite.tests.push({
		name: "JS has 5 primitives. Be carefull with 'typeof null' which is object!",
		body: function() {
			
			var primitives = {
				primitive1: null,
				primitive2:  undefined,
				primitive3: 'value',
				primitive4: true,
				primitive5: 5
			};
			
			//It is kind of strange that the type of the primitive null is 'object'
			assert.equal(typeof primitives.primitive1, 'object');
			'object'.should.equal(typeof primitives.primitive1);
			
			//Even the library is not working nice with this one
			//The next line fails if uncommented
			//assert.typeOf(primitives.primitive1, 'object');
			
			assert.typeOf(primitives.primitive2, 'undefined');
			assert.typeOf(primitives.primitive3, 'string');
			assert.typeOf(primitives.primitive4, 'boolean');
			assert.typeOf(primitives.primitive5, 'number');
		}
	});

	Suite.tests.push({
		name: "JS primitives are compared by their values so two different variables could be equal if they contain the same value.",
		body: function() {
			
			var str1Primitive = 'value',
				str2Primitive = 'value';
			
			assert.equal(str1Primitive, str2Primitive);
			assert.strictEqual(str1Primitive, str2Primitive);						
		}
	});	

	Suite.tests.push({
		name: "JS has Object Type - Wrapper - for each primitive type." + 
			  "However variable from Object type is equal only to itself because JS compare references.",
		body: function() {
			
			var str1 = new String('value'),
				str2 = new String('value');
			
			//Object is equal only to itself.
			
			//==	
			assert.notEqual(str1, str2);
			
			//===		
			assert.notStrictEqual(str1, str2);
		}
	});

	Suite.tests.push({
		name: "JS is doing automatic type conversion (Coercion) when working with different types." +
				"In arithmetic operations with primitives JS converts the arguments to numbers with internal function toNumber()",
		body: function() {
			assert.equal('5' - 5, 0);
			assert.equal('5' * 5, 25);
			assert.equal('5' / 5, 1);
			assert.equal(5 + true, 6);
			assert.equal(5 + false, 5);
		}
	});		
	
	Suite.tests.push({
		name: "However + operation where strings are involved is overloaded." +
			"In this case JS is doing concatination so it converts (coerces) the arguments to strings.",
		body: function() {
			assert.notEqual('5' + 5, 10);
			assert.strictEqual('5' + 5, '55');
		}
	});
	
	Suite.tests.push({
		name: "Be careful with expressions where coercion is involved because expressions are evaluated from left to right and this reflect the final result.",
		body: function() {
			assert.strictEqual(5 + '5' + 5, '555');
			assert.strictEqual(5 + 5 + '5', '105');
		}
	});	

	Suite.tests.push({
		name: "Some coercions are error prone - null is coerced to 0 (or String when doing concatenation)",
		body: function() {
			//null is converted to 0 
			assert.equal(5 + null, 5);
			assert.equal('5' + null, '5null');
		}
	});	
	Suite.tests.push({
		name: "Some coercions are error prone - undefined is coerced to NaN (or String when doing concatenation)",
		body: function() {
			assert.strictEqual('5' + undefined, '5undefined');
			//Use isNaN function to check that something is NaN
			assert.strictEqual(isNaN(5 + undefined), true);
		}
	});
	
	Suite.tests.push({
		name: "JS do coercion when checking for equality according to ES Equal Algorithm." +
			"The internal toNumber and toPrimitive functions are used.",
		body: function() {
			var obj = {},
				obj1 = {valueOf: function() { return 1;}};
				
			assert.equal(null, undefined);
			assert.equal(undefined, null);
			
			//Number x == String y => x == toNumber(y)
			assert.equal(1, '1'); //toNumber('1') => 1
			assert.notEqual(1, 'test'); //toNumber('test') => NaN
			
			
			//Boolean x == Any y => toNumber(x) == y
			assert.equal(true, 1);
			assert.equal(true, obj1); //Because valueOf is prefered than toString()
			assert.notEqual(false, 1);
			
			//This one is tricky because NaN is not equal to anything including itself.
			//We have true == obj, 1 == obj, 1 == '[object Object]', 1 == NaN 
			assert.notEqual(true,obj);
			//We have false == obj, 0 == obj, 0 == '[object Object]', 0 == NaN
			assert.notEqual(false,obj);
			
			//String or Number x == Object y => x == toPrimitive(y)
			//toPrimitive uses toString or valueOf to convert objects
			//where valueOf is considered first
			assert.equal('[object Object]', obj);
			assert.equal(1, obj1);
			assert.equal('1', obj1);
		}
	});
	
	Suite.tests.push({
			name: "JS does not do coercion when checking for strict equality. ES Strict Equal Algorithm.",
			body: function() {
				var obj = {},
					obj1 = {};
					
				assert.notStrictEqual('1', 1);
				assert.notStrictEqual('1', 1);
				assert.strictEqual(undefined, undefined);
				assert.strictEqual(null, null);
				assert.notStrictEqual(undefined, null);
				assert.notStrictEqual(NaN, NaN);
				
				//Objects compared by reference
				assert.strictEqual(obj, obj);
				assert.notStrictEqual(obj, obj1);
			}
	});

	Suite.tests.push({
		name: "An Objects is coerced by JS with the help of toPrimitive() function." +
			"toPrimitive() calls valueOf() and then if it is missing it calls toString()",
		body: function() {
			
			var obj = {},
				obj1 = {
					valueOf: function() {
						return 5;
					}
				};

			//obj and Math has no valueOf() method
			assert.strictEqual('5' + obj, '5[object Object]');				
			assert.strictEqual('test' + Math, 'test[object Math]');
			assert.strictEqual('test' + Math, 'test' + Math.toString());

			// for obj1 JS uses valueOf()
			assert.strictEqual('5' + obj1, '55');
			
			//valueOf() is more relevant to be defined on objects that represent numbers and will be used for calculations
			assert.strictEqual(5 + obj1, 10);
			
			//toString returns String representation of an object. 
			//So object without valueOf() method cannot be used in aritmetic operations
			assert.strictEqual(isNaN(5 + obj), true);		
		}
	});		

	Suite.tests.push({
			name: "However for Date Object JS uses toString() first and then valueOf()",
			body: function() {
			
			var date1 = new Date("2000/01/01"),
				date2 = new Date("2000/01/01"),
				date3 = new Date("2000/01/01");
				
				date2.valueOf = function() {
						return "2000/01/01";
				};

				date3.toString = undefined;
				date3.valueOf = function() {
					return "2000/01/01";
				};
				
				//The default toString returns another string representation 
				assert.notEqual(date1, "2000/01/01");
				
				//toString is still used
				assert.notEqual(date2, "2000/01/01");
				
				//if toString is missing JS use valueOf
				assert.equal(date3, "2000/01/01");
			}
	});
			
	Suite.tests.push({
			name: "+ in front of variable can be used for explicit coercion",
			body: function() {
				var p = "5";
				
				assert.equal(p, 5);
				assert.notStrictEqual(p, 5);
				assert.strictEqual(+p, 5);
			}
	});
	
	Suite.tests.push({
		name: "NaN is never equal/strict equal to NaN. Use isNaN() to check that something is NaN. " +
        "However note that isNaN() function is misleading (it coerces the input parameter with toNumber) so it returns true 1) if something is NaN and 2) if something is not a Number",
		body: function() {
			assert.notStrictEqual(NaN, NaN);

			//But isNaN function is doing coercion of the input parameter to number (toNumber(input), which if input is not Number returns NaN) so it is misleading.
			assert.equal(isNaN("value"), true);
			assert.equal(isNaN(undefined), true);
			assert.equal(isNaN({}), true);
			assert.equal(isNaN({ valueOf: "value" }), true);
		}
	});
	
	Suite.tests.push({
		name: "JS has exactly 7 Falsy Values. JS uses internal toBoolean method to say if a value is falsy or not.",
		body: function() {
			/**
			 * JS is using ToBoolean to evaluate the expression in conditionals.
			 * Exactly 7 values are evaluated to false - http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/ 
			 */
			if (false || 0 || -0 || '' || undefined || null || NaN) {
				assert.equal(1, 2);
			}
		}
	});
	Suite.tests.push({
		name: "In if(Expression) {Statement}, JS coerces Expression with toBoolean." +
				"Do not use truthiness for parameter checking because Numbers (0) and Strings ('') can be falsy",
		body: function() {
			var f = function(a) {
					if (!a) {
						return true;
					} else {
						return false;
					}
				},
				correctF = function(b) {
					if (b === undefined) {
						return true;
					} else {
						return false;
					}
				};
				
			//a = 0 means input parameter is defined but 0 is falsy so !0 is true
			assert.equal(f(0), true);
			assert.equal(f(""), true);
			correctF(0, false);
			correctF("", false);
		}
	});
	
	Suite.tests.push({
		name: "Binary value of a number - use toString and parseInt for conversion.",
		body: function() {
			assert.equal((8).toString(2) , 1000);
			assert.equal(parseInt('1000', 2), 8);
		}
		
	});		

	Suite.tests.push({
		name: "Calculations with real numbers produce aproximate results. Better work with integers.",
		body: function() {
			assert.equal((0.1 + 0.2) + 0.3, 0.6000000000000001);
			assert.equal(0.1 + (0.2 + 0.3), 0.6);
		}
		
	});		
	
	return Suite;
});
