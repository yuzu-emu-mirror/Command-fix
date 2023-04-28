import logger from '../logging';
import * as discord from 'discord.js';
import { grantRole } from '../common';

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export async function command (message: discord.Message) {
  const role = process.env.DISCORD_DEVELOPER_ROLE;

  if (!role) {
    logger.error('DISCORD_DEVELOPER_ROLE suddenly became undefined?!');
    return Promise.resolve([]);
  }

  return Promise.all(message.mentions.users.map(async (user) => {
    return message.guild?.members.fetch(user).then((member) => grantRole(member, role, message.channel))
      .catch(async () => {
        await message.channel.send(`User ${user.toString()} was not found in the channel.`);
      });
  }));
}
