var debug = require('debug')('environment-storage-mechanisms');
var test = require('tape');
	

test('### Environments and Declarative Environment Record Structure - Pseudocode ###', function(t) {

  //For the following code
  var x = 10;
   
  function foo() {
    var y = 20;
    t.equal(x, 10);
    t.equal(y, 20);
  }
  t.equal(x, 10);
  
  // We have environment of the global context
  var globalEnvironment = {
    environmentRecord: {
        
      type: 'declarative',             
      // built-ins:
      //Object: function,
      //Array: function,
      // etc ...
   
      // our bindings:
      x: 10
    },
    // no parent environment
    outer: null 
   
  };
   
  //And environment of the "foo" function
  var fooEnvironment = {
    environmentRecord: {
      y: 20
    },
    outer: globalEnvironment
  };
  
  t.end();

});


test('### Environments and Object Environment Record Structure - Pseudocode ###', function(t) {

  var a = 10;
  var b = 20;
   
  with ({a: 30}) {
    t.equal(50, a + b);
  }
   
  t.equal(30, a + b);

  //'with' creates environment with following structure
  var environment = {
    environmentRecord: {
        
      type: 'object',             
      bindingObject: {
          //store binding here in ordinary object that is not efficient - no immutable properties
      }
    },
    outer: 'Link to the parent environment'
  };
  
  t.end();

});