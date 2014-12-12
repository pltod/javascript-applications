var debug = require('debug')('array-prototoype')
var test = require('tape');


test('### slice in general ###', function(t) {
  var items = ['One', 'Two'];
  var result = items.slice(0, 1);
  t.equal(1, result.length, 'slice can be invoked with begin and end index for taking data out of array');
  t.equal('One', result[0], 'the taken element is the correct one');
  t.end();
});

test('### slice for converting array-like object - arguments - into pure array ###', function(t) {
  function list() {
    return Array.prototype.slice.call(arguments, 0);
  }
  t.deepEqual(list(1, 2, 3), [1, 2, 3], 'calling slice with arguments as "this" and 0 as begin index returns all argument in array');
  t.end();
});

test('### splice ###', function(t) {

  var items = ['one', 'two', 'three'];
  var result = items.splice(1, 0, 'one and a half');
  t.deepEqual(['one', 'one and a half', 'two', 'three'], items, 'we can add elements with splice')
  t.deepEqual([], result, 'nothing is removed in this case')
  
  result = items.splice(0, 1);
  t.deepEqual(['one and a half', 'two', 'three'], items, 'we can remove elements with splice');  
  t.deepEqual(['one'], result, 'we have access to removed element');
  
  result = items.splice(0, 1, 'one seventy five');
  t.deepEqual(['one seventy five', 'two', 'three'], items, 'we can remove and add elements with splice in the same time');  
  t.deepEqual(['one and a half'], result, 'we have access to removed element');

  result = items.splice(-1, 1);
  t.deepEqual(['one seventy five', 'two'], items, 'we can remove elements with negative index starting backwards');
  t.deepEqual(['three'], result, 'we have access to removed element');
    
  t.end();
});

test('### reverse ###', function(t) {

  var items = ['one', 'two', 'three'];
  items.reverse(); 
  t.deepEqual(['three', 'two', 'one'], items, 'the order of items is reversed with reverse method')  
  
  t.end();
});

test('### join ###', function(t) {

  var items = ['one', 'two', 'three'];
  var s = items.join(';');
  t.equal(s, 'one;two;three', 'join converts array to string concatenating all the items with the specified separator');
  
  t.end();
});

