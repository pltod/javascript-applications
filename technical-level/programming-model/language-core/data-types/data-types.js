var test = require('tape');

test('### Create Data With Primitives ###', function(t) {
  
  t.pass('##### Primitive Types');
  t.pass('JS program can use 5 primitive data types which is not specified explicitely by the programmer (dynamic language)');
    
  
	t.equal(typeof 5, 'number', 'number');
	t.equal(typeof 'dog', 'string', 'string');  
	t.equal(typeof true, 'boolean', 'boolean');  
	t.equal(typeof undefined, 'undefined', 'undefined');
	t.equal(typeof null, 'object', 'null');

  t.pass('##### Operator typeof');	
  t.pass('typeof operator returns the corresponding type of the primitive');
  t.pass('exception is null. null is created to denote empty object that is why typeof null is object');

  t.pass('##### Coercion');
  t.pass('Coercion - automatic type conversion when doing operations with different types of the operands');
  t.pass('In arithmetic operations with primitives JS converts the arguments to numbers with internal function toNumber');
        
	t.equal('5' - 5, 0, 'string converted to number in substraction');
	t.equal('5' * 5, 25, 'string converted to number in multiplication');
	t.equal('5' / 5, 1, 'string converted to number in division');
	t.equal(5 + true, 6, 'boolean converted to number in addition');
	t.equal(5 + false, 5, 'boolean converted to number in substraction');

  t.pass('Coercions of null and undefined are error prone:')
	t.equal(5 + null, 5, 'null is coerced to 0');
	t.equal(isNaN(5 + undefined), true, 'undefined is coerced to NaN');
  

  t.pass('Addition operation where strings are involved is overloaded. Non string operands are converted to string');
  
  t.equal('5' + 5, '55', 'number is converted to string in addition with strings');
	t.equal('5' + null, '5null', 'or null is coerced to string');
	t.equal('5' + undefined, '5undefined', 'undefined is coerced to string in case of concatenation with another string');
  
	t.equal(5 + '5' + 5, '555', 'Expressions are evaluated from left to right and this reflect the final result when coercion involved.');
	t.equal(5 + 5 + '5', '105', '5 + 5 + "5" = "105" where 5 + "5" + 5 = "555"');
  

  t.pass('##### Comparison');
  t.pass('JS is using toBoolean to evaluate the expression in conditionals');
  t.pass('Exactly 7 values are evaluated to false');

  t.notOk(false, 'false');
  t.notOk(0, '0');
  t.notOk(-0, '-0');
  t.notOk('', 'empty string');
  t.notOk(undefined, 'undefined');
  t.notOk(null, 'null');
  t.notOk(NaN, 'NaN');

  t.equal('dog', 'dog', 'JS primitives are compared by their values so two different variables could be equal if they contain the same value.');

    
  t.pass('##### Coercion and Comparison');

  t.pass('ES Equal Algorithm is applied for == operator. It uses coercion using the internal toNumber function');
	t.ok(null == undefined, 'null is equal to undefined');
	t.ok(undefined == null, 'and undefined is equal to null');
  	
	t.pass('Case: Number x == String y => x == toNumber(y)');
	t.ok(1 == '1', 'so 1 is equal to "1" because toNumber("1") => 1');
	t.notOk(1 == 'test', '1 is not equal to "test" because toNumber("test") => NaN');
	
	t.pass('Case: Boolean x == Any Type y => toNumber(x) == y');
	t.ok(true == 1, 'true is equal 1 because toNumber(true) => 1');
	t.notOk(false == 1, 'false is not equal 1 because toNumber(false) => 0');

  t.pass('ES Strict Equal Algorithm is applied for === operator. It does not use coercion');
		
	t.notEqual('1', 1);
	t.equal(undefined, undefined, 'undefined is strict equal undefined');
	t.equal(null, null, 'null is strict equal null');
	t.notEqual(undefined, null, 'undefined is not strict equal null');
  
	t.ok('7' == 7);
	t.notEqual('7', 7);
  t.pass('+ in front of variable can be used for explicit coercion in this case string is coerced to number because of addition operation and then number === number is ok as long as they have the same values');
  t.equal(+'7', 7);
  
  t.pass('##### The NaN Case');
	t.notOk(NaN == NaN, 'NaN is not equal to NaN');
	t.notEqual(NaN, NaN, 'NaN is not strict equal to NaN');
  t.ok(isNaN(NaN), 'Check for NaN with isNaN function')

	t.pass('Although isNaN function is doing coercion of the input parameter to number');
  t.pass('Which means that: ');
	t.equal(isNaN("value"), true, 'isNaN returns NaN for strings');
	t.equal(isNaN(undefined), true, 'isNaN returns NaN for undefined');
  t.pass('So we cannot be sure is this a real NaN that we are checking for :)');

  t.pass('##### Comparison with if statements');
  t.pass('In if(Expression) {Statement}, JS coerces Expression with toBoolean.');
  t.pass('If we want to check for null or undefined...');  
	if (!0) {
		t.pass('...using !variable is not ok because 0 and empty string are falsy');
  	t.pass('and we will execute the true case with 0 and empty string which could be wrong');  
	} else {
  	t.pass('This line is never executed!');  
	}    
  
  t.pass('##### Calculation with real numbers');  
	t.equal((0.1 + 0.2) + 0.3, 0.6000000000000001, 'Calculations with real numbers produce aproximate results.');
	t.equal(0.1 + (0.2 + 0.3), 0.6, '...so better work with integers.');
  

    
  t.end();
  
});  