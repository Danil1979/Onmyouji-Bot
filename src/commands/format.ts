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
    const shiki = {
        shiki_name:"Onikiri",
        atk:3350,
        hp:10823,
        def:353,
        spd:117,
        Crit:0.11,
        CDMG:1.6
    }
    const emoji= msgObject.guild.emojis.find(emoji => emoji.name ==="yes");
    const ssr_emoji=msgObject.guild.emojis.find(emoji => emoji.name ==="SSR");
    let embed =new Discord.RichEmbed()
    .setAuthor(`${shiki.shiki_name}`,'https://vignette.wikia.nocookie.net/onmyoji/images/0/06/SSR.png/revision/latest/scale-to-width-down/70?cb=20170326153954','https://onmyoji.fandom.com/wiki/Onikiri#Max')
    .setThumbnail('https://vignette.wikia.nocookie.net/onmyoji/images/e/ed/312a.jpg/revision/latest?cb=20180820030806')
    .setColor("RANDOM")
    .addField(emoji+' ATK',emoji+ `${shiki.atk}`,true)
    .addField(emoji+' HP',emoji+`${shiki.hp}`,true)
    .addField(emoji+' DEF',emoji+`${shiki.def}`,true)
    .addField(emoji+' SPD',emoji+`${shiki.spd}`,true)
    .addField(emoji+' CRT',emoji+`${shiki.Crit*100}%`,true)
    .addField(emoji+' CDMG',emoji+`${shiki.CDMG*100}%`,true)
    .addField("Guide",'http://onmyoji-elysium.com/Shikigami/Details?name=This_Guy')
    // .setTitle(ssr_emoji)
    .setFooter("VA: Kousuke Toriumi")
    // .setDescription("This is the description(?Shiki_Bio)")
    .setImage("https://vignette.wikia.nocookie.net/onmyoji/images/f/f9/312skin1.png/revision/latest?cb=20181001190618")
    




msgObject.channel.send(embed)
.catch(console.error);

}



} 