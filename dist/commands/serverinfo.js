"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
class serverinfo {
    constructor() {
        this._command = "serverinfo";
    }
    help() {
        return "~serverinfo|to show current server info.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle("Server Info")
                .setFooter("This is Footer")
                .setImage(client.user.avatarURL)
                .setDescription("This is the description")
                .addField("Server Count:", `This server currently has ${msgObject.guild.memberCount} members`);
            msgObject.channel.send(embed)
                .catch(console.error);
        });
    }
}
exports.default = serverinfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXJ2ZXJpbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBR3RDLE1BQXFCLFVBQVU7SUFBL0I7UUFFcUIsYUFBUSxHQUFHLFlBQVksQ0FBQztJQTJCN0MsQ0FBQztJQXpCRyxJQUFJO1FBQ0EsT0FBTyw0Q0FBNEMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLEtBQUssR0FBRSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ2pCLFFBQVEsQ0FBQyxRQUFRLENBQUM7aUJBQ2xCLFFBQVEsQ0FBQyxhQUFhLENBQUM7aUJBQ3ZCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDM0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUMvQixjQUFjLENBQUMseUJBQXlCLENBQUM7aUJBQ3pDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsNkJBQTZCLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxVQUFVLENBQUMsQ0FBQTtZQUU5RyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsQ0FBQztLQUFBO0NBSUo7QUE3QkQsNkJBNkJDIn0=