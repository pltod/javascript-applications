//Test suite is based on https://egghead.io/lessons/javascript-javascript-regular-expressions-introduction

var debug = require('debug')('regular-expressions');
var test = require('tape');

test('### RE with constructor function ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = new RegExp("in");
  var regexp1 = new RegExp("out");

  t.equal(true, regexp.test(str), '"in" is found in the string');
  t.equal(false, regexp1.test(str), '"out" is found in the string');
  t.end();
});

test('### RE with literal ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = /in/;
  var regexp1 = /out/;

  t.equal(true, regexp.test(str), '"in" is found in the string');
  t.equal(false, regexp1.test(str), '"out" is found in the string');
  t.end();
});

test('### RE with verbose output - exec ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = /in/;

  t.ok(regexp.exec(str).index, 'we have the index of the pattern');
  t.ok(regexp.exec(str).input, 'we have the input string where we search in');
  t.end();
});

test('### RE are state aware with g ###', function(t) {
  var str = "Matching patterns in a strIng";
  var regexp = /in/g;
  var state1 = regexp.exec(str);
  var state2 = regexp.exec(str);
  var state4 = regexp.exec(str);
  var state5 = regexp.exec(str);
  t.equal(5, state1.index, 'first found item is with index: ' + state1.index);
  t.equal(18, state2.index, 'then we continue searching the rest of the string and found item at index: ' + state2.index);
  t.notOk(state4, 'then we reach the end - no more items found');
  t.equal(5, state5.index, 'and finally we start again from the beginning and find item with index: ' + state1.index);
  t.end();
});

test('### RE ignore case sensitivity with i ###', function(t) {
  var str = "Matching patterns in a strIng";
  var regexp = /in/gi;
  var state1 = regexp.exec(str);
  var state2 = regexp.exec(str);
  var state3 = regexp.exec(str);
  var state4 = regexp.exec(str);
  var state5 = regexp.exec(str);
  t.equal(5, state1.index, 'first found item is with index: ' + state1.index);
  t.equal(18, state2.index, 'then we continue searching the rest of the string and found item at index: ' + state2.index);
  t.equal(26, state3.index, 'then we continue searching the rest of the string and found item at index: ' + state3.index);
  t.notOk(state4, 'then we reach the end - no more items found');
  t.equal(5, state5.index, 'and finally we start again from the beginning and find item with index: ' + state1.index);
  t.end();
});

test('### RE with String.match ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = /in/g;
  t.deepEqual(['in', 'in', 'in'], str.match(regexp), 'we get the found values in array');
  t.end();
});

test('### RE with String.replace ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = /in/g;
  t.equal("MatchINg patterns IN a strINg", str.replace(regexp, function() {return 'IN'}), 'replace the found items with something specified in callback function');
  t.end();
});

test('### RE with String.search ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = /in/g;
  t.equal(5, str.search(regexp), 'search will give us the index of the first found item');
  t.end();
});
