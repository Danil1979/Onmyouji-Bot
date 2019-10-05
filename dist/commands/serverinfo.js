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
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXJ2ZXJpbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBR3RDLE1BQXFCLFVBQVU7SUFBL0I7UUFFcUIsYUFBUSxHQUFHLFlBQVksQ0FBQztJQTJCN0MsQ0FBQztJQXpCRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUksS0FBSyxHQUFFLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDakIsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsUUFBUSxDQUFDLGFBQWEsQ0FBQztpQkFDdkIsU0FBUyxDQUFDLGdCQUFnQixDQUFDO2lCQUMzQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQy9CLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDekMsUUFBUSxDQUFDLGVBQWUsRUFBRSw2QkFBNkIsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLFVBQVUsQ0FBQyxDQUFBO1lBRTlHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QixDQUFDO0tBQUE7Q0FJSjtBQTdCRCw2QkE2QkMifQ==