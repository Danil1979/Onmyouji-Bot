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
const queue = new Map();
class skills {
    constructor() {
        this._command = "skills";
    }
    help() {
        return "skills";
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
            accessSheet(shikiQuery, msgObject, false);
        });
    }
}
exports.default = skills;
function accessSheet(shikiQuery, msgObject, retried) {
    let shikiArray = [];
    let shiki = false;
    for (var i = 0; i < update_1.default.skillArray.length; i++) {
        const aliasArray = update_1.default.skillArray[i][1].split(",");
        for (let x = 0; x < aliasArray.length; x++) {
            aliasArray[x] = aliasArray[x].trim();
            aliasArray[x] = aliasArray[x].toLowerCase();
        }
        if (update_1.default.skillArray[i][0].toLowerCase() == shikiQuery.toLowerCase()) {
            shikiArray.push(update_1.default.skillArray[i]);
            shiki = true;
            break;
        }
        if (aliasArray.indexOf(shikiQuery.toLowerCase()) != -1) {
            shikiArray.push(update_1.default.skillArray[i]);
            shiki = true;
            break;
        }
    }
    if (shiki) {
        console.log("shiki found");
        for (let x = i + 1; x < update_1.default.skillArray.length; x++) {
            if (update_1.default.skillArray[x][0] != "") {
                break;
            }
            shikiArray.push(update_1.default.skillArray[x]);
        }
        let tempArray = [];
        let skillArray = [];
        let skillName = shikiArray[0][3];
        for (let i = 0; i < shikiArray.length; i++) {
            if (shikiArray[i][3] == skillName || shikiArray[i][3] == "") {
                tempArray.push(shikiArray[i]);
            }
            else {
                skillArray.push(tempArray.slice(0));
                skillName = shikiArray[i][3];
                tempArray.splice(0, shikiArray.length);
                tempArray.push(shikiArray[i]);
            }
        }
        skillArray.push(tempArray.slice(0));
        queue.set(msgObject.guild.id, skillArray);
        const embedArray = [];
        skillArray.forEach(embed => {
            embedArray.push(format(embed));
        });
        sendMessage(embedArray, msgObject);
    }
    else {
        msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery} to display it's skills.`);
    }
}
function format(tempArray) {
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
    var skillDisplay = "";
    var level = "Level";
    var effect = "Effect";
    if (tempArray[0][5] == "") {
        skillDisplay = "\u200b";
        level = "\u200b";
        effect = "\u200b";
    }
    else {
        for (let i = 0; i < tempArray.length; i++) {
            skillDisplay += tempArray[i][5];
            skillDisplay += ". ";
            skillDisplay += tempArray[i][4];
            skillDisplay += "\n";
        }
    }
    let embed = new Discord.RichEmbed()
        .setAuthor(shikiSkill.skillname)
        .setDescription(shikiSkill.skillDescription)
        .setThumbnail(shikiSkill.thumbnail)
        .setColor("RANDOM")
        .addField("Type", shikiSkill.type, true)
        .addField("Onibi", shikiSkill.onibi, true)
        .addField(level + " and " + effect, skillDisplay, false);
    for (let i = 0; i < noteArray.length; i++) {
        embed.addField(noteArray[i], noteArrayValue[i], true);
    }
    return embed;
}
function sendMessage(embedArray, msgObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageID = yield msgObject.channel.send(embedArray[0]).then(msg => {
            return msg.id;
        });
        const msg = yield msgObject.channel.fetchMessage(messageID);
        setTimeout(() => {
            sendMessage2(msg, msgObject, embedArray);
        }, 500);
    });
}
function sendMessage2(msg, msgObject, embedArray) {
    return __awaiter(this, void 0, void 0, function* () {
        yield msg.react('👍').then(() => msg.react('👎'));
        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msgObject.author.id;
        };
        messageReact(filter, msg, embedArray, 0);
    });
}
function messageReact(filter, msg, embedArray, index) {
    msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
        .then(collected => {
        const botReaction = collected.first();
        botReaction.users.forEach(user => {
            if (user.id != "631907096555946028") {
                botReaction.remove(user.id);
            }
        });
        if (botReaction.emoji.name === '👍') {
            index--;
            if (index <= -1) {
                index = 3;
            }
            msg.edit(embedArray[index]);
            messageReact(filter, msg, embedArray, index);
        }
        else {
            index++;
            if (index >= 3) {
                index = 0;
            }
            msg.edit(embedArray[index]);
            messageReact(filter, msg, embedArray, index);
        }
    })
        .catch(collected => {
        msg.delete();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NraWxscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QyxxQ0FBOEI7QUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFxQixNQUFNO0lBQTNCO1FBRXFCLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFvQnpDLENBQUM7SUFsQkcsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDVixPQUFPO2FBQ1Y7WUFDRCxXQUFXLENBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7Q0FJSjtBQXRCRCx5QkFzQkM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxVQUFpQixFQUFDLFNBQXlCLEVBQUMsT0FBZTtJQUM1RSxJQUFJLFVBQVUsR0FBQyxFQUFFLENBQUM7SUFDbEIsSUFBSSxLQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3hCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7UUFDdkMsTUFBTSxVQUFVLEdBQVcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxD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