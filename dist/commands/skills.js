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
        return "testing";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NraWxscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QyxxQ0FBOEM7QUFFOUMsTUFBcUIsTUFBTTtJQUEzQjtRQUVxQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBMEl6QyxDQUFDO0lBeElHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUNqRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1YsT0FBTzthQUNWO1lBR0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUNLLFdBQVcsQ0FBQyxVQUFpQixFQUFDLFNBQXlCLEVBQUMsT0FBZTs7WUFDM0UsSUFBSSxLQUFLLEdBQVMsS0FBSyxDQUFDO1lBQ3hCLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FBQztZQUVsQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUNuQyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxV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