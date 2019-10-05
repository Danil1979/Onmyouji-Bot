import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class p implements IBotCommand {
private readonly _command = "p";

help(): string {
return "play or pause function";
}

isThisCommand(command: string): boolean {
return command === this._command;
}

async runCommand(
args: string[],
msgObject: Discord.Message,
client: Discord.Client
): Promise<void> {
    msgObject.delete();
    const voiceConnection:Discord.VoiceConnection = msgObject.guild.voiceConnection;
if (args[0]) {
    const play = require("./play").default;
    const playCommand = new play() as IBotCommand;
    playCommand.runCommand(args, msgObject, client);
    return;
} else {
    if(!voiceConnection){
        return;
    }
    if(!voiceConnection.dispatcher){
        return;
    }
    if (voiceConnection.dispatcher.paused) {
    const resume = require("./resume").default;
    const resumeCommand = new resume() as IBotCommand;
    resumeCommand.runCommand(args, msgObject, client);
    return;
    } else if (!voiceConnection.dispatcher.paused) {
    const pause = require("./pause").default;
    const pauseCommand = new pause() as IBotCommand;
    pauseCommand.runCommand(args, msgObject, client);
    return;
    }
}
}
}
