var fs = require('fs');

/**
 * Transform the passed ini formated data into json.
 *
 * @param {String} data - ini formatted data
 * @returns JSON formatted data
 * @type String
 */
module.exports = function (data) {
  return JSON.stringify(transform(data),null,'\t');
}

function transform(data) {
  var file = {};
  var currentSection;
  var sections = data.split('\n');
  sections.forEach(function (item) {
    if (ignoreLine(item)) return;
    
    if (isNewSection(item)) {
      currentSection = getSectionName(item);
      file[currentSection] = {};
    } else {
      file[currentSection][getKeyValue(item).key] = getKeyValue(item).value;
    }
    
  });
  return file;
}

function isNewSection(data) {
  return data.indexOf('[') !== -1;
}

function isComment(data) {
  return data.indexOf(';') !== -1;
}

function ignoreLine(data) {
  return data === "" || isComment(data);
}

function getSectionName(data) {
  return data.substr(1, data.length-2);
}

function getKeyValue(data) {
  var keyValue = data.split('='); 
  return {
    key: keyValue[0].trim(),
    value: keyValue[1].trim()
  }
}

