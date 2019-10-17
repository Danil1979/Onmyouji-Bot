import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class test implements IBotCommand {

    private readonly _command = "test";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {


    
  const timerName=     msgObject.guild.channels.get("634317691905376256");
      if(timerName){
        timerName.setName("🍖 "+"Time until Feast");
      }

    }

 
} 
