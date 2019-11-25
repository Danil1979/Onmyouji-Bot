import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class help implements IBotCommand {

    private readonly _command = "help";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      var  helpMessage:String="```Intro```\n I am Verniy\nAuthor:Danil#7708\n```Command List```\n **Core commands**\n`~stats`-retrieve the stats of a specific Shikigami\n`~skills` -retrives the skills of a specific Shikigami\n`~souls` -etrive the info about a specific souls\n`~bounties` -return the locations to farm for the Shikigami\n `~clues` -return the Shikigami in the clues and the location to farm\n\n **Music command**\n`~play or ~p` -to search for a song on youtube and play it\n`~pause`-to pause the music player\n`~resume` -to resume a paused music player\n`~volume or ~vol`-to adjust the volume of the music player\n `~pop`-to remove the most recently added song\n`~queue`-get the current queued song(s)\n `~leave` -have the bot stop playing and leave the voice channel "
      msgObject.channel.send(helpMessage);
    }



} 