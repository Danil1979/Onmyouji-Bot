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
        return "~volume 1-200|To adjust the volume of the music bot.\n";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQXFCLE1BQU07SUFBM0I7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQXVDekMsQ0FBQztJQXJDRyxJQUFJO1FBQ0EsT0FBTyx3REFBd0QsQ0FBQztJQUNwRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxNQUFNLFlBQVksR0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNSLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU87YUFDVjtZQUNELElBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUM7Z0JBQzNDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQ3ZELE9BQU87YUFDVjtZQUtELElBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFHLFlBQVksR0FBQyxHQUFHLElBQUUsWUFBWSxHQUFDLENBQUMsRUFBQztnQkFDckQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkNBQTZDLENBQUMsQ0FBQztnQkFDdEUsT0FBTzthQUNYO1lBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLEdBQUMsWUFBWSxDQUFDO1lBQzNCLE9BQU87UUFHVCxDQUFDO0tBQUE7O0FBckNMLHlCQXlDQztBQXhDVSxhQUFNLEdBQUMsR0FBRyxDQUFDIn0=