import state from '../state';
import * as data from '../data';
import logger from '../logging';
import * as discord from 'discord.js';

export const roles = ['Admins', 'Moderators'];
export async function command (message: discord.Message) {
  return Promise.all(message.mentions.users.map(async (user) => {
    const count = state.warnings.filter(x => x.id === user.id && !x.cleared);
    if (count != null && count.length > 0) {
      count.forEach(warning => { warning.cleared = true; });
      data.flushWarnings();
      await message.channel.send(`${user.toString()}, your warnings have been cleared.`);
    } else {
      await message.channel.send(`${user.toString()}, you have no warnings to clear.`);
    }

    logger.info(`${message.author.username} has cleared all warnings for ${user.toString()} ${user.username} [${count?.length}].`);
    await state.logChannel?.send(`${message.author.toString()} has cleared all warnings for ${user.toString()} [${count?.length}].`);
  }));
}
