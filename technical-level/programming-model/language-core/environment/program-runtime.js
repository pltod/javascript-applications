var test = require('tape');

test('### Program Runtime ###', function(t) {
  
  console.log('########################################');
  
  t.pass('THEORY');

  t.pass('JS Engine has two runtime phases Environment Creation and Code Execution in created Environment');

  t.pass('More precisely Environment Creation is done during runtime by the JIT Compilers of the JS Engine');  
  
  t.pass('ECMAScript program runtime is presented as the execution context (EC) stack.');
  t.pass('The initial (bottom) context is the Global Context.');  
  t.pass('The top of this stack is the active execution context (Local Context).');  
  t.pass('Local Context is created on each function activation and when running through function code we are running through its Execution Context.');  
  
  t.pass('');
  t.pass('');
  
  t.end();
  
});    