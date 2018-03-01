exports.roles = ['Admins', 'Moderators'];
exports.command = function (message, reply) {
  let replyMessage = 'Hello.';
  if (reply == null) {
    replyMessage = message.content.substr(message.content.indexOf(' ') + 1);
  } else {
    replyMessage = `${message.mentions.users.map(user => `${user}`)} ${reply}`;
  }

  message.channel.send(replyMessage);
};
