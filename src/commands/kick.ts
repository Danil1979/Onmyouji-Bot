import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class kick implements IBotCommand {

    private readonly _command = "kick";

    help(): string {
        return "";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      
        
        let mentionedUser = msgObject.mentions.users.first();

        let suppliedReason = args.slice(1).join(" ") || "";


        let kickLog = `${msgObject.author.username}: ${suppliedReason}`;

        if(!msgObject.member.hasPermission("ADMINISTRATOR")){

            msgObject.channel.send(`${msgObject.author.username} does not have the permission to use this command`);
            return;
        }

        if(!mentionedUser){
            console.log(args.slice(0));
            if(args.slice(0).toString()===""){
                
            msgObject.channel.send(`Please enter @username to use this function`);
            }
            else
            msgObject.channel.send(`Sorry ${args.slice(0)} does not exist!`);

            return;

        }

        if(msgObject.mentions.members.first().hasPermission("ADMINISTRATOR")){
            msgObject.channel.send("That user is too powerful!");

            return;
        }

        // msgObject.delete(0);
        // .catch(console.error)
        msgObject.guild.member(mentionedUser).kick(kickLog)
            .then(console.log)
            .catch(console.error)

    }



}