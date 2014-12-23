var slice = Array.prototype.slice;

module.exports = {
  
  /**
   * Add partial application support to the passed function.
   * After that the function must be called in two steps.
   * @private
   * @param {Function} fn the function to which support is added
   * @returns the improved function
   * @type Function
   */
  make: function (fn) {
    var args1 = slice.call(arguments, 1)
    return function (args) {
      var args2 = slice.call(arguments)
      return fn.apply(null, args1.concat(args2))
    }
  }
  
  // TODO
  
  // function that applies arguments one by one until the end
  // function that is curried and delayed or not depending on the user input
}