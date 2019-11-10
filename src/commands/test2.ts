import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class test2 implements IBotCommand {

    private readonly _command = "test2";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        const guild =client.guilds.get("404154708572373029");//Elysium guild ID
        if(!guild){
         console.log("Guild not found");
          return;
       
        }
  
        const nameChannel=guild.channels.get("634317691905376256");
        if(nameChannel){
            nameChannel.setName("🍖 "+"Time until Feast");
        }
    }



} 