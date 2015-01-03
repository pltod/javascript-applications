/**
 * Single Resposibility Principle Example from:
 * 
 * http://freshbrewedcode.com/derekgreer/2011/12/08/solid-javascript-single-responsibility-principle/
 * 
 * A class should have only one reason to change.
 * Object Role Stereotypes:
 *
 *	- Information Holder
 *	- Structurer
 *	- Service Provider
 *	- Controller
 *	- Coordinator
 *	- Interfacer
 */
define(["chai"], function(Chai) {
	var should = Chai.should(),
		expect = Chai.expect,
		assert = Chai.assert,
		Suite = {
			name: "Single Responsibility Principle",
			tests: []
		};

	Suite.tests.push({
		name: "Before Refactoring",
		body: function() {

			/**
			 * Product Entity
			 */
			function Product(id, description) {
			    this.getId = function() {
			        return id;
			    };
			    this.getDescription = function() {
			        return description;
			    };
			}
			
			/**
			 * Cart Entity
			 */
			function Cart(eventAggregator) {
			    var items = [];
			
			    this.addItem = function(item) {
			        items.push(item);
			    };
			}
			
			//Data Initialization...
			var products = [
			    new Product(1, "Star Wars Lego Ship"),
			    new Product(2, "Barbie Doll"),
			    new Product(3, "Remote Control Airplane")],
			    
			    cart = new Cart();
			
			/**
			 * Single Anonymous Function 
			 */
			(function() {
			    function addToCart() {
			    	
			    	//1. Identify the clicked product
			    	
			        //var productId = $(this).attr('id');
			        //var product = $.grep(products, function(x) {
			        //    return x.getId() == productId;
			        //})[0];
			        
			        //2. Populate the Cart model 
			        cart.addItem(product);
					
					
					//3. Add items to the cart view
			        //var newItem = $('<li></li>')
			        //    .html(product.getDescription())
			        //    .attr('id-cart', product.getId())
			        //    .appendTo("#cart");
			    }
			
				//4. Populate product view with initial set of products
			    //products.forEach(function(product) {
			    //   var newItem = $('<li></li>')
			    //        .html(product.getDescription())
			    //        .attr('id', product.getId())
			    //        .dblclick(addToCart)
			    //        .appendTo("#products");
			    //});
			})();			
		}
	});

	Suite.tests.push({
		name: "After Refactoring",
		body: function() {

			/**
			 * Event Entity
			 */
			function Event(name) {
			    this._handlers = [];
			    this.name = name;
			}
			Event.prototype.addHandler = function(handler) {
			    this._handlers.push(handler);
			};
			Event.prototype.removeHandler = function(handler) {
			    for (var i = 0; i < handlers.length; i++) {
			        if (this._handlers[i] == handler) {
			            this._handlers.splice(i, 1);
			            break;
			        }
			    }
			};
			Event.prototype.fire = function(eventArgs) {
			    this._handlers.forEach(function(h) {
			        h(eventArgs);
			    });
			};
		
			/**
			 * Event Service
			 */	
			var eventAggregator = (function() {
			    var events = [];
			
			    function getEvent(eventName) {
			        return $.grep(events, function(event) {
			            return event.name === eventName;
			        })[0];
			    }
			
			    return {
			        publish: function(eventName, eventArgs) {
			            var event = getEvent(eventName);
			
			            if (!event) {
			                event = new Event(eventName);
			                events.push(event);
			            }
			            event.fire(eventArgs);
			        },
			
			        subscribe: function(eventName, handler) {
			            var event = getEvent(eventName);
			
			            if (!event) {
			                event = new Event(eventName);
			                events.push(event);
			            }
			
			            event.addHandler(handler);
			        }
			    };
			})();
			
			/**
			 * Cart Entity
			 */
			function Cart() {
			    var items = [];
			
			    this.addItem = function(item) {
			        items.push(item);
			        eventAggregator.publish("itemAdded", item);
			    };
			}
			
			/**
			 * Cart View Manager
			 */
			var cartView = (function() {
			    eventAggregator.subscribe("itemAdded", function(eventArgs) {
			        var newItem = $('<li></li>')
			            .html(eventArgs.getDescription())
			            .attr('id-cart', eventArgs.getId())
			            .appendTo("#cart");
			    });
			})();
			
			/**
			 * Cart Entity Manager
			 */
			var cartController = (function(cart) {
			    eventAggregator.subscribe("productSelected", function(eventArgs) {
			        cart.addItem(eventArgs.product);
			    });
			})(new Cart());
			
			/**
			 * Product Entity
			 */
			function Product(id, description) {
			    this.getId = function() {
			        return id;
			    };
			    this.getDescription = function() {
			        return description;
			    };
			}
			
			var products = [
			    new Product(1, "Star Wars Lego Ship"),
			    new Product(2, "Barbie Doll"),
			    new Product(3, "Remote Control Airplane")];
			
			/**
			 * Product View Manager
			 */
			var productView = (function() {
			    function onProductSelected() {
			        var productId = $(this).attr('id');
			        var product = $.grep(products, function(x) {
			            return x.getId() == productId;
			        })[0];
			        eventAggregator.publish("productSelected", {
			            product: product
			        });
			    }
			
			    products.forEach(function(product) {
			        var newItem = $('<li></li>')
			            .html(product.getDescription())
			            .attr('id', product.getId())
			            .dblclick(onProductSelected)
			            .appendTo("#products");
			    });
			})();
			
		}
	});
	
	return Suite;
});
