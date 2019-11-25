import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class ask implements IBotCommand {

    private readonly _command = "ask";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(!args[0]){
            return;
        }

        const question = args.join(" ");
        await msgObject.author.send(question).then((msg)=>{
            (msg as Discord.Message).channel.awaitMessages(response => response.content,{ max: 1, time: 60000, errors: ['time'] }).then(
                collected => msgObject.channel.send(collected.first().content)
            ).catch(collected => console.log("catched" + collected));
        })

            
    }



} 