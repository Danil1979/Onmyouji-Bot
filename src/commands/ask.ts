import * as Discord from "discord.js";
import {IBotCommand} from "../api";
let questionArray : Array<string> = [];

export default class ask implements IBotCommand {

    private readonly _command = "ask";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(!args[0]){
            return;
        }
        const replies =["yes", "maybe","no","defnitely","just do whatever you think is right","why are you asking this?"];
        const danil= await client.fetchUser("222728476816310272");
        const question = args.join(" ");
        questionArray.push(question);
        if(questionArray.length == 1){
            questionArray.forEach(async question =>
                msgObject.channel.send(`>>> Please wait...`),
                await danil.send(question).then((msg)=>{
                    (msg as Discord.Message).channel.awaitMessages(response => response.author.id != client.user.id,{ max: 1, time: 10000, errors: ['time'] }).then(
                    collected => msgObject.channel.send(`>>> Question: ${question}\n Answer: ` + collected.first().content)
                    ).catch(()=>msgObject.channel.send(`>>> Question: ${question}\n Answer: ` + replies[Math.floor(Math.random() * replies.length)]));
                }),
            );
        questionArray.splice(0,questionArray.length);
        }    
    }
} 