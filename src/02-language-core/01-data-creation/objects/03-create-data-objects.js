var test = require('tape');

test('### Create Data - Objects ###', function(t) {
  
  t.pass('##### Everything in JS is object');
  t.pass('In JS all complex data structures are eventually represented as Object Reference Type');

  t.pass('##### How to create objects?');
  
  t.pass('Variant 1: Literal notation')
  
  var objLiteral = {
    name: 'value',
    getName: function () {
      return this.name;
    }
  };
  var arrayLiteral = ['1', '2', '3'];
  var regExpLiteral = /\d+/g;
  
  function fn() {
      return 1;
  }
  t.ok(objLiteral instanceof Object, 'Object literal produces instances of Object Reference Type');
  t.ok(arrayLiteral instanceof Array, 'Array literal produces instances of Array Reference Type');
  t.ok(regExpLiteral instanceof RegExp, 'Literal form: RegExp literal produces instances of RegExp Reference Type');
  t.ok(fn instanceof Function, 'Function literal (function declaration) produces instances of Function Reference Type');

  t.equal(objLiteral.name, objLiteral.getName(), 'Objects are key value stores with properties and methods (functions) where methods could be getter/setters for the properties')



  t.pass('Variant 2: Object.create(prototype) available from ES5')
  
  var newObj = Object.create(objLiteral);
  t.pass(newObj.name, 'value', 'It is possible to create new objects based on existing objects that becomes their prototypes');


  t.pass('Variant 3: Custom Constructor Functions')

  function Person(name) {
    this.name = name,
    this.f1 = function () {
      //Do nothing
    }
  }
  
  Person.prototype.f2 = function () {
    //Do nothing
  }
  
  var p = new Person('test');
  var p1 = new Person('test1');
  t.equal(p.name, 'test', 'Object has been created with constructor function');
  t.notEqual(p.f1, p1.f1, 'each instance has copy of it');
  t.equal(p.f2, p1.f2, 'each instance could have shared methods via prototype - useful for saving memory');


  t.pass('Variant 4: Built-in Constructor Functions')  
  
  //TODO
  
  
  
  
  t.pass('##### typeof and Reference Types');	
    
  t.equal(typeof arrayLiteral, 'object', 'typeof does not give relevant information regarding Reference Types');
  t.equal(typeof fn, 'function', '...except for functions');
  t.ok(arrayLiteral instanceof Array, 'instanceof mitigate this problem since it works with inheritance and shows actual type');  
  t.ok(Array.isArray(arrayLiteral), 'even better alternative to instanceof is ES5 method isArray - instanceof could be misleading due to some browsers differences');




        
  t.pass('##### Autoboxing or why even primitives are objects');
  
  var name = 'NAME';

  t.pass('Autoboxing: Primitives have methods because JS wraps them with corresponding Wrapper objects that are later destroyed');  
  
  t.equal('name', name.toLowerCase(), 'Primitives of type string has toLowerCase');
  t.equal('N', name.charAt(0), 'Primitives of type string has charAt');
  t.equal('NA', name.substring(0, 2), 'Primitives of type string has substring');
  
  var number = 10;
  t.equal('a', number.toString(16), 'Primitives of type int has toString');
  
  var flag = true;
  t.equal('true', flag.toString(), 'Primitives of type boolean has method toString');

	t.pass('Binary value of a number can be calculate with the toString and parseInt functions');
	t.equal((8).toString(2), '1000', 'toString that takes the system could convert number into binary value');
	t.equal(parseInt('1000', 2), 8, 'binary value could be converted to decimal again with parseInt');

  t.pass('Autoboxing: Wrapper object is only created when the value is read and then destroyed.');
  t.notOk(name instanceof String, 'instanceof doesn’t actually read the value so the temporary object isn’t created in this case.')
  name.a = 'a';
  t.notOk(name.a, 'assigning properties to identifiers that point to primitives is not working because of the same reason')  

  t.pass('We could do manual boxing of primitive types');
	var str1 = new String('value');
	var str2 = new String('value');
	
	t.notEqual(str1, str2, 'But if we box the same values comparing their identifiers returns false because they holds object references in this case and that is what is compared');
  
  var valid = new Boolean('false');
  var executed = false;
  
  if (valid) {
      executed = true;
  }
  t.ok(executed, 'Implications when do manual boxing with Boolean Wrapper - wrapping false is not falsy value anymore since it becomes object');
  
  
  
  
  t.pass('##### NaN and objects');  
  
	t.equal(isNaN({}), true, 'Objects are NaN when checking with isNaN function');
  
  
  
  
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
  
  
  
  t.pass('##### Functions are objects too');
  
  //TODO
    
  
  
  t.end();
  
});    