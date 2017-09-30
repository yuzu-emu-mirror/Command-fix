var app = require('../app.js');

exports.roles = ['Admins', 'Moderators'];
exports.command = function (message, reply) {
  app.logChannel.sendMessage(`I am running under ${process.env.USER}.`);
};
