import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {queueList} from "./play"

export default class queue implements IBotCommand {

    private readonly _command = "queue";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(!msgObject.guild.voiceConnection||!msgObject.guild.voiceConnection.dispatcher){
            msgObject.channel.send(">>> There are no song playing at the moment.");
            return;
        }
    queueList(msgObject.guild,msgObject);
    }



} 