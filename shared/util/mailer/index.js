var debug = require('debug')('mailer');
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

var config = require('../../../../mail-config');
var emailService = config.emailService;
var senderEmail = config.senderEmail;
var senderPass = config.senderPass;

var options = {
  service: emailService,
  auth: {
    user: senderEmail,
    pass: senderPass
  },
  maxConnections: 20,
  maxMessages: 100
};

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(smtpPool(options));

module.exports = {
  sendEmail: function (sender, subject, to, data) {
    var mailOptions = {
      from: sender,
      subject: subject,
      to: to,
      // text: data
      html: data
    };
    debug(mailOptions);    
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });    
  }
  
}