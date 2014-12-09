var fs = require('fs');
var encoding = 'utf-8';

module.exports = {
  async: function (file, callback) { 
    fs.readFile(file, encoding, function (err, data) {
      if (err) throw err;
      callback(null, data.toString());
    });
  }, 
  sync: function (file) {
    return fs.readFileSync(file, encoding)
  }
}