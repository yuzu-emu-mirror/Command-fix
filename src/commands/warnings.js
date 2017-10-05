const state = require('../state.js');

exports.command = function (message) {
  message.mentions.users.map((user) => {
    var warnings = state.warnings.filter(x => x.id === user.id && !x.cleared);
    message.channel.sendMessage(`${user}, you have ${warnings.length} total warnings.`);
  });
};
