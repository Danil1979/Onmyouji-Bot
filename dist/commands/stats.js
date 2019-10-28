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
                msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery}.`);
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