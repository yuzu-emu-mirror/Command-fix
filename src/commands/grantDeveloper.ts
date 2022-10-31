import state from '../state';
import logger from '../logging';
import * as discord from 'discord.js';

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export async function command (message: discord.Message) {
  const role = process.env.DISCORD_DEVELOPER_ROLE;

  if (!role) {
    logger.error('DISCORD_DEVELOPER_ROLE suddenly became undefined?!');
    return Promise.resolve([]);
  }

  return Promise.all(message.mentions.users.map(async (user) => {
    return message.guild?.members.fetch(user).then((member) => {
      const alreadyJoined = member.roles.cache.has(role);

      if (alreadyJoined) {
        member.roles.remove(role).then(async () => {
          await message.channel.send(`${user.toString()}'s speech has been revoked in the #development channel.`);
        }).catch(async () => {
          await state.logChannel?.send(`Error revoking ${user.toString()}'s developer speech...`);
          logger.error(`Error revoking ${user.toString()} ${user.username}'s developer speech...`);
        });
      } else {
        member.roles.add(role).then(async () => {
          await message.channel.send(`${user.toString()} has been granted speech in the #development channel.`);
        }).catch(async () => {
          await state.logChannel?.send(`Error granting ${user.toString()}'s developer speech...`);
          logger.error(`Error granting ${user.toString()} ${user.username}'s developer speech...`);
        });
      }
    }).catch(async () => {
      await message.channel.send(`User ${user.toString()} was not found in the channel.`);
    });
  }));
}
