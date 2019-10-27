import * as Discord from "discord.js";
import {IBotCommand, emojis} from "../api";
import update, { initialize } from "./update";

export default class souls implements IBotCommand {

private readonly _command = "souls";

help(): string {
    return "~souls soulname|to search for a soul's effect.\n";
}  

isThisCommand(command: string): boolean {
    return command === this._command;
}

async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
    const soulQuery = args.join(" ");
    if(!args[0]){
        return;
    }

    
    this.accessSheet(soulQuery,msgObject,false);

}

async accessSheet(soulQuery:string,msgObject:Discord.Message,retried:boolean){
    var soul;
    for(let i=0;i<update.soulArray.length;i++){
            const aliasArray:string[] =update.soulArray[i][1].split(",");
    
            for(let x=0;x<aliasArray.length;x++){
                if(aliasArray[x].charAt(0)==" "){
                    aliasArray[x]=aliasArray[x].substring(1);
                }
                aliasArray[x]=aliasArray[x].toLowerCase();

            }
            if(update.soulArray[i][0].toLowerCase()==soulQuery.toLowerCase()){
                soul=update.soulArray[i];
                break;
            }
            
            if(aliasArray.indexOf(soulQuery.toLowerCase())!=-1){
                    soul=update.soulArray[i];
                break;
            }     
    }
    if(soul){
        this.format(soul,msgObject);
    }else if(!soul&&retried){
        msgObject.channel.send(`Sorry, I can't find the Soul named ${soulQuery}.`);
        return;
    }else if(!soul&&!retried){
        await initialize();
        this.accessSheet(soulQuery,msgObject,true);  
        };

}
format(soulArray:any[],msgObject:Discord.Message){

    // for(let y=2;y<7;y++){
    //     soulArray[y].split(",");
        
    // }

    const soul={
        name:soulArray[0],
        partialCombo:soulArray[2],
        partialRequirement:soulArray[3],
        fullCombo:soulArray[4],
        fullRequirement:soulArray[5],
        soulImage:soulArray[6],
        soulThumbnail:soulArray[7],
        note:soulArray[8]
    }



    let embed =new Discord.RichEmbed()
    .setThumbnail(soul.soulThumbnail)
    .setImage(soul.soulImage)
    .addField(soul.partialRequirement+" Piece Effect",soul.partialCombo,true)
    .addField(soul.fullRequirement+" Piece Effect",soul.fullCombo,true)
      if(soul.note){
        embed.addField("Note",soul.note,true);
    }

    
msgObject.channel.send(embed)
.catch(console.error);
}
}