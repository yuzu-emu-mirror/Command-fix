import { ban } from '../common';
import discord = require('discord.js');

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export function command (message: discord.Message) {
  message.mentions.users.map(async (user) => {
    await ban(user, message.author, message.guild);
  });
};
