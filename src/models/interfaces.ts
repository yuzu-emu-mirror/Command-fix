import { Message } from 'discord.js';

export interface IGameDBEntry {
    directory: string;
    title: string;
    compatibility: number;
}

export interface ICompatList {
    [key: number]: {
        key: string,
        name: string,
        color: string,
        description: string
    }
}

export interface IResponses {
    readonly pmReply: string,
    readonly quotes: {
        readonly [key: string]: { readonly reply: string }
    }
}

export interface IModule {
    readonly roles?: string[],
    command: (message: Message, args?: string) => void | Promise<void>
}

export interface ITrigger {
    readonly roles?: string[],
    trigger: (message: Message, args?: string) => boolean
    execute: (message: Message, args?: string) => void | Promise<void>
}
