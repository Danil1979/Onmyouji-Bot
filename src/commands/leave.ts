import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {leaveChannel} from "./play"
export default class leave implements IBotCommand {

    private readonly _command = "leave";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(msgObject.member.voiceChannel&&(msgObject.member.voiceChannel==msgObject.guild.voiceConnection.channel)){
            leaveChannel(msgObject.guild,msgObject);
        }else if(msgObject.member.voiceChannel!=msgObject.guild.voiceConnection.channel){
            msgObject.channel.send(">>> You must be in the same channel as the bot to use this command.");
        }else{
            msgObject.channel.send(">>> Sorry you can't use this command.");
        }
      
    }



} 