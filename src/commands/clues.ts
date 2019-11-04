import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import update from "./update";

import { accessBountySheet }  from "./bounties";

export default class clues implements IBotCommand {

    private readonly _command = "clues";

    help(): string {
        return "clues";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        const cluesString = args.join(" ");
        if(!args[0]){
            return;
        }
        
        const cluesQuery = cluesString.split(",");


       accessSheet(cluesQuery,msgObject,false);





    }



} 
async function accessSheet(cluesQuery:string[],msgObject:Discord.Message,retried:boolean){
    const clues = new Map();

    for(let i=0;i<update.cluesArray.length;i++){
        const clueArray:string[] =update.cluesArray[i][0].split(",");

        for(let x=0;x<clueArray.length;x++){
            // if(clueArray[x].charAt(0)==" "){
                clueArray[x]=clueArray[x].trim();
            // }
            clueArray[x]=clueArray[x].toLowerCase();

        }
        var count =0;
        cluesQuery.forEach(clue => {
            
            if(clueArray.indexOf(clue.trim())!=-1){
                count++;
                clues.set(update.cluesArray[i][1],count);
            }
        });
        
    // else {
    //     for(let y=0;y<clueArray.length;y++){
    //         if(clueArray[y].indexOf(cluesQuery.toLowerCase())!=-1){
    //             msgObject.channel.send(`For "${cluesQuery}", do you mean "${clueArray[y]}"?`)
            

    //             clue.push(update.cluesArray[i][1]);
    //             break;
    //         }
    //     }
    // }

    }
    let shiki = Array.from(clues.entries());
    let matched=false;
       shiki.forEach(shiki => {
           if(shiki[1]==cluesQuery.length){
            matched=true;
            accessBountySheet(shiki[0],msgObject,false);
           }
       });
       if(!matched){
        msgObject.channel.send(">>> No matching clue(s) tag found.");
    }
    
    // if(shiki){
    //     this.format(shiki,msgObject);
    // }else if(!shiki&&retried){
    //     msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery}.`)
    //     return;
    // }else if(!shiki&&!retried){
    //     await initialize();
    //     this.accessSheet(shikiQuery,msgObject,true);  
    //     };

}
// function collectorFunc(message:Discord.Message,clue:any){
//     console.log("clues:"+clue[0])
//     const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { maxMatches: 1 });

//     collector.on('collect', message => {
//     if (message.content == "yes") {
//         yes(clue);
//     }else if(message.content == "no"){
//       clue.shift();
//       console.log("Wrong clue");
//       collectorFunc(message,clue);
//     }
// })
// }
// function yes(clue:any){
// console.log("this is the correct clue");
// }

// function setEvent(client:Discord.Client){
//     client.once("message",msg=>{

//         //if messager = bot, ignore it
//         if(msg.author.bot) {setEvent(client);return;}
//         //if its direct message then ignore
//         if(msg.channel.type=="dm"){setEvent(client);return;}
    
//         if(msg.content=="yes"){
//             console.log("yes");
//         }else if(msg.content=="no"){
//             console.log("no");
//                }else{setEvent(client);return;}
//              })
// }