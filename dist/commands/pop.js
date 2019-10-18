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
const play_1 = require("./play");
class pop {
    constructor() {
        this._command = "pop";
    }
    help() {
        return "~pop|to remove the most recently queue song.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!msgObject.guild.voiceConnection || !msgObject.guild.voiceConnection.dispatcher) {
                    msgObject.channel.send(">>> No music are playing at the moment.");
                    return;
                }
                if (play_1.default.bigQueue[play_1.default.channelList.indexOf(msgObject.member.voiceChannel.id)].length == 1) {
                    msgObject.channel.send(">>> I can't remove the only song in the queue.");
                    return;
                }
                const removedSong = play_1.default.bigQueue[play_1.default.channelList.indexOf(msgObject.member.voiceChannel.id)].pop();
                msgObject.channel.send(`>>> Successfully removed ${removedSong.title} from the queue.`);
                return;
            }
            catch (err) {
                console.error("Error occured in pop.ts");
            }
        });
    }
}
exports.default = pop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3BvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLGlDQUF5QjtBQUN6QixNQUFxQixHQUFHO0lBQXhCO1FBRXFCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFnQ3RDLENBQUM7SUE5QkcsSUFBSTtRQUNBLE9BQU8sZ0RBQWdELENBQUM7SUFDNUQsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsSUFBRztnQkFDQyxJQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUM7b0JBQzdFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7b0JBQ2xFLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBRyxjQUFJLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQztvQkFDbkYsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELENBQUMsQ0FBQztvQkFDekUsT0FBTztpQkFDVjtnQkFDRCxNQUFNLFdBQVcsR0FBTSxjQUFJLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixXQUFXLENBQUMsS0FBSyxrQkFBa0IsQ0FBQyxDQUFBO2dCQUNuRixPQUFPO2FBQ2Q7WUFBQSxPQUFNLEdBQUcsRUFBQztnQkFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDNUM7UUFHTCxDQUFDO0tBQUE7Q0FJSjtBQWxDRCxzQkFrQ0MifQ==