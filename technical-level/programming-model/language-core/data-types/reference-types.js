t.pass('Some identifiers hold data that is more complex.');
t.pass('JS use Reference Types for complex data.');
t.pass('In this case identifiers are associated with reference (memory address) where actual data is stored');


t.pass('Example for Reference Type is Function');
t.equal(typeof f1, "function",  'typeof operator return that this Reference Type is function');  


      
t.pass('##### Everything in JS is object');
t.pass('In JS all complex data structures are eventually represented as Object Reference Type');

t.pass('##### How to create objects?');


var objLiteral = {
  name: 'value',
  getName: function () {
    return this.name;
  }
};
t.ok(objLiteral instanceof Object, 'Object literal produces instances of Object Reference Type');


var arrayLiteral = ['1', '2', '3'];
var regExpLiteral = /\d+/g;

function fn() {
    return 1;
}

t.ok(arrayLiteral instanceof Array, 'Array literal produces instances of Array Reference Type');
t.ok(regExpLiteral instanceof RegExp, 'Literal form: RegExp literal produces instances of RegExp Reference Type');
t.ok(fn instanceof Function, 'Function literal (function declaration) produces instances of Function Reference Type');
