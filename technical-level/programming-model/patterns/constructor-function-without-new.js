var debug = require('debug')('constructor-function-without-new');
var test = require('tape');

test('### Constructor Function Without New ###', function(t) {

  function Person(name) {
    if (!(this instanceof Person)) return new Person(name);
      
    this.name = name;
  }
      
  var p = Person('test');
  
  t.equal('test', p.name, 'using this pattern we can invoke constructor function without new');
  t.end();

});
