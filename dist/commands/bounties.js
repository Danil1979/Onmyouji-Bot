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
class bounties {
    constructor() {
        this._command = "bounties";
    }
    help() {
        return "bounties";
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
            accessBountySheet(shikiQuery, msgObject, false);
        });
    }
}
exports.default = bounties;
function accessBountySheet(shikiQuery, msgObject, retried) {
    return __awaiter(this, void 0, void 0, function* () {
        var shiki;
        for (let i = 0; i < update_1.default.bountiesArray.length; i++) {
            const aliasArray = update_1.default.bountiesArray[i][1].split(",");
            for (let x = 0; x < aliasArray.length; x++) {
                if (aliasArray[x].charAt(0) == " ") {
                    aliasArray[x] = aliasArray[x].substring(1);
                }
                aliasArray[x] = aliasArray[x].toLowerCase();
            }
            if (update_1.default.bountiesArray[i][0].toLowerCase() == shikiQuery.toLowerCase()) {
                shiki = update_1.default.bountiesArray[i];
                break;
            }
            if (aliasArray.indexOf(shikiQuery.toLowerCase()) != -1) {
                shiki = update_1.default.bountiesArray[i];
                break;
            }
        }
        if (shiki) {
            format(shiki, msgObject);
        }
        else if (!shiki && retried) {
            msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery}.`);
            return;
        }
        else if (!shiki && !retried) {
            yield update_1.initialize();
            accessBountySheet(shikiQuery, msgObject, true);
        }
        ;
    });
}
exports.accessBountySheet = accessBountySheet;
function format(shikiArray, msgObject) {
    const bounty = {
        shikiName: shikiArray[1],
        recommendation: shikiArray[3],
        alternatives: shikiArray[4],
        hint: shikiArray[0]
    };
    let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Shikigami: ${bounty.shikiName}`);
    if (bounty.hint) {
        embed.addField(`Clues: `, bounty.hint, false);
    }
    embed
        .setDescription("*The number in the bracket indicates how many kills you get per run*")
        .addField("Chapter/Challenge/Seal:", bounty.recommendation, false)
        .addField("Secret Zones(Stg = Stage): ", bounty.alternatives, false);
    msgObject.channel.send(embed);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYm91bnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMscUNBQThDO0FBRTlDLE1BQXFCLFFBQVE7SUFBN0I7UUFFcUIsYUFBUSxHQUFHLFVBQVUsQ0FBQztJQXNCM0MsQ0FBQztJQXBCRyxJQUFJO1FBQ0EsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNSLE9BQU87YUFDVjtZQUdELGlCQUFpQixDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0NBSUo7QUF4QkQsMkJBd0JDO0FBRUQsU0FBc0IsaUJBQWlCLENBQUMsVUFBaUIsRUFBQyxTQUF5QixFQUFDLE9BQWU7O1FBQy9GLElBQUksS0FBSyxDQUFDO1FBQ1YsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGdCQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUN0QyxNQUFNLFVBQVUsR0FBVyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsQ0FB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