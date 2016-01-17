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

test('### Any symbol followed by a pattern - . meta character ###', function(t) {
  var str = "Matching patterns in a string";
  var regexp = /.in/g;
  t.deepEqual(['hin', ' in', 'rin'], str.match(regexp), 'we get everything before the pattern');
  t.end();
});

test('### . meta character and new line character ###', function(t) {
  var str = "Matching patterns \nin a string";
  var regexp = /.in/g;
  t.deepEqual(['hin', 'rin'], str.match(regexp), '. meta character does not match the new line symbol');
  t.end();
});

test('### . meta characters must be escaped to be found ###', function(t) {
  var str = "Matching patterns in a string.";
  var regexp = /\./;
  t.ok(regexp.test(str), '...and we have found a meta character');
  t.end();
});

test('### Using quantifiers ###', function(t) {
  var str = "aaaaaaaaaa";
  var regexp = /a{5}/g;
  var regexp1 = /a{5,}/g;
  var regexp2 = /a{5,9}/g;
  t.equal(5, regexp.exec(str)[0].length, 'finds exact number of occurences');
  t.equal(10, regexp1.exec(str)[0].length, 'finds at least the specified number of occurences');
  t.equal(9, regexp2.exec(str)[0].length, 'finds min and max number of occurences');
  t.end();
});

test('### Using quantifiers - + = {1,} ###', function(t) {
  var str = "aaaaaaaaaa";
  var regexp = /a+/g;
  t.equal(10, regexp.exec(str)[0].length, '+ sign is 1 to infinity');
  t.end();
});

test('### Using quantifiers - * = {0,} ###', function(t) {
  var str = "aaaaaaaaaa";
  var regexp = /b*/g;
  t.equal("", regexp.exec(str)[0], 'returns empty string when optional but missing');
  t.end();
});

test('### Using quantifiers - ? = {0,1} ###', function(t) {
  var str = "aaaaaaaaaa";
  var regexp = /a?/g;
  var regexp1 = /b?/g;
  t.equal(1, regexp.exec(str)[0].length, 'returns string with length 1 when found');
  t.equal("", regexp1.exec(str)[0], 'returns empty string when missing');
  t.end();
});
