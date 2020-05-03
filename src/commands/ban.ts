import state from '../state';
import * as data from '../data';
import logger from '../logging';
import UserBan from '../models/UserBan';
import discord = require('discord.js');

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export function command (message: discord.Message) {
  message.mentions.users.map((user) => {
    const count = state.warnings.filter(x => x.id === user.id && !x.cleared).length || 0;

    logger.info(`${message.author.toString()} has banned ${user.toString()} ${user} ${user.username}.`);
    state.logChannel.send(`${message.author.toString()} has banned ${user} ${user.toString()} [${count}].`);

    state.bans.push(new UserBan(user.id, user.username, message.author.id, message.author.username, count));
    let member = message.guild?.member(user);
    if (!member) {
      state.logChannel.send(`Error banning ${user} ${user.username}: user not found.`);
      logger.error(`User not found: ${user.toString()} ${user} ${user.username} when executing a ban`);
      // we don't need a return here, because of the optional chaining below
    }
    member?.ban().catch(function (error) {
      state.logChannel.send(`Error banning ${user.toString()} ${user.username}`);
      logger.error(`Error banning ${user.toString()} ${user} ${user.username}.`, error);
    });

    data.flushBans();
  });
};
