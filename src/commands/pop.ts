import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import play from "./play"
export default class pop implements IBotCommand {

    private readonly _command = "pop";

    help(): string {
        return "~pop|to remove the most recently queue song.\n";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        try{
            if(!msgObject.guild.voiceConnection||!msgObject.guild.voiceConnection.dispatcher){
                msgObject.channel.send(">>> No music are playing at the moment.");
                return;
            }
            if(play.bigQueue[play.channelList.indexOf(msgObject.member.voiceChannel.id)].length==1){
                msgObject.channel.send(">>> I can't remove the only song in the queue.");
                return;
            }
            const removedSong:any= play.bigQueue[play.channelList.indexOf(msgObject.member.voiceChannel.id)].pop();
            msgObject.channel.send(`>>> Successfully removed ${removedSong.title} from the queue.`)
                return;
        }catch(err){
            console.error("Error occured in pop.ts");
        }
       

    }



} 