var run = require('./index');
var fs = require('fs');
var path = require('path');

run(function *() {
  
  // The yield keyword causes generator function execution to pause and return the current value of the expression following the yield keyword.
  
  // So in this way in use cases where we need to wait for the result of the execution of async code to make it more painless comparing to the way we do it with callbacks
  console.log(__dirname);
  var generatorsFileContent = yield readFile(path.resolve(__dirname, 'index.js'));
  console.log(generatorsFileContent.toString());

  var asyncLoopFileContent = yield readFile(path.resolve(__dirname, 'test.js'));
  console.log(asyncLoopFileContent.toString());
});

// This is a thunk - function that return function
function readFile(filepath) {
  
  // this function triggers async function execution
  return function(callback) {
    fs.readFile(filepath, callback);
  };
  
}