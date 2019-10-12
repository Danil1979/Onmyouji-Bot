import * as Discord from "discord.js";
import {IBotCommand} from "../api";
export default class skip implements IBotCommand {

    private readonly _command = "skip";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        if(!msgObject.guild.voiceConnection||!msgObject.guild.voiceConnection.dispatcher){
            return;
        }
        msgObject.guild.voiceConnection.dispatcher.end();
        msgObject.channel.send(`>>> Song skipped!`);
        return;
    }



}

