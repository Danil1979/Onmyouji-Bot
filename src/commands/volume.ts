import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class volume implements IBotCommand {

    private readonly _command = "volume";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete();
        const volumeNumber:number= +args[0];
        if(!msgObject.guild.voiceConnection.dispatcher){
            msgObject.channel.send(">>> Theres no music playing.");
            return;
        }
        if(!volumeNumber){
            msgObject.channel.send(`>>> Volume: ${msgObject.guild.voiceConnection.dispatcher.volume*100}%`);
            return;
        }
        if(isNaN(volumeNumber)|| volumeNumber>200||volumeNumber<0){
             msgObject.channel.send(">>> Please enter a number in between 0-200.");
             return;
        }
      msgObject.guild.voiceConnection.dispatcher.setVolume(volumeNumber/100);
      msgObject.channel.send(`>>> Volume: ${volumeNumber}%`);
    }



}