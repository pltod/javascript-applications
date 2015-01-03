TestCase("Testing Backbone", {

	"test->extended testing of models" : function() {
		var PLAYER = Backbone.Model.extend({
			initialize : function() {
				// Put the logic that you need to be created on Person creation.
			},
			defaults : {
				name : "Tomas",
				email : "emal@tomas.com",
				nickname : "T",
				password : "password",
				subscriptions : [],
				bits: [] 
			}
		});
		console.log(PLAYER);
	},
	/**
	 * Define object. Add event support to this object. Bind event and trigger
	 * it. Bind to event named "all".
	 */
	"test->event hadler" : function() {
		var counter = 0;
		var object = {};

		_.extend(object, Backbone.Events);

		object.bind("MyCustomEvent", function(msg) {
			assertEquals(
					"Message to be displayed when MyCustomEvent is triggered",
					msg);
		});

		// Executes on all events
		object.bind("all", function(eventName) {
			assertEquals("MyCustomEvent", eventName);
			counter++;
		});

		object.trigger("MyCustomEvent",
				"Message to be displayed when MyCustomEvent is triggered");
		assertEquals(1, counter);

		object.trigger("MyCustomEvent",
				"Message to be displayed when MyCustomEvent is triggered");
		assertEquals(2, counter);

		object.unbind("all");
		object.trigger("MyCustomEvent",
				"Message to be displayed when MyCustomEvent is triggered");
		assertEquals(2, counter);
	},

	/**
	 * The nice thing here is passing custom context to the custom event
	 * handler.
	 */
	"test->custom context for event handler" : function() {

		var customContext = {
			getValue : function() {
				return "customContextValue";
			}
		};

		var object = {};

		_.extend(object, Backbone.Events);

		object.bind("MyCustomEvent", function() {
			assertEquals("customContextValue", this.getValue());
		}, customContext);

		object.trigger("MyCustomEvent");

	},

	/**
	 * Creating a Model Changing attribute value Triggering change event Using
	 * previous attribute
	 */
	"test->model" : function() {

		var bill = new Backbone.Model({
			name : "Bill Smith"
		});

		bill.bind("change:name", function(model, name) {
			assertEquals("Changed name from Bill Smith to Bill Jones",
					"Changed name from " + bill.previous("name") + " to "
							+ name);
		});

		bill.set({
			name : "Bill Jones"
		});
	},

	"test->model2" : function() {
		var Person = Backbone.Model.extend({
			initialize : function() {
				// Put the logic that you need to be created on Person creation.
			},
			defaults : {
				name : "Not specified",
				email : "Not specified",
			}
		});

		var thomas = new Person({
			name : "Thomas",
			email : "thomas@gmail.com"
		});

		assertEquals("Thomas", thomas.get("name"));
		assertEquals("thomas@gmail.com", thomas.get("email"));
	},
	/**
	 * Test creating 1 object with 2 collections.
	 * Add elements into collections.
	 * Check collection size and log the collection elements names.
	 */
	"test->application 1 object with 2 collections" : function() {
		var Service = Backbone.Model.extend({
			initialize : function() {
			},
			defaults : {
				name : "Not specified"
			}
		});
		
		var Subscriptions = Backbone.Collection.extend({
			model : Service
		});

		var Offerings = Backbone.Collection.extend({
			model : Service
		});
		
		var Person = Backbone.Model.extend({
			initialize : function() {
				// Put the logic that you need to be created on Person creation.
			},
			defaults : {
				name : "Not specified",
				email : "Not specified",
				subscriptions : new Subscriptions(),
				offerings : new Offerings()
			}
		});

		
		var thomas = new Person({
			name : "Thomas",
			email : "thomas@gmail.com"
		});
		
		var service1 = new Service({name: "subscription1"});
		var service2 = new Service({name: "subscription2"});
		var service3 = new Service({name: "offering1"});
		var service4 = new Service({name: "offering2"});
		thomas.get("subscriptions").add([service1, service2]);
		thomas.get("offerings").add([service3, service4]);
		
		assertEquals(2, thomas.get("subscriptions").length);
		assertEquals(2, thomas.get("offerings").length);
		
		var subscriptionNames = thomas.get("subscriptions").pluck("name");
		var offeringsNames = thomas.get("offerings").pluck("name");

		console.log(subscriptionNames);
		console.log(offeringsNames);
	}

});
