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
const moment = require("moment");
const update_1 = require("./update");
var interval = false;
var hoursDisplay = "00";
var minsDisplay = "00";
var daysDisplay = 0;
class testCommand {
    constructor() {
        this._command = "testCommand";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = testCommand;
testCommand.birthday = [];
function setBirthday(client) {
    countdown(client);
    if (interval == false) {
        interval = true;
        setInterval(function () { countdown(client); }, 60000);
    }
}
exports.setBirthday = setBirthday;
function countdown(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = moment.utc().format("YYYY-MM-DD");
        const stringNow = moment(now);
        console.log(now);
        const guild = client.guilds.get("225237819528970241");
        if (!guild) {
            console.log("GJR Guild not found");
            return;
        }
        const end = update_1.default.birthdayArray[0];
        console.log(end[0]);
        const stringEnd = moment(end[0]);
        const hours = createDisplayTime(stringNow, stringEnd);
        const timerChannel = guild.channels.get("669600656591421460");
        if (!timerChannel) {
            console.log("timerChannel not found");
            return;
        }
        timerChannel.setName("⏱ " + daysDisplay + "D " + hoursDisplay + "H " + minsDisplay + "M");
    });
}
function createDisplayTime(now, end) {
    console.log("end" + end);
    const duration = moment.duration(end.diff(now));
    const hours = duration.asHours();
    console.log(hours);
    daysDisplay = Math.floor(hours / 24);
    var Remainder = hours % 24;
    var Hour = Math.floor(Remainder);
    var Minutes = Math.floor(60 * (Remainder - Hour));
    if (Hour.toString().length == 1) {
        hoursDisplay = "0" + Hour.toString();
    }
    else {
        hoursDisplay = Hour.toString();
    }
    if (Minutes.toString().length == 1) {
        minsDisplay = "0" + Minutes;
    }
    else {
        minsDisplay = Minutes.toString();
    }
    return hours;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlydGhkYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYmlydGhkYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxpQ0FBaUM7QUFDakMscUNBQThDO0FBRTlDLElBQUksUUFBUSxHQUFTLEtBQUssQ0FBQztBQUMzQixJQUFJLFlBQVksR0FBUSxJQUFJLENBQUM7QUFDN0IsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDO0FBQzVCLElBQUksV0FBVyxHQUFRLENBQUMsQ0FBQztBQUV6QixNQUFxQixXQUFXO0lBQWhDO1FBR3FCLGFBQVEsR0FBRyxhQUFhLENBQUM7SUFhOUMsQ0FBQztJQVhHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztRQUVuRixDQUFDO0tBQUE7O0FBZkwsOEJBZ0JDO0FBZlUsb0JBQVEsR0FBUyxFQUFFLENBQUM7QUFnQi9CLFNBQWdCLFdBQVcsQ0FBQyxNQUFzQjtJQUM5QyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEIsSUFBRyxRQUFRLElBQUUsS0FBSyxFQUFDO1FBQ2pCLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDZCxXQUFXLENBQUMsY0FBVyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDO0FBTkgsa0NBTUc7QUFFSCxTQUFlLFNBQVMsQ0FBQyxNQUFzQjs7UUFDM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FB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