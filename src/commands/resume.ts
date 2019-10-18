import * as Discord from "discord.js";
import {IBotCommand} from "../api";
export default class resume implements IBotCommand {

    private readonly _command = "resume";

    help(): string {
        return "~resume|to resume paused song.\n";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if(!msgObject.guild.voiceConnection.dispatcher){
            return;
        }
        msgObject.guild.voiceConnection.dispatcher.resume();
        msgObject.channel.send(">>> Resumed.");
        return;
    }



}
