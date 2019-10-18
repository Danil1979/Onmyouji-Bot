import * as Discord from "discord.js";
import {IBotCommand, emojis} from "../api";
import update, { initialize } from "./update";

export default class stats implements IBotCommand {

private readonly _command = "stats";

help(): string {
    return "~stats shikiname|to search for a shiki's maxed stats.\n";
}  

isThisCommand(command: string): boolean {
    return command === this._command;
}

async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
    const shikiQuery = args.join(" ");
    if(!args[0]){
        return;
    }

    
    this.accessSheet(shikiQuery,msgObject,false);

}

async accessSheet(shikiQuery:string,msgObject:Discord.Message,retried:boolean){
    var shiki;
    for(let i=0;i<update.dataArray.length;i++){
            const aliasArray:string[] =update.dataArray[i][1].split(",");
    
            for(let x=0;x<aliasArray.length;x++){
                if(aliasArray[x].charAt(0)==" "){
                    aliasArray[x]=aliasArray[x].substring(1);
                }
                aliasArray[x]=aliasArray[x].toLowerCase();

            }
            if(update.dataArray[i][0].toLowerCase()==shikiQuery.toLowerCase()){
                    shiki=update.dataArray[i];
                break;
            }
            
            if(aliasArray.indexOf(shikiQuery.toLowerCase())!=-1){
                    shiki=update.dataArray[i];
                break;
            }     
    }
    if(shiki){
        this.format(shiki,msgObject);
    }else if(!shiki&&retried){
        msgObject.channel.send("Shikigami not found.")
        return;
    }else if(!shiki&&!retried){
        await initialize();
        this.accessSheet(shikiQuery,msgObject,true);  
        };

}
format(shikiArray:any[],msgObject:Discord.Message){
    for(let y=2;y<7;y++){
        shikiArray[y].split(",");
        
    }

    const shiki={
        name:shikiArray[0],
        rarity:shikiArray[2],
        atticon:shikiArray[3],
        ATT:shikiArray[4],
        hpicon:shikiArray[5],
        HP:shikiArray[6],
        deficon:shikiArray[7],
        DEF:shikiArray[8],
        spdicon:shikiArray[9],
        SPD:shikiArray[10],
        criticon:shikiArray[11],
        Crit:shikiArray[12],
        CDmg:shikiArray[13],
        Thumbnail:shikiArray[14],
        Image:shikiArray[15],
        GuideURL:shikiArray[16],
        VA:shikiArray[17]


    }

    const emojis:emojis={
        SS:"<:ss:634724378726367272>",
        spd:"<:spd:632559004278718487>",
            S:"<:s_:632559004379250688>",
        hp:"<:hp:632559004106883104>",
        def:"<:def:632559004383707147>",
        D:"<:d_:632559004366929950>",
        crit:"<:crit:632559004375056385>",
        C:"<:c_:632559004157214731>",
        B:"<:b_:632559004366667776>",
        att:"<:att:632559004450684928>",
        A:"<:a_:632559004341633028>",
        SSR:"<:ssr:632578444693078016>",
        SR:"<:SR:632845984807911444>",
        R:"<:R_:632845984594132998>",
        N:"<:N_:632845984669368321>",
        SP:"<:SP:632845984761774080>"
    
    }

    let embed =new Discord.RichEmbed()
    .addField(emojis[shiki.rarity]+" "+"**"+shiki.name+"**","\u200b",false)
    .setThumbnail(shiki.Thumbnail)
    .setColor("RANDOM")
    .addField(emojis.att+' ATK',emojis[shiki.atticon]+ `${shiki.ATT}`,true)
    .addField(emojis.hp+' HP',emojis[shiki.hpicon]+`${shiki.HP}`,true)
    .addField(emojis.def+' DEF',emojis[shiki.deficon]+`${shiki.DEF}`,true)
    .addField(emojis.spd+' SPD',emojis[shiki.spdicon]+`${shiki.SPD}`,true)
    .addField(emojis.crit+' CRT',emojis[shiki.criticon]+`${shiki.Crit}%`,true)
    .addField(' CDMG',`${shiki.CDmg}%`,true)
    // .setTitle(ssr_emoji)
    .setFooter(`VA: ${shiki.VA}`)
    // .setDescription("This is the description(?Shiki_Bio)")
    .setImage(shiki.Image)
    .addField("Guide",`${shiki.GuideURL}`)

    
msgObject.channel.send(embed)
.catch(console.error);
}


} 



