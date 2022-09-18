import { ban } from '../common';
import * as discord from 'discord.js';

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export function command (message: discord.Message) {
  message.mentions.users.map(async (user) => {
    await ban(user, message.author, message.guild);
  });
}
