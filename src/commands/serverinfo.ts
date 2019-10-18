import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class serverinfo implements IBotCommand {

    private readonly _command = "serverinfo";

    help(): string {
        return "~serverinfo|to show current server info.\n";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let embed =new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle("Server Info")
                        .setFooter("This is Footer")
                        .setImage(client.user.avatarURL)
                        .setDescription("This is the description")
                        .addField("Server Count:", `This server currently has ${msgObject.guild.memberCount} members`)

        msgObject.channel.send(embed)
            .catch(console.error);

    }



}