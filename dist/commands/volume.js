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
            if (!args[0]) {
                msgObject.channel.send(`>>> Volume:${volume.volume}%`);
                return;
            }
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
            volume.volume = volumeNumber;
            return;
        });
    }
}
exports.default = volume;
volume.volume = 100;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQXFCLE1BQU07SUFBM0I7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQXVDekMsQ0FBQztJQXJDRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE1BQU0sWUFBWSxHQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDdkQsT0FBTzthQUNWO1lBQ0QsSUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBQztnQkFDM0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDdkQsT0FBTzthQUNWO1lBQ0QsSUFBRyxDQUFDLFlBQVksRUFBQztnQkFDYixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDaEcsT0FBTzthQUNWO1lBQ0QsSUFBRyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUcsWUFBWSxHQUFDLEdBQUcsSUFBRSxZQUFZLEdBQUMsQ0FBQyxFQUFDO2dCQUNyRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPO2FBQ1g7WUFDSCxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLE1BQU0sR0FBQyxZQUFZLENBQUM7WUFDM0IsT0FBTztRQUdULENBQUM7S0FBQTs7QUFyQ0wseUJBeUNDO0FBeENVLGFBQU0sR0FBQyxHQUFHLENBQUMifQ==