

test('### Autoboxing - creating Wrapper type automatically to provide methods to primitives. ###', function(t) {
  var name = "name";
  assert.equal('n', name.charAt(0));

  //When calling charAt JS engine is doing the following:
  var name1 = "name";
  var temp = new String(name1);
  var firstChar = temp.charAt(0);
  temp = null;
  assert.equal('n', firstChar);

  t.end();

});

test('### Autoboxing does not make instanceof operator work on primitives ###', function(t) {
  var name = "name";
  var count = 10;
  var found = false;

  // Temporary object is only created when the value is read.
  // Since instanceof doesn’t actually read the value, the temporary object isn’t created
  // So instanceof correctly identifies the values as not being instances of primitive wrapper types.
  assert.isFalse(name instanceof String);
  assert.isFalse(count instanceof Number);
  assert.isFalse(found instanceof Boolean);

  t.end();

});

      
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




