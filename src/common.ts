import state from './state';
import * as data from './data';
import logger from './logging';
import UserBan from './models/UserBan';
import discord = require('discord.js');

export function ban(user: discord.User, moderator: discord.User, guild: discord.Guild | null) {
    const count = state.warnings.filter(x => x.id === user.id && !x.cleared).length || 0;

    logger.info(`${moderator.toString()} has banned ${user.toString()} ${user.id} ${user.username}.`);
    state.logChannel?.send(`${moderator.toString()} has banned ${user.id} ${user.toString()} [${count}].`);

    state.bans.push(new UserBan(user.id, user.username, moderator.id, moderator.username, count));
    let member = guild?.member(user);
    if (!member) {
      state.logChannel?.send(`Error banning ${user.id} ${user.username}: user not found.`);
      logger.error(`User not found: ${user.toString()} ${user.id} ${user.username} when executing a ban`);
      // we don't need a return here, because of the optional chaining below
    }
    member?.ban().catch(function (error) {
      state.logChannel?.send(`Error banning ${user.toString()} ${user.username}`);
      logger.error(`Error banning ${user.toString()} ${user.id} ${user.username}.`, error);
    });

    data.flushBans();
}
