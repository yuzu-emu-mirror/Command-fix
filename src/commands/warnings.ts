import state from '../state';
import * as discord from 'discord.js';

export async function command(message: discord.Message) {
  return Promise.all(message.mentions.users.map(async (user) => {
    const warnings = state.warnings.filter(x => x.id === user.id && !x.cleared);
    await message.channel.send(`${user.toString()}, you have ${warnings.length} total warnings.`);
  }));
}
