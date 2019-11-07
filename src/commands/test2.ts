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
      msgObject.channel.send("success").then(msg=>{
          (msg as Discord.Message).react('👍');
      });
    }



} 