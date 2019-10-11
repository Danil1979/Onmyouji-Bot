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


    
      msgObject.channel.send("<:yes:482203009674379264>")

    }

 
} 
