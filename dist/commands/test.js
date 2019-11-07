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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLHFDQUE4QjtBQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQztJQW9CdkMsQ0FBQztJQWxCRyxJQUFJO1FBQ0EsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNWLE9BQU87YUFDVjtZQUNELFdBQVcsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtDQUlKO0FBdEJELHVCQXNCQztBQUVELFNBQVMsV0FBVyxDQUFDLFVBQWlCLEVBQUMsU0FBeUIsRUFBQyxPQUFlO0lBQzVFLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FBQztJQUNsQixJQUFJLEtBQUssR0FBUyxLQUFLLENBQUM7SUFDeEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztRQUN2QyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7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