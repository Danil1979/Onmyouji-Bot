import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import update, { initialize } from "./update";

export default class bounties implements IBotCommand {

    private readonly _command = "bounties";

    help(): string {
        return "bounties";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        const shikiQuery = args.join(" ");
        if(!args[0]){
            return;
        }
    
        
        accessBountySheet(shikiQuery,msgObject,false);
    }



} 

export async function accessBountySheet(shikiQuery:string,msgObject:Discord.Message,retried:boolean){
    var shiki;
    for(let i=0;i<update.bountiesArray.length;i++){
            const aliasArray:string[] =update.bountiesArray[i][1].split(",");
    
            for(let x=0;x<aliasArray.length;x++){
                if(aliasArray[x].charAt(0)==" "){
                    aliasArray[x]=aliasArray[x].substring(1);
                }
                aliasArray[x]=aliasArray[x].toLowerCase();

            }
            if(update.bountiesArray[i][0].toLowerCase()==shikiQuery.toLowerCase()){
                    shiki=update.bountiesArray[i];
                break;
            }
            
            if(aliasArray.indexOf(shikiQuery.toLowerCase())!=-1){
                    shiki=update.bountiesArray[i];
                break;
            }     
    }
    if(shiki){
        format(shiki,msgObject);
    }else if(!shiki&&retried){
        msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery}.`)
        return;
    }else if(!shiki&&!retried){
        await initialize();
        accessBountySheet(shikiQuery,msgObject,true);  
        };

}
function format(shikiArray:any[],msgObject:Discord.Message){

    const bounty = {
        shikiName: shikiArray[1],
        recommendation: shikiArray[3],
        alternatives:shikiArray[4],
        hint:shikiArray[0]
    }
    let embed =new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Shikigami: ${bounty.shikiName}`)
        if(bounty.hint){
            embed.addField(`Clues: `,bounty.hint,false);
        }
    embed
    .setDescription("*The number in the bracket indicates how many kills you get per run*")
    .addField("Chapter/Challenge/Seal:",bounty.recommendation,false)
    .addField("Secret Zones(Stg = Stage): ",bounty.alternatives,false)

    msgObject.channel.send(embed);

}