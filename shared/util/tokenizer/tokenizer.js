var _ = require('lodash');
var natural = require('natural');
var Levenshtein = require('levenshtein');
var tokenizer = new natural.WordTokenizer();

module.exports = {
  tokenize: function (text) {
    return tokenizer.tokenize(text);
  },
  
  arrayToLowerCase: function (words) {
    return _.map(words, function (word) {
      return word.toLowerCase();
    })  
  },
  
  capitalizeFirst: function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  },
  
  notTooFuzzy: function (from, to, name1, name2) {
    var distance = new Levenshtein(name1, name2).distance;
    return distance > from && distance < to;
  },
  
  lowerAndSplit: function (word) {
    return word.toLowerCase().split(" ");
  }
}