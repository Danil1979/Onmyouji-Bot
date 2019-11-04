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
const update_1 = require("./update");
const bounties_1 = require("./bounties");
class clues {
    constructor() {
        this._command = "clues";
    }
    help() {
        return "clues";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluesString = args.join(" ");
            if (!args[0]) {
                return;
            }
            const cluesQuery = cluesString.split(",");
            accessSheet(cluesQuery, msgObject, false);
        });
    }
}
exports.default = clues;
function accessSheet(cluesQuery, msgObject, retried) {
    return __awaiter(this, void 0, void 0, function* () {
        const clues = new Map();
        for (let i = 0; i < update_1.default.cluesArray.length; i++) {
            const clueArray = update_1.default.cluesArray[i][0].split(",");
            for (let x = 0; x < clueArray.length; x++) {
                clueArray[x] = clueArray[x].trim();
                clueArray[x] = clueArray[x].toLowerCase();
            }
            var count = 0;
            cluesQuery.forEach(clue => {
                if (clueArray.indexOf(clue.trim()) != -1) {
                    count++;
                    clues.set(update_1.default.cluesArray[i][1], count);
                }
            });
        }
        let shiki = Array.from(clues.entries());
        let matched = false;
        shiki.forEach(shiki => {
            if (shiki[1] == cluesQuery.length) {
                matched = true;
                bounties_1.accessBountySheet(shiki[0], msgObject, false);
            }
        });
        if (!matched) {
            msgObject.channel.send(">>> No matching clue(s) tag found.");
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY2x1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBOEI7QUFFOUIseUNBQWdEO0FBRWhELE1BQXFCLEtBQUs7SUFBMUI7UUFFcUIsYUFBUSxHQUFHLE9BQU8sQ0FBQztJQTZCeEMsQ0FBQztJQTNCRyxJQUFJO1FBQ0EsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNSLE9BQU87YUFDVjtZQUVELE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFHM0MsV0FBVyxDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFNM0MsQ0FBQztLQUFBO0NBSUo7QUEvQkQsd0JBK0JDO0FBQ0QsU0FBZSxXQUFXLENBQUMsVUFBbUIsRUFBQyxTQUF5QixFQUFDLE9BQWU7O1FBQ3BGLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFFeEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGdCQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUN2QyxNQUFNLFNBQVMsR0FBVyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFN0QsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBRTNCLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRXJDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFFM0M7WUFDRCxJQUFJLEtBQUssR0FBRSxDQUFDLENBQUM7WUFDYixVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUV0QixJQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUM7b0JBQ2xDLEtBQUssRUFBRSxDQUFDO29CQUNSLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FjTjtRQUNELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUMsS0FBSyxDQUFDO1FBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBRSxVQUFVLENBQUMsTUFBTSxFQUFDO2dCQUM5QixPQUFPLEdBQUMsSUFBSSxDQUFDO2dCQUNiLDRCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUcsQ0FBQyxPQUFPLEVBQUM7WUFDWCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ2hFO0lBWUwsQ0FBQztDQUFBIn0=