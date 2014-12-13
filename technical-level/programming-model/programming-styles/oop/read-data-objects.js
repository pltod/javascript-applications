var test = require('tape');

test('### Read Data - Objects ###', function(t) {
  
  console.log('########################################');
 
  var objLiteral = {prop: 'a'};
  var arrayLiteral = ['1', '2', '3'];
  

  t.equal('a', objLiteral.prop, 'Property access with dot notation - object example');
  t.equal('a', objLiteral['prop'], 'Property access with bracket notation - object example');
  
  arrayLiteral.push('3');
  arrayLiteral['push']('4');
  
  t.equal('3', arrayLiteral[3], 'Property access with dot notation - array example');
  t.equal('4', arrayLiteral[4], 'Property access with dot notation - array example');
  
  var method = "push";
  arrayLiteral[method]('5');
  t.equal('5', arrayLiteral[5], 'Property access with bracket notation - variables can be used with bracket notation instead of plain strings');
  
  t.end();
  
});    