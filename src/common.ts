import state from './state';
import * as data from './data';
import logger from './logging';
import UserBan from './models/UserBan';
import discord = require('discord.js');

export async function ban (user: discord.User, moderator: discord.User, guild: discord.Guild | null) {
  const count = state.warnings.filter(x => x.id === user.id && !x.cleared).length || 0;

  logger.info(`${moderator.toString()} has banned ${user.toString()} ${user.id} ${user.username}.`);
  await state.logChannel?.send(`${moderator.toString()} has banned ${user.id} ${user.toString()} [${count}].`);

  state.bans.push(new UserBan(user.id, user.username, moderator.id, moderator.username, count));
  guild?.members?.ban(user).catch(async function (error) {
    await state.logChannel?.send(`Error banning ${user.toString()} ${user.username}`);
    logger.error(`Error banning ${user.toString()} ${user.id} ${user.username}.`, error);
  });

  data.flushBans();
}
