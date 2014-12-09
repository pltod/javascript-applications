// Source: http://tobyho.com/2013/06/16/what-are-generators/

// tl;dr: Use this pattern with generators that yeild async functions to have sync looking code
// Note that in this case the functions are not executed in parallel. So this is appropriate only for cases where for particular operation we need the result of the previous operation.

module.exports = function (genfun) {

  // Step 1: Gets the iterator object
  var gen = genfun();

  // This is the function passed across the iterations of iterator obtained on Step 1: generation invocation
  function next(err, answer) {
    
    var res;
    
    if (err) {
      // if err throw
      return gen.throw(err);
      
    } else {
      // if good value, send it
      res = gen.next(answer);
    }
    if (!res.done) {
      // if we are not at the end
      // we have an async request to
      // fulfill, we do this by calling 
      // `value` as a function
      // and passing it a callback
      // that receives err, answer
      // for which we'll just use `next()`
      
      // The important thing is that this pattern is useful for generators that yeild async functions
      res.value(next);
    }
  }

  // Step 2
  // Kick off the async loop initialy with no values passed
  next();
}
