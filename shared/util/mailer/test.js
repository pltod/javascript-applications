var data = require('./template.html');
var mailer = require('./index');
mailer.sendEmail('your name', 'subject', 'youremail@mail.com', data);