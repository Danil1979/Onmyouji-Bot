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
            const shiki = {
                shiki_name: "Onikiri",
                atk: 3350,
                hp: 10823,
                def: 353,
                spd: 117,
                Crit: 0.11,
                CDMG: 1.6
            };
            const emoji = msgObject.guild.emojis.find(emoji => emoji.name === "yes");
            const ssr_emoji = msgObject.guild.emojis.find(emoji => emoji.name === "SSR");
            let embed = new Discord.RichEmbed()
                .setAuthor(`${shiki.shiki_name}`, 'https://vignette.wikia.nocookie.net/onmyoji/images/0/06/SSR.png/revision/latest/scale-to-width-down/70?cb=20170326153954', 'https://onmyoji.fandom.com/wiki/Onikiri#Max')
                .setThumbnail('https://vignette.wikia.nocookie.net/onmyoji/images/e/ed/312a.jpg/revision/latest?cb=20180820030806')
                .setColor("RANDOM")
                .addField(emoji + ' ATK', emoji + `${shiki.atk}`, true)
                .addField(emoji + ' HP', emoji + `${shiki.hp}`, true)
                .addField(emoji + ' DEF', emoji + `${shiki.def}`, true)
                .addField(emoji + ' SPD', emoji + `${shiki.spd}`, true)
                .addField(emoji + ' CRT', emoji + `${shiki.Crit * 100}%`, true)
                .addField(emoji + ' CDMG', emoji + `${shiki.CDMG * 100}%`, true)
                .addField("Guide", 'http://onmyoji-elysium.com/Shikigami/Details?name=This_Guy')
                .setFooter("VA: Kousuke Toriumi")
                .setImage("https://vignette.wikia.nocookie.net/onmyoji/images/f/f9/312skin1.png/revision/latest?cb=20181001190618");
            if (msgObject.member.id == "222728476816310272") {
                embed.addField("TEST", "tESTFIELD");
            }
            msgObject.channel.send(embed)
                .catch(console.error);
        });
    }
}
exports.default = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Zvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUl0QyxNQUFxQixNQUFNO0lBQTNCO1FBRWlCLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFtRHJDLENBQUM7SUFqREQsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLE1BQU0sS0FBSyxHQUFHO2dCQUNWLFVBQVUsRUFBQyxTQUFTO2dCQUNwQixHQUFHLEVBQUMsSUFBSTtnQkFDUixFQUFFLEVBQUMsS0FBSztnQkFDUixHQUFHLEVBQUMsR0FBRztnQkFDUCxHQUFHLEVBQUMsR0FBRztnQkFDUCxJQUFJLEVBQUMsSUFBSTtnQkFDVCxJQUFJLEVBQUMsR0FBRzthQUNYLENBQUE7WUFDRCxNQUFNLEtBQUssR0FBRSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFJLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sU0FBUyxHQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUksS0FBSyxDQUFDLENBQUM7WUFDMUUsSUFBSSxLQUFLLEdBQUUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUNqQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUMsMEhBQTBILEVBQUMsNkNBQTZDLENBQUM7aUJBQ3pNLFlBQVksQ0FBQyxvR0FBb0csQ0FBQztpQkFDbEgsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsUUFBUSxDQUFDLEtBQUssR0FBQyxNQUFNLEVBQUMsS0FBSyxHQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksQ0FBQztpQkFDakQsUUFBUSxDQUFDLEtBQUssR0FBQyxLQUFLLEVBQUMsS0FBSyxHQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFDLElBQUksQ0FBQztpQkFDOUMsUUFBUSxDQUFDLEtBQUssR0FBQyxNQUFNLEVBQUMsS0FBSyxHQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksQ0FBQztpQkFDaEQsUUFBUSxDQUFDLEtBQUssR0FBQyxNQUFNLEVBQUMsS0FBSyxHQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksQ0FBQztpQkFDaEQsUUFBUSxDQUFDLEtBQUssR0FBQyxNQUFNLEVBQUMsS0FBSyxHQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUcsRUFBQyxJQUFJLENBQUM7aUJBQ3RELFFBQVEsQ0FBQyxLQUFLLEdBQUMsT0FBTyxFQUFDLEtBQUssR0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFHLEVBQUMsSUFBSSxDQUFDO2lCQUN2RCxRQUFRLENBQUMsT0FBTyxFQUFDLDREQUE0RCxDQUFDO2lCQUU5RSxTQUFTLENBQUMscUJBQXFCLENBQUM7aUJBRWhDLFFBQVEsQ0FBQyx3R0FBd0csQ0FBQyxDQUFBO1lBRW5ILElBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUUsb0JBQW9CLEVBQUM7Z0JBQ3pDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxDQUFBO2FBQ3JDO1lBSUwsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLENBQUM7S0FBQTtDQUlBO0FBckRELHlCQXFEQyJ9