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

    const voiceConnection:Discord.VoiceConnection = msgObject.guild.voiceConnection;
    try{
        if (args[0]) {
            const play = require("./play").default;
            const playCommand = new play() as IBotCommand;
            playCommand.runCommand(args, msgObject, client);
            return;
        } else {
            if(!voiceConnection||!voiceConnection.dispatcher){
                return;
            }
            voiceConnection.dispatcher.paused=!voiceConnection.dispatcher.paused;

            }
    }catch(err){
        console.error(err); 
    }

}
}


