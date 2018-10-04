'use strict';

// Thanks to Brian Holt for the tutorial on getting started with a serverless contact form: https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/

const AWS = require('aws-sdk');
const SES = new AWS.SES();

function sendEmail(formData, callback) {
  // Build the SES parameters
  const emailParams = {
      Source: 'maureen@maureenlholland.com', // SES SENDING EMAIL
      ReplyToAddresses: [formData.reply_to],
      Destination: {
        ToAddresses: ['maureen@maureenlholland.com'], // SES RECEIVING EMAIL
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'New message from your_site.com',
        },
      },
    };
  // Send the email
  SES.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, function(err, data) {
  	const response = {
  		statusCode: err ? 500 : 200,
  		headers: {
  			'Content-Type': 'application/json',
  			'Access-Control-Allow-Origin': '*',
  		},
  		body: JSON.stringify({
  			message: err ? err.message : data,
  		}),
  	}

  	callback(null, response);
  });
};

