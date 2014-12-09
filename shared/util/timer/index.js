var secondInMillis = 1000;
var nanosInMillis = 1.0e-6;

module.exports = function (name) {
  var time;
  var methods = {
    start: start,
    stop: stop
  };

  name = name || 'My timer'
  return methods;
  
  
  function start() {
    // The format is [seconds, nanoseconds]
    time = process.hrtime();
    return methods;
  }
  
  function stop() {
    var diff;
    if (!time) {
      console.log('Call the start method first to mesure the execution time');
    } else {
      diff = process.hrtime(time);
      console.log(name + ' execution time is ' + diff[0] + ' seconds and ' + (diff[1] * nanosInMillis) + ' milliseconds.');
      time = process.hrtime();
    }
  }    
}

