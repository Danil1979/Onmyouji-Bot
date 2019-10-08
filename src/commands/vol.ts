import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class vol implements IBotCommand {

    private readonly _command = "vol";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        const volume = require("./volume").default;
        const volumeCommand = new volume() as IBotCommand;
        volumeCommand.runCommand(args, msgObject, client);
        return;
    }



} 