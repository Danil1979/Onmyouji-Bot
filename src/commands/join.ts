import * as Discord from "discord.js";
import { IBotCommand } from "../api";


export default class join implements IBotCommand {


private readonly _command = "join";

help(): string {
  return "~join|have the bot join the voice channel that the user is currently in.\n";
}

isThisCommand(command: string): boolean {
  return command === this._command;
}

async runCommand(
  args: string[],
  msgObject: Discord.Message,
  client: Discord.Client
): Promise<void> {

  const currentChannel = msgObject.member.voiceChannel;
  if (currentChannel) {
    currentChannel.join();
    msgObject.channel.send(">>> Joined");
  } else {
    msgObject.channel.send(">>> Please join a voice channel first.");
    return;
  }


}

}
