var debug = require('debug')('data-creation');
var test = require('tape');

GLOBAL_VAR1 = 1;
GLOBAL_VAR2 = {};
GLOBAL_FUNC = function globalFunc() {};

test('### Global Environment has Environment Record (ES3: Global Scope has Global Object) === this/global ###', function(t) {

	debug("Note that global.GLOBAL_VAR1 is not defined directly");
	t.equal(1, GLOBAL_VAR1);
	t.strictEqual(GLOBAL_VAR1, global.GLOBAL_VAR1, 'var is omitted and the value is set as property to global');

  debug("Note that global.GLOBAL_VAR2 is not defined directly");
	t.strictEqual(GLOBAL_VAR2, global.GLOBAL_VAR2, 'var is omitted and the value is set as property to global');
	
	debug("Note that global.GLOBAL_FUNC is not defined directly");
	t.strictEqual(GLOBAL_FUNC, global.GLOBAL_FUNC, 'var is omitted and the value is set as property to global');

  t.end();
  
});  
