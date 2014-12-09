var uuid = require('node-uuid');
var moment = require('moment');


module.exports = {
  uid: function () {
    return uuid.v4();
  },
  
  date: function () {
    return moment().format('DD/MM/YYYY hh:mm')
  }
}