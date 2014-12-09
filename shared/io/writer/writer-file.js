var fs = require('fs');

module.exports = function (file, data) {
  fs.writeFileSync(file, data, 'utf-8');
}
