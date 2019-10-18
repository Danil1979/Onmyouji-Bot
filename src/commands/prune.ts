import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class prune implements IBotCommand {

private readonly _command = "prune";

help(): string {
return "";
}  

isThisCommand(command: string): boolean {
return command === this._command;
}

async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {


msgObject.delete()
        .catch(console.error);
//check user for permission
if(!msgObject.member.hasPermission("ADMINISTRATOR")){

    msgObject.channel.send(`Sorry ${msgObject.author.username}, but you do not have access to this command.`)
    .then(msg =>{
        (msg as Discord.Message).delete(5000)
                .catch(console.error);
    });
    return;
}

if(!args[0]){
    msgObject.channel.send(`Please enter the amount of message to prune.`)
    .then(msg =>{
        (msg as Discord.Message).delete(5000)
                .catch(console.error);
    });
    return;
}
//assign args[0] to this variable
let numberOfMessageToDelete = Number(args[0]);

//check if the args is actually a number
if(isNaN(numberOfMessageToDelete)){
    msgObject.channel.send(`Sorry ${msgObject.author.username}, please enter a valid number.`)
    .then(msg =>{
        (msg as Discord.Message).delete(5000)
                .catch(console.error);
    });
    return;
}
//Make sure the number user enter is integer
numberOfMessageToDelete = Math.round(numberOfMessageToDelete + 1);

msgObject.channel.bulkDelete(numberOfMessageToDelete)
.catch(console.error);
}   



}