var globalTestFC = 10;
TestCase("Testing Function Declarations and Expressions", {
	"test->Simple FD FE Difference" : function() {

		assertEquals( typeof foo, 'function');
		assertEquals( typeof bar, 'undefined');

		function foo() {
		}

		var bar = function bar() {
		};
	},
	/*
	 * Override Variable Declaration
	 */
	"test->Override Variable Declaration" : function() {
		assertUndefined(p);
		var p = 5;
		assertNotUndefined(p);
		assertEquals(5, p);
		var p = 6;
		assertNotUndefined(p);
		assertEquals(6, p);
	},
	/*
	 * Override Function Declaration
	 */
	"test->Override Function Declaration" : function() {

		function foo() {

			function bar() {
				return 3;
			}

			return bar();

			function bar() {
				return 8;
			}

		}

		assertEquals(8, foo());
	},
	/**
	 * Do not be distracted from the function expressions here. These are actually variable declarations nothing more.
	 * Variable Declarations Are Defined At Runtime.
	 */
	"test->Override Variable Declaration That Holds Function Expression" : function() {

		function foo() {
			var bar = function() {
				return 3;
			};
			return bar();
			var bar = function() {
				return 8;
			};
		}

		assertEquals(3, foo());
	},
	/**
	 * Function Declaration Are Defined During Context Creation
	 */
	"test->Function Declaration Are Defined During Context Creation" : function() {
		assertEquals(3, foo());
		function foo() {
			var bar = function() {
				return 3;
			};
			return bar();
			var bar = function() {
				return 8;
			};
		}

	},
	/**
	 * Variable Declarations Are Not Defined Until Runtime
	 */
	"test->Variable Declarations Are Not Defined Until Runtime" : function() {
		assertException(function foo() {
			return bar();
			var bar = function() {
				return 3;
			};
			var bar = function() {
				return 8;
			};
		}, "TypeError");
	},
	/**
	 * EC Creation x gets function value and then during runtime it gets int value.
	 */
	"test->Function Declaration Override Variable Declaration" : function() {
		assertEquals("function", typeof x);

		var x = 10;
		assertEquals(10, x);
		x = 20;

		function x() {
		};

		assertEquals(20, x);
	},
	/**
	 * This test works in IE which is not correct.
	 * Use only var test = function test() {}; or anonymous functions.
	 */
	"test->Named Function Expression" : function() {
		var test = function test1() {
			//Identifier for the FE is valid only here in the EC created by the FE itself
			assertNotUndefined(test1);
		};
		assertNotUndefined(test);
		assertException(function() { test1;
		}, "ReferenceError");
		//Work like this in IE which is a BUG
		//IE leaks out improper identifier
		//assertNotUndefined(test1);
		test();
	},
	/**
	 * Function statements works in Firefox but does not work in Chrome and IE.
	 * FS = FD in conditional blocks
	 */
	"test->Function Statements" : function() {
		// funcStat identifier is created but during context creation funcStat identifier remains undefined
		assertEquals( typeof funcStat, "undefined");

		if(true) {
			// once block is entered, `funcStat` identifier is associated with a function
			function funcStat() {
				return 1;
			}

		} else {
			//Never enters here!
		}

		//funcStat identifier created by FS is valid in the parent context
		assertEquals( typeof funcStat, "function");
	},
	/**
	 * Eval sets identifiers to VO of the calling context
	 */
	"test->Eval Function VS. Normal Function Contexts" : function() {
		var y = 100;
		function f() {
			var y = 10;
			assertEquals(10, y);
		}

		f();
		assertEquals(100, y);

		assertEquals('function', typeof eval)
		var x = 100;
		eval('var x = 10; assertEquals(10, x)');
		assertEquals(10, x);
	},
	/**
	 * Eval creates its own context.
	 * Hoisting happens in eval statements.
	 * Eval sets identifiers to VO of the calling context.
	 */
	"test->Eval and Hoisting" : function() {

		assertEquals("function", typeof x);
		var x = 10;
		assertEquals(10, x);
		x = 20;
		function x() {
		};

		assertEquals(20, x);

		/**
		 * If we call this second time it will not work
		 */
		/*
		assertEquals("function", typeof x);
		var x = 10;
		assertEquals(10, x);
		x = 20;
		function x() {};
		assertEquals(20, x);
		*/

		//But with eval it works because we have a new context creation
		eval('assertEquals("function", typeof x);var x = 10;assertEquals(10, x);x = 20;function x() {};assertEquals(20,x)');
	},
	"test->Function Constructor" : function() {
		var globalTestFC = 20;
		var y = 30;
		var bar = new Function('assertEquals(10, globalTestFC); assertException(function() { y;}, "ReferenceError");');
		bar();
	}

});
