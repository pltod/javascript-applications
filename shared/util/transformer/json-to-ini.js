var fs = require('fs');
var outputString = "";

module.exports = function (data) {
  var obj = JSON.parse(data);
  var sections = getSections(obj);
  
  sections.forEach(function (section) {
    var currentSection = obj[section];
    var lines = getLines(currentSection);
    append('['.concat(section).concat(']').concat('\n'));
    lines.forEach(function (line) {
      append(line.concat('=').concat(currentSection[line]).concat('\n'));
    })
    append('\n');
  })
  
  return outputString;
}


function getSections(obj) {
  return Object.keys(obj);
}

function getLines(section) {
  return Object.keys(section);
}

function append(data) {
  outputString = outputString.concat(data);
}
