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
class volume {
    constructor() {
        this._command = "volume";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            const volumeNumber = +args[0];
            if (!msgObject.guild.voiceConnection.dispatcher) {
                msgObject.channel.send(">>> Theres no music playing.");
                return;
            }
            if (!volumeNumber) {
                msgObject.channel.send(`>>> Volume: ${msgObject.guild.voiceConnection.dispatcher.volume * 100}%`);
                return;
            }
            if (isNaN(volumeNumber) || volumeNumber > 200 || volumeNumber < 0) {
                msgObject.channel.send(">>> Please enter a number in between 0-200.");
                return;
            }
            msgObject.guild.voiceConnection.dispatcher.setVolume(volumeNumber / 100);
            msgObject.channel.send(`>>> Volume: ${volumeNumber}%`);
        });
    }
}
exports.default = volume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3ZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQXFCLE1BQU07SUFBM0I7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQStCekMsQ0FBQztJQTdCRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE1BQU0sWUFBWSxHQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUM7Z0JBQzNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQ3ZELE9BQU87YUFDVjtZQUNELElBQUcsQ0FBQyxZQUFZLEVBQUM7Z0JBQ2IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hHLE9BQU87YUFDVjtZQUNELElBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFHLFlBQVksR0FBQyxHQUFHLElBQUUsWUFBWSxHQUFDLENBQUMsRUFBQztnQkFDckQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQztnQkFDdEUsT0FBTzthQUNYO1lBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FBQTtDQUlKO0FBakNELHlCQWlDQyJ9