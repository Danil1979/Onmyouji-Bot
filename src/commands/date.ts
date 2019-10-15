import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as moment from "moment";

export default class date implements IBotCommand {

    private readonly _command = "date";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      const date = moment().format('MMMM Do YYYY, h:mm:ss a');
      console.log(date);



    }



} 