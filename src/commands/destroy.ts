import * as Discord from "discord.js";
import {IBotCommand} from "../api";
// require('dotenv').config();
export default class destroy implements IBotCommand {

    private readonly _command = "destroy";

    help(): string {
        return "";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        //if bot is in a channel

        if(msgObject.guild.voiceConnection){
            msgObject.channel.send(">>> I can't carry out that function right now because I'm in a voice channel!");
            return;
        }
        //If user is not me(Danil)
        if(msgObject.member.id=='222728476816310272'||msgObject.member.id=='149777597612556288'){
            msgObject.channel.send(">>> Shutting Down...");
            client.destroy();
            return;
        }else{
            msgObject.channel.send("Only Danil can use this command!");
            return;
        }

    }



}