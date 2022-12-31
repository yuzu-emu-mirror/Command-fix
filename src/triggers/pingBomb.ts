import { ban } from '../common';
import state from '../state';
import logger from '../logging';
import * as discord from 'discord.js';

const ExemptRoles = ['Administrators', 'Moderators', 'Team', 'Developer', 'Support', 'VIP'];

export function trigger (message: discord.Message) {
  return message.mentions.users.size > 10;
}

export async function execute (message: discord.Message) {
  const count = message.mentions.users.size;
  const exempt = message.member?.roles?.cache.find(role => ExemptRoles.includes(role.name)) !== undefined;
  logger.info(`${message.author.toString()} tagged ${count} users in ${message.channel.toString()}`);
  await state.logChannel?.send(`Ping bomb detected in ${message.channel.toString()} by ${message.author.toString()}`);
  if (exempt) {
    await state.logChannel?.send(`... however ${message.author.toString()} is exempt from the banning rule.`);
  } else {
    await ban(message.author, message.author, message.guild);
  }
}
