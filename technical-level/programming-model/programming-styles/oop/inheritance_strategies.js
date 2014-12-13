TestCase("Inheritance Strategies", {

	/**
	 * Built-in identifiers Object and Function point to functions.
	 * They are used to create objects and functions respectively.
	 * The prototype of the Object constructor function is empty root Object
	 * The prototype of the Function constructor function is empty function
	 */
	"test->Object and Function buit-in constructors" : function() {
		assertNotUndefined(Object);
		assertNotUndefined(Function);

		assertEquals( typeof Object, "function");
		assertEquals( typeof Function, "function");

		assertNotUndefined(Object.prototype);
		assertNotUndefined(Function.prototype);

		assertEquals( typeof Object.prototype, "object");
		assertEquals( typeof Function.prototype, "function");

	},
	/**
	 * Shows the Root object is Object.prototype
	 */
	"test->Object hierarchy" : function() {
		var obj = new Object();
		assertEquals(obj.__proto__, Object.prototype);

		function CustomConstructor() {
		}

		var obj2 = new CustomConstructor();
		//assertEquals(obj2.__proto__, the newly created CustomConstructor object used for prototype);
		assertEquals(obj2.__proto__.__proto__, Object.prototype);
	},
	/**
	 * Read also Soshnikov function creation algorithm and http://javascript.crockford.com/prototypal.html
	 *
	 *	Rules:
	 *		- prototype is property of the function objects
	 *		- prototype properti always points to an object
	 *		- objects are doing data resolution inside the prototypes of the function object they are created with
	 *		- objects access their function object prototypes with __proto__ link
	 *		- FO and PO are also objects created with something (on the upper level some built in constructor function)  
	 *		
	 */
	"test->the three objects" : function() {
		function CreatorObject(label){
			this.label = label || "DefaultDataHolderLabel";
		}
		var modelObject = CreatorObject.prototype;
		var creatorObject = CreatorObject;
		var dataHolderObject1 = new CreatorObject();
		var dataHolderObject2 = new CreatorObject("ConcreteDataHolderLabel");
		
		modelObject.label = "modelObjectLabel";
		creatorObject.label = "creatorObjectLabel";
		creatorObject.param = "param";
		modelObject.modelParam = "param";
		
		assertEquals(modelObject.label, "modelObjectLabel");
		assertEquals(creatorObject.label, "creatorObjectLabel");
		assertEquals(dataHolderObject1.label, "DefaultDataHolderLabel");
		assertEquals(dataHolderObject2.label, "ConcreteDataHolderLabel");
		
		assertUndefined(dataHolderObject1.param);
		assertUndefined(dataHolderObject2.param);
		
		assertEquals(dataHolderObject1.modelParam, "param");
		assertEquals(dataHolderObject2.modelParam, "param");
	},
	/**
	 * Important always think in terms of the three objects roles - Creator, Model and DataHolder
	 */
	"test->prototype" : function() {
		if (Object.prototype.temp)
		{
			delete Object.prototype.temp;
			delete Object.prototype.temp1;
			delete Function.prototype.temp;
			delete Function.prototype.temp1;
		}
		
		function F(){}
		assertEquals(F.__proto__, Function.prototype); //This is internal [[Prototype]] property
		assertEquals(typeof F.prototype, 'object');
		assertEquals(F.prototype.__proto__, Object.prototype);
		Object.prototype.temp = "temp";
		Function.prototype.temp1 = "unableToOverrideTemp1";
		assertEquals(F.temp, "temp");
		assertEquals(F.temp1, "unableToOverrideTemp1");
		Function.prototype.temp = "overridenTemp";
		Object.prototype.temp1 = "overridenTemp1";
		assertEquals(F.temp, "overridenTemp");
		assertEquals(F.temp1, "unableToOverrideTemp1");
	},
	/**
	 * Here the objects are created with object literal.
	 * This means that we inherit only own properties.
	 */
	"test->prototypal inheritance" : function() {
		var PLAYER1 = {
			name : "Jordan"
		};
		var PLAYER2 = prototypalInheritance(PLAYER1);
		assertEquals("Jordan", PLAYER2.name);
	},
	"test->example" : function() {
		var address = {
			street: "Sunset",
			number: 5
		}
		function ExtendedAddress () {
			this.zipCode = 555;
		};
		ExtendedAddress.prototype = address;
		var extendedAddress = new ExtendedAddress(); 
		assertEquals(555, extendedAddress.zipCode);
		assertEquals("Sunset", extendedAddress.street);
		assertEquals(5, extendedAddress.number);
	},
	/**
	 * Drawbacks:
	 *	Not able to pass parameters to the parent
	 *  Inherit data that is specific for the parent instance not only data from parent prototype
	 */
	"test->classical inheritance 1" : function() {
		function Parent(name) {
			this.name = name || "Adam";
		}

		Parent.prototype.say = function() {
			return this.name;
		};
		
		function Child() {}
		
		classicInheritance1(Child, Parent);
		
		var child = new Child();
		assertEquals(child.name, "Adam"); //Inherit data that is specific for the parent instance
		assertEquals(child.say(), "Adam");
		
		//Create DataHolder with the same Creator used for Child's parent.
		var parent1 = new Parent();
		assertEquals(parent1.say(), "Adam");
		child.__proto__.say = function () {return "AdamOveridden"};
		assertEquals(child.say(), "AdamOveridden");
		//Other objects created with the same Creator are not affected
		assertEquals(parent1.say(), "Adam");
	},
	/**
	 * Solves the problem with passing parameters via borrowing a constructor.
	 */
	"test->classical inheritance 2" : function() {
		function Article(name) {
			this.tags = ['js', 'css'];
		}
		
		function BlogPost() {}
		var article = new Article();
		classicInheritance1_1(BlogPost, article);
		var blog = new BlogPost();
		
		//Borrow a constructor via call or apply
		function StaticPage() {
			Article.call(this);
		}
		var page = new StaticPage();
		
		assertFalse(blog.hasOwnProperty('tags'));
		assertTrue(page.hasOwnProperty('tags'));
		
		blog.tags.push('html');
		page.tags.push('php');
		assertEquals(article.tags.join(', '), "js, css, html")
		
		//Another example is
		//Here we just borrow from Objects we do not make them Prototypes
		function Parent(name) {
			this.name = name || "Adam";
		}

		Parent.prototype.say = function() {
			return this.name;
		};
		
		function Child(name) {
			Parent.apply(this, arguments);
		}
		
		var child = new Child("Patrick");
		assertEquals(child.name, "Patrick");
		assertEquals(typeof child.say, 'undefined');
		
	}
	
});
