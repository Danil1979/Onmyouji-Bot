
import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import update from "./update";

export default class stats implements IBotCommand {

    private readonly _command = "stats";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        var exact:Boolean=false;
        if(args[0].indexOf("-")!=-1){
           exact=true;
           args[0]=args[0].substring(1);
        }

        for(let i=0;i<update.dataArray.length;i++){
            if(exact){
                const aliasArray:string[] =update.dataArray[i][4].split(",");
                for(let x=0;x<aliasArray.length;x++){
                    aliasArray[x]=aliasArray[x].toLowerCase();
                }
                if(update.dataArray[i][0].toLowerCase()==args[0].toLowerCase()){
                    const shiki =update.dataArray[i];
                    msgObject.channel.send(`${shiki}`);
                    break;
                }
              
                if(aliasArray.indexOf(args[0].toLowerCase())!=-1){
                    const shiki =update.dataArray[i];
                    msgObject.channel.send(`${shiki}`);
                    break;
                }  
            }else{
                if(update.dataArray[i][0].toLowerCase().indexOf(args[0].toLowerCase())!=-1){
                    const shiki =update.dataArray[i];
                    msgObject.channel.send(`${shiki}`);
                    break;
                }
                if(update.dataArray[i][4].toLowerCase().indexOf(args[0].toLowerCase())!=-1){
                    const shiki =update.dataArray[i];
                    msgObject.channel.send(`${shiki}`);
                    break;
                }
            }
          
        }
    }



} 

    

    