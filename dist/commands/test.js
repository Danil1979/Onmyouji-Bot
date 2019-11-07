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
class test {
    constructor() {
        this._command = "test";
    }
    help() {
        return "test";
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
exports.default = test;
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
        skillArray.forEach(element => {
            embedArray.push(format(element, msgObject));
        });
        sendMessage(embedArray, msgObject);
    }
}
function format(tempArray, msgObject) {
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
        .addField(level + " and " + effect, skillLevel + " " + skillUpgrade, false);
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
    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
        const botReaction = collected.first();
        const temp = collected.last();
        for (let i = 0; i < collected.size; i++) {
            console.log(i);
            collected.first().remove("222728476816310272");
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLHFDQUE4QjtBQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQztJQW9CdkMsQ0FBQztJQWxCRyxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNWLE9BQU87YUFDVjtZQUNELFdBQVcsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtDQUlKO0FBdEJELHVCQXNCQztBQUVELFNBQVMsV0FBVyxDQUFDLFVBQWlCLEVBQUMsU0FBeUIsRUFBQyxPQUFlO0lBQzVFLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FBQztJQUNsQixJQUFJLEtBQUssR0FBUyxLQUFLLENBQUM7SUFDeEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztRQUN2QyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7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