var app = require('../app.js');
var logger = require('../logging.js');

exports.roles = ['Admins', 'Moderators', 'CitraBot'];
exports.command = function(message) {
  var role = '345247291843805185';
  message.mentions.users.map((user) => {
    var alreadyJoined = app.guild.roles.get(role).members.find(member => member.id == user.id);

    if (alreadyJoined != null) {
      user.removeRole(role);
      message.reply(`${user}'s speech has been revoked in the #development channel.`);
    } else {
      user.addRole(role);
      message.reply(`${user} has been granted speech in the #development channel.`);
    }
  });
}
