// Test suite is based on https://egghead.io/lessons/javascript-javascript-regular-expressions-introduction
// The source code is at https://github.com/joemaddalone/egghead-regular-expressions

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

test('### Using quantifiers - greedy quantifier ###', function(t) {
  var str = "one two three";
  var regexp = /.+/g;
  t.deepEqual(["one two three"], str.match(regexp), 'greedy quantifier');
  t.end();
});

test('### Character class and ranges ###', function(t) {
  var str = "cat math fat ?at Math";
  var regexp = /[cm]at/g;
  var regexp5 = /[mc]at/g;
  var regexp1 = /[^cm]at/g;
  var regexp2 = /[a-z]at/g;
  var regexp3 = /[a-zA-Z]at/g; //digit range 0-9
  var regexp4 = /[?]at/g;
  t.deepEqual(["cat", "mat"], str.match(regexp), 'character class specifies symbols that can be combined with the pattern');
  t.deepEqual(["cat", "mat"], str.match(regexp5), 'the order of the symbols in character class is not important');
  t.deepEqual(["fat", "?at", "Mat"], str.match(regexp1), 'negated charcter class with ^');
  t.deepEqual(["cat", "mat", "fat"], str.match(regexp2), 'we can specify ranges');
  t.deepEqual(["cat", "mat", "fat", "Mat"], str.match(regexp3), 'and union of ranges');
  t.deepEqual(["?at"], str.match(regexp4), 'special symbols not excaped in character class');
  t.end();
});

test('### Shorthands for common sets ###', function(t) {
  var str = "one 1";
  var regexp = /\w/g;
  var regexp1 = /\d/g;
  var regexp2 = /\s/g;
  var regexp3 = /\S/g;
  var regexp4 = /[^\s]/g;
  t.deepEqual(["o", "n", "e", "1"], str.match(regexp), 'w is for alfanumeric');
  t.deepEqual(["1"], str.match(regexp1), 'd is for digits');
  t.deepEqual([" "], str.match(regexp2), 's is for whitespace');
  t.deepEqual(["o", "n", "e", "1"], str.match(regexp3), 'negation with capital letter');
  t.deepEqual(["o", "n", "e", "1"], str.match(regexp4), 'or negation with characrter class starting with caret');
  t.end();
});

test('### Capturing groups to find groups of characters ###', function(t) {
  var str = "foobar foobuz foo footest";
  var regexp = /foo(bar)/g;
  var regexp1 = /foo(bar|buz)/g;
  var regexp2 = /foo(bar|buz)?/g;
  t.deepEqual(["foobar"], str.match(regexp), 'capturing group to find group of characters');
  t.deepEqual(["foobar", "foobuz"], str.match(regexp1), 'with | symbol several groups could be specified');
  t.deepEqual(["foobar", "foobuz", "foo", "foo"], str.match(regexp2), 'quontifiers together with capturing group');
  t.end();
});

test('### Capturing groups and references useful for string replacement ###', function(t) {
  var str = "test foobar";
  var regexp = /foo(bar)/g;
  var regexp1 = /foo(?:bar)/g;
  t.equal("test bar", str.replace(regexp, '$1'), 'the match is replaced by the capturing group item value referenced with $1');
  t.equal("test $1", str.replace(regexp1, '$1'), 'opt out for creating $ references in capturing group with ?: symbol');
  t.end();
});

test('### Look Ahead ###', function(t) {
  var str = "foobuz foobar";
  var regexp = /foo(?=bar)/g;
  var regexp1 = /foo(?!bar)/g;
  t.deepEqual(["foo"], str.match(regexp), 'Look ahead for matching what has to be after the pattern');
  t.deepEqual(["foo"], str.match(regexp1), 'Look ahead for matching what has not to be after the pattern');
  t.end();
});

test('### Matching whole words ###', function(t) {
  var str = "This history is his";
  var regexp = /\bis\b/g; //start/ends with is
  var regexp1 = /is\b/g; //end with is
  var regexp2 = /\Bis/g; //is not the beginning
  t.deepEqual(["is"], str.match(regexp), 'match the whole word');
  t.deepEqual(["is", "is", "is"], str.match(regexp1), 'match the word that begins with something');
  t.deepEqual(["is", "is", "is"], str.match(regexp2), 'match words that does not begin with something');
  t.end();
});

test('### Back References ###', function(t) {
  //TODO
  //
  t.end();
});

test('### Line Anchor ###', function(t) {
  //TODO
  // ^ and $ for marking the begin and end of a line
  t.end();
});
