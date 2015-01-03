/**
 * Understand the module pattern and IIEF from:
 * 	http://benalman.com/news/2010/11/immediately-invoked-function-expression/
 *  http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 */
TestCase("Module Pattern", {

	/**
	 * 1. We can not execute function declaration immediatelly since it is a statement not expression
	 * 2. We can execute function expressions immediatelly without parens but read it is not obvious.
	 * Read this: "As a rule of thumb, while writing unambiguous code might be technically necessary to keep the JavaScript parser from throwing SyntaxError exceptions, writing unambiguous code is also fairly necessary to keep other developers from throwing “WTFError” exceptions at you!"
	 */
	"test->IIFE" : function() {
		//function foo(){ /* code */ }(); // SyntaxError: Unexpected token )

		//Works but not user friendly :).
		var i = function() {
			return 10;
		}();
		assertEquals(10, i);

		//So use parens as convention
		var p = (function() {
			return 10;
		})();
		assertEquals(10, p);

		//And finally the IIFE pattern
		//Immediatelly invoked FE is more correct and not that misleading like self-invoked FE
		var iife1, iife2; ( function() {
			iife1 = "iife1";
		}());
		// Crockford recommends this one
		(function() {
			iife2 = "iife2";
		})();
		// But this one works just as well

		assertEquals(iife1, "iife1");
		assertEquals(iife2, "iife2");
	},
	/**
	 * From:  http://benalman.com/news/2010/11/immediately-invoked-function-expression/
	 * 
	 * The Module Pattern approach is not only incredibly powerful, but incredibly simple. With very little code, 
	 * you can effectively namespace related methods and properties, organizing entire modules of code in a way 
	 * that both minimizes global scope pollution and creates privacy.
	 */
	"test->IIFE for making Modules" : function() {
		// Create an anonymous function expression that gets invoked immediately,
		// and assign its *return value* to a variable. This approach "cuts out the
		// middleman" of the named `makeWhatever` function reference.
		//
		// As explained in the above "important note," even though parens are not
		// required around this function expression, they should still be used as a
		// matter of convention to help clarify that the variable is being set to
		// the function's *result* and not the function itself.

		var counter = ( function() {
			var i = 0;

			return {
				get : function() {
					return i;
				},
				set : function(val) {
					i = val;
				},
				increment : function() {
					return ++i;
				}
			};
		})();

		// `counter` is an object with properties, which in this case happen to be
		// methods.

		assertEquals(counter.get(), 0);
		counter.set(3);
		assertEquals(counter.increment(), 4);
		assertEquals(counter.increment(), 5);

		// undefined (`i` is not a property of the returned object)
		assertUndefined(counter.i);
		// ReferenceError: i is not defined (it only exists inside the closure)
		assertException(function() { i; }, "ReferenceError");

	}
});
