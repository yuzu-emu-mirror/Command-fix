import state from '../state';
import discord = require('discord.js');

exports.command = function (message: discord.Message) {
  message.mentions.users.map(async (user) => {
    const warnings = state.warnings.filter(x => x.id === user.id && !x.cleared);
    await message.channel.send(`${user.toString()}, you have ${warnings.length} total warnings.`);
  });
};
