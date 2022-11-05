import * as discord from 'discord.js';

export const roles = ['Admins', 'Moderators'];
export async function command (message: discord.Message, reply: string | undefined) {
  let replyMessage;
  if (reply == null) {
    replyMessage = message.content.substring(message.content.indexOf(' ') + 1);
  } else {
    replyMessage = `${message.mentions.users.map(user => `${user.toString()}`).join(' ')} ${reply}`;
  }

  await message.channel.send(replyMessage);
}
