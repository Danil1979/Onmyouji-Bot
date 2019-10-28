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
class skills {
    constructor() {
        this._command = "skills";
    }
    help() {
        return "~skills shikiname|to search for a shiki's skill set.\n";
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
            var shiki = false;
            var queryArray = [];
            for (var i = 0; i < update_1.default.skillArray.length; i++) {
                const aliasArray = update_1.default.skillArray[i][1].split(",");
                for (let x = 0; x < aliasArray.length; x++) {
                    if (aliasArray[x].charAt(0) == " ") {
                        aliasArray[x] = aliasArray[x].substring(1);
                    }
                    aliasArray[x] = aliasArray[x].toLowerCase();
                }
                if (update_1.default.skillArray[i][0].toLowerCase() == shikiQuery.toLowerCase()) {
                    queryArray.push(update_1.default.skillArray[i]);
                    shiki = true;
                    break;
                }
                if (aliasArray.indexOf(shikiQuery.toLowerCase()) != -1) {
                    queryArray.push(update_1.default.skillArray[i]);
                    shiki = true;
                    break;
                }
            }
            for (let x = i + 1; x < update_1.default.skillArray.length; x++) {
                if (update_1.default.skillArray[x][0] != "") {
                    break;
                }
                queryArray.push(update_1.default.skillArray[x]);
            }
            if (shiki) {
                var tempArray = [];
                var skill = queryArray[0][3];
                for (let i = 0; i < queryArray.length; i++) {
                    if (queryArray[i][3] == skill || queryArray[i][3] == "") {
                        tempArray.push(queryArray[i]);
                    }
                    else {
                        this.format(tempArray, msgObject);
                        skill = queryArray[i][3];
                        tempArray.splice(0, queryArray.length);
                        tempArray.push(queryArray[i]);
                    }
                }
                this.format(tempArray, msgObject);
            }
            else if (!shiki && retried) {
                msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery} to display it's skills.`);
                return;
            }
            else if (!shiki && !retried) {
                yield update_1.initialize();
                this.accessSheet(shikiQuery, msgObject, true);
            }
            ;
        });
    }
    format(tempArray, msgObject) {
        const shikiSkill = {
            name: tempArray[0][0],
            skillDescription: tempArray[0][3],
            type: tempArray[0][6],
            coldown: tempArray[0][7],
            onibi: tempArray[0][8],
            thumbnail: tempArray[0][9],
            skillname: tempArray[0][10]
        };
        var noteArray = [];
        var noteArrayValue = [];
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i][11]) {
                noteArray.push(tempArray[i][11]);
                noteArrayValue.push(tempArray[i][12]);
            }
        }
        var skillLevel = "";
        var skillUpgrade = "";
        var level = "Level";
        var effect = "Effect";
        if (tempArray[0][5] == "") {
            skillLevel = "\u200b";
            skillUpgrade = "\u200b";
            level = "\u200b";
            effect = "\u200b";
        }
        else {
            for (let i = 0; i < tempArray.length; i++) {
                skillLevel += tempArray[i][5];
                skillLevel += "\n";
                skillUpgrade += tempArray[i][4];
                skillUpgrade += "\n";
            }
        }
        let embed = new Discord.RichEmbed()
            .setAuthor(shikiSkill.skillname)
            .setDescription(shikiSkill.skillDescription)
            .setThumbnail(shikiSkill.thumbnail)
            .setColor("RANDOM")
            .addField("Type", shikiSkill.type, true)
            .addField("Onibi", shikiSkill.onibi, true)
            .addField(level, skillLevel, true)
            .addField(effect, skillUpgrade, true);
        for (let i = 0; i < noteArray.length; i++) {
            embed.addField(noteArray[i], noteArrayValue[i], true);
        }
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = skills;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NraWxscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QyxxQ0FBOEM7QUFFOUMsTUFBcUIsTUFBTTtJQUEzQjtRQUVxQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBMEl6QyxDQUFDO0lBeElHLElBQUk7UUFDQSxPQUFPLHdEQUF3RCxDQUFDO0lBQ3BFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQ2pGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDVixPQUFPO2FBQ1Y7WUFHRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBQ0ssV0FBVyxDQUFDLFVBQWlCLEVBQUMsU0FBeUIsRUFBQyxPQUFlOztZQUMzRSxJQUFJLEtBQUssR0FBUyxLQUFLLENBQUM7WUFDeEIsSUFBSSxVQUFVLEdBQUMsRUFBRSxDQUFDO1lBRWxCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQ25DLE1BQU0sVUFBVSxHQUFXLGdCQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFD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