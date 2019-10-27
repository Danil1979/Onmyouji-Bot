import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class pause implements IBotCommand {

private readonly _command = "pause";

help(): string {
    return "~pause|to pause current song.\n";
}  

isThisCommand(command: string): boolean {
    return command === this._command;
}

async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {


    if(!msgObject.guild.voiceConnection.dispatcher){
        return;
    }
    msgObject.guild.voiceConnection.dispatcher.pause();
    msgObject.channel.send(">>> Paused.");
    return;
}
}

