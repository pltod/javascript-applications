t.pass('##### Coercion when comparing with objects');  

var obj = {};
var obj1 = {valueOf: function() { return 1;}};
var obj2 = {valueOf: function() { return 1;}};

t.pass('In case of == ES Equal Algorithm is used');
t.pass('String or Number x == Object y => x == toPrimitive(y) toPrimitive uses toString or valueOf to convert objects where valueOf is considered first');
t.ok('[object Object]' == obj, 'the default toPrimitive behaviour is to return [object Object] via toString....valueOf is missing');
t.ok(1 == obj1, 'if valueOf is present we get its value during object comparison');
t.ok('1' == obj1, 'further type conversion is applied when valueOf return number and it is compared to string. JS applies the rule Number x == String y => x == toNumber(y)');
t.ok(true == obj1, 'again remember that valueOf is prefered than toString() and then JS applies Boolean x == Any y => toNumber(x) == y');
t.notOk(true == obj, 'true == obj, 1 == obj, 1 == "[object Object]", 1 == NaN');
t.notEqual(obj1, obj2, 'Objects are compared by reference');

t.pass('toPrimitive and valueOf in action');  
t.equal('5' + obj, '5[object Object]', 'string representation of object is concatenated to the string operand');				
t.equal('test' + Math, 'test[object Math]', 'Math object has no valueOf method so [object Math] returned by toString is used in concatenation');
t.equal('5' + obj1, '51', 'valueOf returns 1 which is later coerced to string');
t.strictEqual(5 + obj1, 6, 'valueOf() is more relevant to be defined on objects that represent numbers and will be used for calculations');
t.equal(isNaN(5 + obj), true, 'object without valueOf() method cannot be used in aritmetic operations');
  
t.pass('However for Date Object JS uses toString() first and then valueOf()');

var date1 = new Date("2000/01/01");
var date2 = new Date("2000/01/01");
var date3 = new Date("2000/01/01");
	
date2.valueOf = function() {
	return "2000/01/01";
};

date3.toString = undefined;
date3.valueOf = function() {
	return "2000/01/01";
};

t.notOk(date1 == "2000/01/01", 'The default toString returns another string representation');
t.notOk(date2 == "2000/01/01", 'Although having valueOf toString is still used');
t.ok(date3 == "2000/01/01", 'if toString is missing JS use valueOf');
