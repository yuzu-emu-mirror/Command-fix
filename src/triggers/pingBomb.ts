import { ban } from '../common';
import state from '../state';
import logger from '../logging';
import discord = require('discord.js');

export function trigger(message: discord.Message) {
    return message.mentions.users.size > 10;
}

export function execute(message: discord.Message) {
    const count = message.mentions.users.size;
    logger.info(`${message.author.toString()} tagged ${count} users in ${message.channel.toString()}`);
    state.logChannel?.send(`Ping bomb detected in ${message.channel.toString()} by ${message.author.toString()}`);
    ban(message.author, message.author, message.guild);
};
