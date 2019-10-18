import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class volume implements IBotCommand {
    static volume=100;
    private readonly _command = "volume";

    help(): string {
        return "~volume 1-200|To adjust the volume of the music bot.\n";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        const volumeNumber:number= +args[0];
        if(!args[0]){
            msgObject.channel.send(`>>> Volume:${volume.volume}%`);
            return;
        }
        if(!msgObject.guild.voiceConnection.dispatcher){
            msgObject.channel.send(">>> Theres no music playing.");
            return;
        }
        // if(!volumeNumber){
        //     msgObject.channel.send(`>>> Volume: ${msgObject.guild.voiceConnection.dispatcher.volume*100}%`);
        //     return;
        // }
        if(isNaN(volumeNumber)|| volumeNumber>200||volumeNumber<0){
             msgObject.channel.send(">>> Please enter a number in between 0-200.");
             return;
        }
      msgObject.guild.voiceConnection.dispatcher.setVolume(volumeNumber/100);
      msgObject.channel.send(`>>> Volume: ${volumeNumber}%`);
      volume.volume=volumeNumber;
      return;
        

    }



}