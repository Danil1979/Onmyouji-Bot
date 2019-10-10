import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class info implements IBotCommand {
  private readonly _command = "info";
  static info: boolean = true;
  help(): string {
    return "info";
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(
    args: string[],
    msgObject: Discord.Message,
    client: Discord.Client
  ): Promise<void> {
    if (!args[0]) {
      msgObject.channel.send(`>>> Loop: ${info.info}`);
      return;
    }
    if (args[0] == "false" || args[0] == "off") {
        info.info = false;
      msgObject.channel.send(`>>> Loop: ${info.info}`);
      return;
    } else if (args[0] == "true" || args[0] == "on") {
        info.info = true;
      msgObject.channel.send(`>>> Loop: ${info.info}`);
      return;
    }else{
        msgObject.channel.send("Please enter ~info on/off to use this command.");
        return;
    }
  }
}
