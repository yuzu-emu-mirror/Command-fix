var app = require('../app.js');
var logger = require('../logging.js');

exports.roles = ['Admins', 'Moderators', 'CitraBot'];
exports.command = function(message) {
  var role = '345247291843805185';
  message.mentions.users.map((user) => {
    let member = message.guild.member(user);
    let alreadyJoined = member.roles.has(role.id);

    if (alreadyJoined != null) {
      member.removeRole(role);
      message.reply(`${user}'s speech has been revoked in the #development channel.`);
    } else {
      member.addRole(role);
      message.reply(`${user} has been granted speech in the #development channel.`);
    }
  });
}
