import * as Discord from "discord.js";
import {IBotCommand} from "../api";
// require('dotenv').config();
export default class restart implements IBotCommand {

    private readonly _command = "restart";

    help(): string {
        return "testing";
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
        if(msgObject.member.id!='222728476816310272'){
            msgObject.channel.send("Only Danil can use this command!");
            return;
        }
        msgObject.channel.send(">>> Restarting...");
        client.destroy();
       await client.login(process.env.DISCORD_TOKEN);
       msgObject.channel.send(">>> Online");
       return;
    }



}