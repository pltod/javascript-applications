define(["underscore"], 

function(_) {
	

	describe('just checking underscore dependency', function() {
		
		it('works for underscore', function() {
			//expect(_.size([1,2,3])).to.equal(3);
		});

		it('works for custom test', 
		
			function() {
				//This is context 1
				var identifier0 = 0;
	
				function env1() {
				    //assert.equal(identifier0, 0);
				}	
				
				function env2() {
				    //we set the 'identifier0' to 1 here and call the env1 but it still has value of 0 - that is static (lexical) scoping
				    var identifier0 = 1;
				    env1();
				}
	            
	            env2();
			}
		
		);
	});

}); 