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
const update_1 = require("./update");
class stats {
    constructor() {
        this._command = "stats";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                return;
            }
            var shikiQuery = args[0];
            this.accessSheet(shikiQuery, msgObject);
        });
    }
    accessSheet(shikiQuery, msgObject) {
        var shiki;
        for (let i = 0; i < update_1.default.dataArray.length; i++) {
            const aliasArray = update_1.default.dataArray[i][1].split(",");
            for (let x = 0; x < aliasArray.length; x++) {
                aliasArray[x] = aliasArray[x].toLowerCase();
            }
            if (update_1.default.dataArray[i][0].toLowerCase() == shikiQuery.toLowerCase()) {
                shiki = update_1.default.dataArray[i];
                break;
            }
            if (aliasArray.indexOf(shikiQuery.toLowerCase()) != -1) {
                shiki = update_1.default.dataArray[i];
                break;
            }
        }
        if (shiki) {
            this.format(shiki, msgObject);
        }
        else {
            msgObject.channel.send("Shikigami not found.");
        }
        ;
    }
    format(shikiArray, msgObject) {
        for (let y = 2; y < 7; y++) {
            shikiArray[y].split(",");
        }
        const shiki = {
            name: shikiArray[0],
            rarity: shikiArray[2],
            atticon: shikiArray[3],
            ATT: shikiArray[4],
            hpicon: shikiArray[5],
            HP: shikiArray[6],
            deficon: shikiArray[7],
            DEF: shikiArray[8],
            spdicon: shikiArray[9],
            SPD: shikiArray[10],
            criticon: shikiArray[11],
            Crit: shikiArray[12],
            CDmg: shikiArray[13],
            Thumbnail: shikiArray[14],
            Image: shikiArray[15],
            GuideURL: shikiArray[16],
            VA: shikiArray[17]
        };
        const emojis = {
            ss: "<:ss:632559004266266625>",
            spd: "<:spd:632559004278718487>",
            S: "<:s_:632559004379250688>",
            hp: "<:hp:632559004106883104>",
            def: "<:def:632559004383707147>",
            D: "<:d_:632559004366929950>",
            crit: "<:crit:632559004375056385>",
            C: "<:c_:632559004157214731>",
            B: "<:b_:632559004366667776>",
            att: "<:att:632559004450684928>",
            A: "<:a_:632559004341633028>",
            SSR: "<:ssr:632578444693078016>"
        };
        let embed = new Discord.RichEmbed()
            .addField(emojis[shiki.rarity] + " " + "**" + shiki.name + "**", "\u200b", false)
            .setThumbnail(shiki.Thumbnail)
            .setColor("RANDOM")
            .addField(emojis.att + ' ATK', emojis[shiki.atticon] + `${shiki.ATT}`, true)
            .addField(emojis.hp + ' HP', emojis[shiki.hpicon] + `${shiki.HP}`, true)
            .addField(emojis.def + ' DEF', emojis[shiki.deficon] + `${shiki.DEF}`, true)
            .addField(emojis.spd + ' SPD', emojis[shiki.spdicon] + `${shiki.SPD}`, true)
            .addField(emojis.crit + ' CRT', emojis[shiki.criticon] + `${shiki.Crit * 100}%`, true)
            .addField(' CDMG', `${shiki.CDmg * 100}%`, true)
            .setFooter(`VA: ${shiki.VA}`)
            .setImage(shiki.Image)
            .addField("Guide", `${shiki.GuideURL}`);
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = stats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFFdEMscUNBQThCO0FBRTlCLE1BQXFCLEtBQUs7SUFBMUI7UUFFcUIsYUFBUSxHQUFHLE9BQU8sQ0FBQztJQTZHeEMsQ0FBQztJQTNHRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDUixPQUFPO2FBQ1Y7WUFFRCxJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsQ0FBQztLQUFBO0lBRUQsV0FBVyxDQUFDLFVBQWlCLEVBQUMsU0FBeUI7UUFDbkQsSUFBSSxLQUFLLENBQUM7UUFDVixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2xDLE1BQU0sVUFBVSxHQUFXLGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDaEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxD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