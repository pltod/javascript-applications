var test = require('tape');

test('### Environment - Data Storage ###', function(t) {
  
  console.log('########################################');
  
  t.pass('ECMAScript programs manage the data with mechanism called "environment"');
  t.pass('Environment contains a set of bindings: identifier - value.');
  t.pass('Name binding: the association of an identifier with data(value).');
  t.pass('Name bindings are stored with mechanism called Declarative Environment Record (ES3 Activation Object)');
  t.pass('Declarative Record is assumed to be stored directly at low level of the implementation (for example, in registers of a virtual machine, thus providing faster access than AO used in ES3).');
  
  
  t.end();
  
});    