var debug = require('debug')('classical inheritance');
var test = require('tape');

test('### Classical inheritance achieved with Function.call() and Object.create() ###', function(t) {

  debug('Define parent class Product');
  function Product(name) {
    t.equal(name, 'pasta', 'Parent constructor is invoked with call')
    this.name = name;
  }
  
  debug('Define method reused across instances of this class');  
  Product.prototype.test = function () {
    debug('invoking test');
  }

  debug('Define child class Food');  
  function Food(name) {
    Product.call(this, name);
    this.category = "food"
  }

  debug("Use Object.create to assing parent prototype to child prototype")  
  Food.prototype = Object.create(Product.prototype);
  t.equal(Food.prototype.__proto__, Product.prototype, 'this is the link used for prototype chain resolution')  
  t.equal(Food.prototype.constructor, Product, 'constructor is still Product object so we must change it to Food')
  Food.prototype.constructor = Food;

  var f = new Food('pasta');
  t.ok(f instanceof Food, 'the created object is instance of Food')  
  t.ok(f instanceof Product, 'as well as it is instance of its parent class Product')
  t.equal(f.category, 'food', 'properties of the child are set correctly')
  
  t.end();
});
