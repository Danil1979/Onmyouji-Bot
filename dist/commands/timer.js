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
class timer {
    constructor() {
        this._command = "timer";
    }
    help() {
        return "";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                return;
            }
            var d = new Date();
            const timerChannel = msgObject.guild.channels.get("633311434394173441");
            const minutes = +args[0];
            if (isNaN(minutes)) {
                return;
            }
            if (timerChannel) {
                var time = convertMinsToHrsMins(minutes);
                timerChannel.setName(time);
            }
        });
    }
}
exports.default = timer;
function convertMinsToHrsMins(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ? 0 + h : h;
    m = m < 10 ? 0 + m : m;
    return h + ':' + m;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxNQUFxQixLQUFLO0lBQTFCO1FBRXFCLGFBQVEsR0FBRyxPQUFPLENBQUM7SUE2QnhDLENBQUM7SUEzQkcsSUFBSTtRQUNBLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDakYsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDUixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ25CLE1BQU0sWUFBWSxHQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sT0FBTyxHQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDO2dCQUNkLE9BQU87YUFDVjtZQUNELElBQUcsWUFBWSxFQUFDO2dCQUNkLElBQUksSUFBSSxHQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVuQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1FBSUwsQ0FBQztLQUFBO0NBQ0E7QUEvQkQsd0JBK0JDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FBQyxPQUFjO0lBRXhDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQyJ9