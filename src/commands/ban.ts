import { ban } from '../common';
import * as discord from 'discord.js';

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export async function command (message: discord.Message) {
  return Promise.all(message.mentions.users.map(async (user) => ban(user, message.author, message.guild)));
}
