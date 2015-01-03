TestCase("Identifier Creation", {
	/**
	 * Variable declaration creates identifier
	 */
	"test->Variable Declaration" : function() {
		var a = 5;
		assertNotUndefined(a);
		assertEquals(a, 5);
		assertEquals(typeof a, "number");
	},
	/**
	 * Function declaration creates identifier
	 */
	"test->Function Declaration" : function() {
		function bar() {
			return 5;
		}
		assertNotUndefined(bar);
		assertEquals(bar(), 5);
		assertEquals(typeof bar, "function");
	},
	/**
	 * Formal parameter declaration creates identifier
	 */
	"test->Formal Parameters" : function() {
		function bar(x) {
			assertNotUndefined(x);
			return x;
		}
		function bar2(x) {
			assertUndefined(x);
			return x;
		}
		assertEquals(bar(5), 5);
		assertUndefined(bar2());
	}
});