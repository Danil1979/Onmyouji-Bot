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
        return "testing";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3BvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLGlDQUF5QjtBQUN6QixNQUFxQixHQUFHO0lBQXhCO1FBRXFCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFnQ3RDLENBQUM7SUE5QkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLElBQUc7Z0JBQ0MsSUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxJQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFDO29CQUM3RSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO29CQUNsRSxPQUFPO2lCQUNWO2dCQUNELElBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7b0JBQ25GLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7b0JBQ3pFLE9BQU87aUJBQ1Y7Z0JBQ0QsTUFBTSxXQUFXLEdBQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN2RyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsV0FBVyxDQUFDLEtBQUssa0JBQWtCLENBQUMsQ0FBQTtnQkFDbkYsT0FBTzthQUNkO1lBQUEsT0FBTSxHQUFHLEVBQUM7Z0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQzVDO1FBR0wsQ0FBQztLQUFBO0NBSUo7QUFsQ0Qsc0JBa0NDIn0=