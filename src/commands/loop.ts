import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class loop implements IBotCommand {
  private readonly _command = "loop";
  static loop: boolean = false;
  help(): string {
    return "loop";
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
      msgObject.channel.send(`>>> Loop: ${loop.loop}`);
      return;
    }
    if (args[0] == "false" || args[0] == "off") {
      loop.loop = false;
      msgObject.channel.send(`>>> Loop: ${loop.loop}`);
      return;
    } else if (args[0] == "true" || args[0] == "on") {
      loop.loop = true;
      msgObject.channel.send(`>>> Loop: ${loop.loop}`);
      return;
    }else{
        msgObject.channel.send("Please enter ~loop on/off to use this command.");
        return;
    }
  }
}
