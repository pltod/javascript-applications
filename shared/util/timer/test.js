var Timer = require('./index');
var myTimer1 = Timer('The cool timer').start();
var myTimer2 = Timer().start();
setTimeout(function() {
  console.log('DONE');
  myTimer1.stop();
  myTimer2.stop();  
  
  setTimeout(function() {
    console.log('DONE');
    myTimer1.stop();
    myTimer2.stop();  
  }, 2000);
  
}, 3000);



