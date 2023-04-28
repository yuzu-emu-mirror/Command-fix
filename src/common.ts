import state from './state';
import * as data from './data';
import logger from './logging';
import UserBan from './models/UserBan';
import * as discord from 'discord.js';

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

export async function grantRole (member: discord.GuildMember, role: string, channel: discord.TextBasedChannel) {
  const user = member.user;
  const roleDisplayName = role.toLowerCase();

  const alreadyJoined = member.roles.cache.has(role);
  if (alreadyJoined) {
    member.roles.remove(role).then(async () => {
      await channel.send(`${user.toString()}'s ${roleDisplayName} role has been revoked.`);
    }).catch(async () => {
      await state.logChannel?.send(`Error revoking ${user.toString()}'s ${roleDisplayName} speech...`);
      logger.error(`Error revoking ${user.toString()} ${user.username}'s ${roleDisplayName} speech...`);
    });
    return;
  }

  member.roles.add(role).then(async () => {
    await channel.send(`${user.toString()} has been granted ${roleDisplayName} speech.`);
  }).catch(async () => {
    await state.logChannel?.send(`Error granting ${user.toString()}'s ${roleDisplayName} speech...`);
    logger.error(`Error granting ${user.toString()} ${user.username}'s ${roleDisplayName} speech...`);
  });
}
