import state from '../state';
import logger from '../logging';
import discord = require('discord.js');

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export function command (message: discord.Message) {
  const role = process.env.DISCORD_DEVELOPER_ROLE;

  if (!role) {
    logger.error('DISCORD_DEVELOPER_ROLE suddenly became undefined?!');
    return;
  }

  message.mentions.users.map((user) => {
    message.guild?.members.fetch(user).then((member) => {
      const alreadyJoined = member.roles.cache.has(role);

      if (alreadyJoined) {
        member.roles.remove(role).then(() => {
          message.channel.send(`${user.toString()}'s speech has been revoked in the #development channel.`);
        }).catch(() => {
          state.logChannel?.send(`Error revoking ${user.toString()}'s developer speech...`);
          logger.error(`Error revoking ${user} ${user.username}'s developer speech...`);
        });
      } else {
        member.roles.add(role).then(() => {
          message.channel.send(`${user.toString()} has been granted speech in the #development channel.`);
        }).catch(() => {
          state.logChannel?.send(`Error granting ${user.toString()}'s developer speech...`);
          logger.error(`Error granting ${user} ${user.username}'s developer speech...`);
        });
      }
    }).catch(() => {      
      message.channel.send(`User ${user.toString()} was not found in the channel.`);
    });

  });
}
