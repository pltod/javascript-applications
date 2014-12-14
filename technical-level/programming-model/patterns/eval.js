This is actually an antipattern. Do not use eval.

# Eval


ITEM: Example that show that Eval creates EC, practice hoisting but in the same time sets identifiers to calling EC’s VO.

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
		function x() {};
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
	}



