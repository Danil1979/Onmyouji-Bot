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
        return "~stats shikiname|to search for a shiki's maxed stats.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const shikiQuery = args.join(" ");
            if (!args[0]) {
                return;
            }
            this.accessSheet(shikiQuery, msgObject, false);
        });
    }
    accessSheet(shikiQuery, msgObject, retried) {
        return __awaiter(this, void 0, void 0, function* () {
            var shiki;
            for (let i = 0; i < update_1.default.dataArray.length; i++) {
                const aliasArray = update_1.default.dataArray[i][1].split(",");
                for (let x = 0; x < aliasArray.length; x++) {
                    if (aliasArray[x].charAt(0) == " ") {
                        aliasArray[x] = aliasArray[x].substring(1);
                    }
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
            else if (!shiki && retried) {
                msgObject.channel.send("Shikigami not found.");
                return;
            }
            else if (!shiki && !retried) {
                yield update_1.initialize();
                this.accessSheet(shikiQuery, msgObject, true);
            }
            ;
        });
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
            SS: "<:ss:634724378726367272>",
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
            SSR: "<:ssr:632578444693078016>",
            SR: "<:SR:632845984807911444>",
            R: "<:R_:632845984594132998>",
            N: "<:N_:632845984669368321>",
            SP: "<:SP:632845984761774080>"
        };
        let embed = new Discord.RichEmbed()
            .addField(emojis[shiki.rarity] + " " + "**" + shiki.name + "**", "\u200b", false)
            .setThumbnail(shiki.Thumbnail)
            .setColor("RANDOM")
            .addField(emojis.att + ' ATK', emojis[shiki.atticon] + `${shiki.ATT}`, true)
            .addField(emojis.hp + ' HP', emojis[shiki.hpicon] + `${shiki.HP}`, true)
            .addField(emojis.def + ' DEF', emojis[shiki.deficon] + `${shiki.DEF}`, true)
            .addField(emojis.spd + ' SPD', emojis[shiki.spdicon] + `${shiki.SPD}`, true)
            .addField(emojis.crit + ' CRT', emojis[shiki.criticon] + `${shiki.Crit}%`, true)
            .addField(' CDMG', `${shiki.CDmg}%`, true)
            .setFooter(`VA: ${shiki.VA}`)
            .setImage(shiki.Image)
            .addField("Guide", `${shiki.GuideURL}`);
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = stats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMscUNBQThDO0FBRTlDLE1BQXFCLEtBQUs7SUFBMUI7UUFFaUIsYUFBUSxHQUFHLE9BQU8sQ0FBQztJQTRIcEMsQ0FBQztJQTFIRCxJQUFJO1FBQ0EsT0FBTyx5REFBeUQsQ0FBQztJQUNyRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsT0FBTzthQUNWO1lBR0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpELENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxVQUFpQixFQUFDLFNBQXlCLEVBQUMsT0FBZTs7WUFDekUsSUFBSSxLQUFLLENBQUM7WUFDVixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUNsQyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTdELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO29CQUNoQyxJ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