import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class emoji implements IBotCommand {

    private readonly _command = "emoji";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      
        msgObject.channel.send("<:frogthinkrope:641837864992374795>");

    }



} 