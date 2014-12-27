/**
 * Resources:
 * 
 * http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory/#name-binding
 * http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/
 * 
 * 
 * Theory:
 * 
 * - A name binding is the association of an identifier with value.
 * 
 * - A rebinding relates to an identifier. 
 * This operation unbinds the identifier (if it was previously bound) from an old object and binds it to another one (to another block of memory). 
 * Often (and in ECMAScript in particular) rebinding is implemented via a simple operation of assignment.
 * 
 * - In contrast with rebinding, the operation of mutation already affects the content of the object.
 * 
 */
define(["chai"], function(Chai) {

    'use strict'

    var GLOBAL_OBJECT = window,
        should = Chai.should(),
        expect = Chai.expect,
        assert = Chai.assert,

        Suite = {
            name: "Data Binding",
            tests: []
        };

  Suite.tests.push({
        name: "Call by value - new allocation of memory is done and the value of variable passed is copied",
        body: function() {
            
            //http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/
            
            //1.Primitives
                //bar = 10
      
                //procedure foo(barArg):
                //  barArg = 20;
                //end
                  
                //foo(bar)
                  
                // changes inside foo didn't affect
                // on bar which is outside
                //print(bar) // 10

            //2. Objects
            
                //bar = {
                //  x: 10,
                //  y: 20
                //}
                  
                //procedure foo(barArg, isFullChange):
                  
                //  if isFullChange:
                //    barArg = {z: 1, q: 2}
                //    exit
                //  end
                  
                // barArg.x = 100
                //  barArg.y = 200
                  
                //end
                  
                //foo(bar)
                  
                // with call by value strategy,
                // object outside has not been changed 
                //print(bar) // {x: 10, y: 20}
                  
                // the same with full change
                // (assigning the new value)
                //foo(bar, true)
                  
                //also, there were no changes made
                //print(bar) // {x: 10, y: 20}, but not {z: 1, q: 2}
        }
    });    

    Suite.tests.push({
        name: "Call by reference - the function receives implicit reference to object",
        body: function() {
            
                //bar = {
                //  x: 10,
                //  y: 20
                //}
                  
                //procedure foo(barArg, isFullChange):
                  
                //  if isFullChange:
                //    barArg = {z: 1, q: 2}
                //    exit
                //  end
                  
                // barArg.x = 100
                //  barArg.y = 200
                  
                //end
                  
                //foo(bar)
                  
                // with call by reference strategy, object outside is changed 
                //print(bar) // {x: 100, y: 200}
                  
                // the same with full change
                //foo(bar, true)
                  
                //also, there were changes made during full change
                //print(bar) //  {z: 1, q: 2}
        }
    });
    
    
    Suite.tests.push({
        name: "Call by sharing - function receives the copy of the reference to object - used in ECMAScript",
        body: function() {

            //This reference copy is associated with the formal parameter and is its value.
            //Regardless the fact that the concept of the reference in this case appears, 
            //this strategy should not be treated as call by reference 
            //(though, in this case the majority makes a mistake), because the value of the argument is not the direct alias, 
            //but the copy of the address.
            
            //sharing vs. value = pass copy of reference vs. pass copy of data
            //sharing vs. reference = pass copy of reference (so new assignment do rebinding rather than mutation) vs. pass the same reference (so we get mutation in all cases)
            
                //bar = {
                //  x: 10,
                //  y: 20
                //}
                  
                //procedure foo(barArg, isFullChange):
                  
                //  if isFullChange:
                //    barArg = {z: 1, q: 2}
                //    exit
                //  end
                  
                // barArg.x = 100
                // barArg.y = 200
                  
                //end
                  
                //foo(bar)
                  
                // with call by sharing properties of the object are changed 
                // during this call we have mutation
                //print(bar) // {x: 100, y: 200}
                  
                // but it is not the same with full change
                //foo(bar, true)
                  
                //also, there were no changes made from the full change and the object is the same from the last change
                //during this call we have rebinding
                //print(bar) //  {x: 100, y: 200}
            
        }
    });
    

    Suite.tests.push({
        name: "ECMAScript is doing Call By Value for primitives",
        body: function() {
            
            var c = 1;
            
            function f(c) {
                
                //Since 'c' is formal parameter a new identifier is created in this VariableEnvironment that hides the one from the parent environment.
                //We are chanign the local variable rather than the parent variable.
                //Basically the value of 'c' from the outer context is copied into the identifier created in this context.
                //What could confuse us is that 'c' has no var declaration here. However we know that JS creates identifiers for formal parameters.
                c++;
                assert.equal(2, c);
            }     
            
            f(c);
            
            //'c' in this context is still the same
            assert.equal(1, c);
        }
    });

    Suite.tests.push({
        name: "ECMAScript is doing Call By Sharing for objects",
        body: function() {
            
            //Some people still name it call by value because ECMAScript pass copy of the reference to the object
            var c1 = {a: 1, b: 2},
                c2 = {a: 1, b: 2};
            
            function f(c1, c2) {
                
                //rebinding is done and c1 is not affected similar to pass by value behaviour
                c1 = {z: 1}; 
                
                //mutation is done on the external object - similar to pass by reference behaviour
                c2.a++
                c2.b++
            }     
            
            f(c1, c2);
            
            assert.equal(1, c1.a);
            assert.equal(2, c1.b);
            
            assert.equal(2, c2.a);
            assert.equal(3, c2.b);
        }
    });

    Suite.tests.push({
        name: "Rebinding",
        body: function() {
            
            //Although we assign the value of one identifier to another we still have two separate identifiers that in some point in time could point to the same memory (share the same value)
            //When we change the value of identifier - we create new value in memory and set the identfier to point to this piece of memory
            
            var a = 1,
                b = a;
            
            assert.equal(1, a);
            assert.equal(1, b);
            
            a = 2;
            
            assert.equal(2, a);
            assert.equal(1, b);
            
            
            //The same behavior is valid for objects
            // bind "foo" to {x: 10} object
            var foo = {x: 10};
             
            assert.equal(10, foo.x); 

             
            // bind "bar" to the *same* object
            // as "foo" identifier is bound
             
            var bar = foo;
             
            assert.strictEqual(foo, bar);
            assert.equal(10, bar.x); 
             
            // and now rebind "foo" to the new object
             
            foo = {x: 20};
             
            assert.equal(20, foo.x); 
             
            // and "bar" still points to the old object
            assert.equal(10, bar.x);  
            assert.notStrictEqual(bar, foo);
            
        }
    });

    Suite.tests.push({
        name: "Mutation",
        body: function() {
            
            // bind an array to the "foo" identifier
            var foo = [1, 2, 3];
             
            // and here is a *mutation* of the array object contents
            foo.push(4);
             
            assert.equal(4, foo[3]);
             
            // also mutations
            foo[4] = 5;
            foo[0] = 0;
            
            assert.equal(5, foo[4]); 
            assert.equal(0, foo[0]);
        }
    });
    

    Suite.tests.push({
        name: "Binding States",
        body: function() {
            
            //State 1 - 'x' identifier does not exist cause ReferenceError
			function fn(){x};
			assert.throw(fn, ReferenceError);
            
            
            //State 2 - 'y' identifier exists but value is not bound yet - undefined
            var y;
            assert.isUndefined(y);
            
            //State 3 - 'z' identifier exists and value is bound to it
            var z = 0;
            assert.isDefined(z);
            assert.equal(0, z);
        }
    });
    

    return Suite;
});
