var GLOBAL_OBJECT = window;
var globalVar = 10; 
function globalFunc() {}
eval('var globalEval = 3;');

TestCase("Execution Context", {
	/**
	 * On slide Example 1. Demonstrates visibility across contexts.
	 */
	"test->EC Creation And Data Visibility" : function() {

		//This is context 1
		var identifier0 = 0;
		var identifier1 = 1;

		function funcContext() {

			//This is context 2
			var identifier2 = 2;
			var identifier0 = 3;

			assertEquals(identifier0, 3);
			assertEquals(identifier1, 1);
			assertEquals(identifier2, 2);

		};

		funcContext();

		assertEquals(identifier0, 0);
		assertEquals(identifier1, 1);

		//Type Error in IE why ?
		assertException(function() { identifier2;
		}, "ReferenceError");
	},
	/**
	 * Variable object = Global object in Global Scope
	 */
	"test->VO is GO in GC" : function() {
		assertEquals(10, GLOBAL_OBJECT.globalVar);
		assertTrue(globalVar === GLOBAL_OBJECT.globalVar);
		assertEquals("function", typeof GLOBAL_OBJECT.globalFunc);
		assertTrue(GLOBAL_OBJECT.globalFunc === globalFunc);
		assertEquals(3, GLOBAL_OBJECT.globalEval);
		assertTrue(globalEval === GLOBAL_OBJECT.globalEval);

	},	
	/**
	 * On slide Example 2. Demonstrates arguments property in Activation Object.
	 * Demonstrate the newer Chrome and Older Chrome Behaviour regarding not passed arguments.
	 * Works in older Chrome but not in newer Chrome and Firefox
	 */
	"test->AO arguments" : function() {

		function foo(x, y, z) {

			// quantity of defined function arguments (x, y, z)
			assertEquals(3, foo.length);

			// quantity of really passed arguments (only x, y)
			assertEquals(2, arguments.length);

			// reference of a function to itself
			assertEquals(arguments.callee, foo);

			// parameters sharing
			assertEquals(10, x);
			assertEquals(x, arguments[0]);
			arguments[0] = 20;
			assertEquals(20, x);

			assertUndefined(z);
			assertUndefined(arguments[2]);
			z = 40;
			arguments[2] = 50;

			assertEquals(50, arguments[2]);

			//In Older Versions of Chrome
			assertEquals(50, z);

			//In Newer Versions of Chrome and in FF and in IE
			//assertEquals(40, z);
		}

		foo(10, 20);
	}
});
