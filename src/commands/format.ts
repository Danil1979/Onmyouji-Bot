import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import serverinfo from "./serverinfo";

export default class format implements IBotCommand {

    private readonly _command = "format";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
       const emoji= msgObject.guild.emojis.find(emoji => emoji.name ==="yes");
        let embed =new Discord.RichEmbed()
        .setAuthor("Shiki_Name",'https://onmyojiguide.com/wp-content/uploads/2017/01/Great-Tengu-Onmyoji-Shikigami-Icon-2.png')
        .setThumbnail('https://onmyojiguide.com/wp-content/uploads/2017/01/Kagura-Icon-1.png')
        .setColor("RANDOM")
        .addField(emoji+' ATK','_value',true)
        .addField(emoji+' HP','_value',true)
        .addField(emoji+' DEF','_value',true)
        .addField(emoji+' SPD','_value',true)
        .addField(emoji+' CRT','_value',true)
        .addField(emoji+' CDMG','_value',true)
        .setTitle("Title(?Rarity)")
        .setFooter("This is Footer(?Voice actor/links and stuff)")
        .setDescription("This is the description(?Shiki_Bio)")

msgObject.channel.send(embed)
.catch(console.error);

    }



} 