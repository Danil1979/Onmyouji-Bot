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
class format {
    constructor() {
        this._command = "format";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const emoji = msgObject.guild.emojis.find(emoji => emoji.name === "yes");
            let embed = new Discord.RichEmbed()
                .setAuthor("Shiki_Name", 'https://onmyojiguide.com/wp-content/uploads/2017/01/Great-Tengu-Onmyoji-Shikigami-Icon-2.png')
                .setThumbnail('https://onmyojiguide.com/wp-content/uploads/2017/01/Kagura-Icon-1.png')
                .setColor("RANDOM")
                .addField(emoji + ' ATK', '_value', true)
                .addField(emoji + ' HP', '_value', true)
                .addField(emoji + ' DEF', '_value', true)
                .addField(emoji + ' SPD', '_value', true)
                .addField(emoji + ' CRT', '_value', true)
                .addField(emoji + ' CDMG', '_value', true)
                .setTitle("Title(?Rarity)")
                .setFooter("This is Footer(?Voice actor/links and stuff)")
                .setDescription("This is the description(?Shiki_Bio)");
            msgObject.channel.send(embed)
                .catch(console.error);
        });
    }
}
exports.default = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Zvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUl0QyxNQUFxQixNQUFNO0lBQTNCO1FBRXFCLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFpQ3pDLENBQUM7SUEvQkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQ2hGLE1BQU0sS0FBSyxHQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUksS0FBSyxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLEdBQUUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUNqQyxTQUFTLENBQUMsWUFBWSxFQUFDLDhGQUE4RixDQUFDO2lCQUN0SCxZQUFZLENBQUMsdUVBQXVFLENBQUM7aUJBQ3JGLFFBQVEsQ0FBQyxRQUFRLENBQUM7aUJBQ2xCLFFBQVEsQ0FBQyxLQUFLLEdBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxLQUFLLEdBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7aUJBQ25DLFFBQVEsQ0FBQyxLQUFLLEdBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxLQUFLLEdBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxLQUFLLEdBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxLQUFLLEdBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUM7aUJBQ3JDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDMUIsU0FBUyxDQUFDLDhDQUE4QyxDQUFDO2lCQUN6RCxjQUFjLENBQUMscUNBQXFDLENBQUMsQ0FBQTtZQUU5RCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEIsQ0FBQztLQUFBO0NBSUo7QUFuQ0QseUJBbUNDIn0=