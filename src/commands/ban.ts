import { ban } from '../common';
import discord = require('discord.js');

export const roles = ['Admins', 'Moderators', 'CitraBot'];
export function command (message: discord.Message) {
  message.mentions.users.map((user) => {
    ban(user, message.author, message.guild);
  });
};
