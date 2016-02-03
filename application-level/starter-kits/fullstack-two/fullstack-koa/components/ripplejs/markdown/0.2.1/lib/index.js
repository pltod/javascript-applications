var marked = require("marked");

module.exports = function(View, options) {
  View.directive('markdown', function(value){
    this.node.innerHTML = marked(value, options);
  });
};