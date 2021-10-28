import discord = require('discord.js');

export const roles = ['Admins', 'Moderators'];
export async function command (message: discord.Message, reply: string) {
  let replyMessage;
  if (reply == null) {
    replyMessage = message.content.substr(message.content.indexOf(' ') + 1);
  } else {
    replyMessage = `${message.mentions.users.map(user => `${user.toString()}`)} ${reply}`;
  }

  await message.channel.send(replyMessage);
}
