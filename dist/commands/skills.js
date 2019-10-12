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
            if (!args[0]) {
                return;
            }
            var shikiQuery = args[0];
            this.accessSheet(shikiQuery, msgObject);
        });
    }
    accessSheet(shikiQuery, msgObject) {
        var shiki = false;
        var queryArray = [];
        for (let i = 0; i < update_1.default.skillArray.length; i++) {
            const aliasArray = update_1.default.skillArray[i][1].split(",");
            for (let x = 0; x < aliasArray.length; x++) {
                aliasArray[x] = aliasArray[x].toLowerCase();
            }
            if (update_1.default.skillArray[i][0].toLowerCase() == shikiQuery.toLowerCase()) {
                queryArray.push(update_1.default.skillArray[i]);
                shiki = true;
                continue;
            }
            if (aliasArray.indexOf(shikiQuery.toLowerCase()) != -1) {
                queryArray.push(update_1.default.skillArray[i]);
                shiki = true;
                continue;
            }
        }
        if (shiki) {
            var tempArray = [];
            var skill = queryArray[0][3];
            for (let i = 0; i < queryArray.length; i++) {
                if (queryArray[i][3] == skill) {
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
        else {
            msgObject.channel.send("Shikigami not found.");
        }
        ;
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
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = skills;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NraWxscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QyxxQ0FBOEI7QUFFOUIsTUFBcUIsTUFBTTtJQUEzQjtRQUVxQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBOEd6QyxDQUFDO0lBNUdHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUVqRixJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNWLE9BQU87YUFDVjtZQUVELElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFDRCxXQUFXLENBQUMsVUFBaUIsRUFBQyxTQUF5QjtRQUNyRCxJQUFJLEtBQUssR0FBUyxLQUFLLENBQUM7UUFDeEIsSUFBSSxVQUFVLEdBQUMsRUFBRSxDQUFDO1FBQ2xCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDbkMsTUFBTSxVQUFVLEdBQVcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFD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