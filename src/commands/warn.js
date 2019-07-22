const state = require('../state.js');
const data = require('../data.js');
const logger = require('../logging.js');
const UserWarning = require('../models/UserWarning.js');

exports.roles = ['Admins', 'Moderators'];
exports.command = function (message) {
  const silent = message.content.includes('silent')

  message.mentions.users.map((user) => {
    const count = state.warnings.filter(x => x.id === user.id && !x.cleared).length || 0;

    if (silent == false) {
      message.channel.send(`${user} You have been warned. Additional infractions may result in a ban.`);
    }

    logger.info(`${message.author.username} ${message.author} has warned ${user.username} ${user} [${count} + 1].`);
    state.logChannel.send(`${message.author} has warned ${user} [${count} + 1].`);

    state.warnings.push(new UserWarning(user.id, user.username, message.author.id, message.author.username, count, silent));
    data.flushWarnings();
  });
};
