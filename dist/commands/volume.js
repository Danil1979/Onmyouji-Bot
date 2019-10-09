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
            const volumeNumber = +args[0];
            if (!args[0]) {
                msgObject.channel.send(`>>> Volume:${volume.volume}%`);
                return;
            }
            if (!msgObject.guild.voiceConnection.dispatcher) {
                msgObject.channel.send(">>> Theres no music playing.");
                return;
            }
            if (isNaN(volumeNumber) || volumeNumber > 200 || volumeNumber < 0) {
                msgObject.channel.send(">>> Please enter a number in between 0-200.");
                return;
            }
            msgObject.guild.voiceConnection.dispatcher.setVolume(volumeNumber / 100);
            msgObject.channel.send(`>>> Volume: ${volumeNumber}%`);
            volume.volume = volumeNumber;
            return;
        });
    }
}
exports.default = volume;
volume.volume = 100;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQXFCLE1BQU07SUFBM0I7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQXVDekMsQ0FBQztJQXJDRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsTUFBTSxZQUFZLEdBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDUixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPO2FBQ1Y7WUFDRCxJQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFDO2dCQUMzQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPO2FBQ1Y7WUFLRCxJQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBRyxZQUFZLEdBQUMsR0FBRyxJQUFFLFlBQVksR0FBQyxDQUFDLEVBQUM7Z0JBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBQ3RFLE9BQU87YUFDWDtZQUNILFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQztZQUMzQixPQUFPO1FBR1QsQ0FBQztLQUFBOztBQXJDTCx5QkF5Q0M7QUF4Q1UsYUFBTSxHQUFDLEdBQUcsQ0FBQyJ9