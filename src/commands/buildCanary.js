const request = require('request');
const logger = require('../logging.js');

exports.roles = ['Admins', 'Moderators'];
exports.command = function (message) {
  // Read the URL endpoint from config.
  var webhookUrl = process.env.CANARY_WEBHOOK_URL;
  if (!webhookUrl) {
    message.channel.sendMessage('Failed to start the canary build due to a missing Webhook URL.');
    return;
  }

  // Send a POST request to the URL endpoint to trigger the build.
  request.post({ url: webhookUrl, json: true, body: {
    "ref": "refs/heads/master"
  }}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      message.channel.sendMessage(`Canary build has been started.`);
    } else {
      logger.error(error);
      message.channel.sendMessage(`Failed to start the canary build due to an error.`);
    }
  });
};
