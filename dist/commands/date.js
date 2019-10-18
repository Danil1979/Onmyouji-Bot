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
var FeastEnd;
var onGoingFeast = false;
var hoursDisplay = "00";
var minsDisplay = "00";
var daysDisplay = 0;
var interval = false;
class date {
    constructor() {
        this._command = "date";
    }
    help() {
        return "";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            setDate(client);
        });
    }
}
exports.default = date;
date.newDate = [];
function setDate(client) {
    countdown(client);
    if (interval == false) {
        interval = true;
        setInterval(function () { countdown(client); }, 60000);
    }
}
exports.setDate = setDate;
function countdown(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const feast1 = update_1.default.TimerArray[0];
        const feast2 = update_1.default.TimerArray[1];
        const now = moment.utc().subtract(5, "hours").format("YYYY-MM-DD HH:mm");
        const ESTnow = moment(now);
        console.log(ESTnow.format("YYYY-MM-DD HH:mm"));
        const feast1date = moment(feast1[1]);
        const feast2date = moment(feast2[1]);
        if (feast1date.isBefore(feast2date)) {
            var end = feast1date;
            var nextFeast = "feast1";
        }
        else {
            var end = feast2date;
            var nextFeast = "feast2";
        }
        var hours;
        if (onGoingFeast) {
            hours = createDisplayTime(ESTnow, FeastEnd);
        }
        else {
            hours = createDisplayTime(ESTnow, end);
        }
        const guild = client.guilds.get("404154708572373029");
        if (!guild) {
            console.log("Guild not found");
            return;
        }
        const timerChannel = guild.channels.get("633989276627107849");
        const nameChannel = guild.channels.get("634317691905376256");
        if (!timerChannel) {
            console.log("timerChannel not found");
            return;
        }
        if (!nameChannel) {
            console.log("nameChannel not found");
            return;
        }
        timerChannel.setName("⏱ " + daysDisplay + "D " + hoursDisplay + "H " + minsDisplay + "M");
        if (hours <= 0) {
            if (onGoingFeast) {
                onGoingFeast = false;
                timerChannel.setName("🎉 Feast is ending!");
                nameChannel.setName("🍖 " + "Time until Feast");
            }
            else {
                nameChannel.setName("🎉 " + "Feast is happening!");
                if (nextFeast == "feast1") {
                    FeastEnd = moment(feast1date).add(feast1[2], "minutes");
                    onGoingFeast = true;
                    feast1date.add(7, 'days');
                    feast1[1] = feast1date.format('YYYY-MM-DD HH:mm');
                }
                else {
                    FeastEnd = moment(feast2date).add(feast2[2], "minutes");
                    onGoingFeast = true;
                    feast2date.add(7, 'days');
                    feast2[1] = feast2date.format('YYYY-MM-DD HH:mm');
                }
                timerChannel.setName("🎉 Feast starts now!");
            }
            feast1.pop();
            feast2.pop();
            date.newDate.push(feast1);
            date.newDate.push(feast2);
            update_1.initialize();
        }
    });
}
function createDisplayTime(now, end) {
    const duration = moment.duration(end.diff(now));
    const hours = duration.asHours();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsaUNBQWlDO0FBQ2pDLHFDQUE4QztBQUU5QyxJQUFJLFFBQXNCLENBQUM7QUFDM0IsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDO0FBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztBQUM3QixJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7QUFDNUIsSUFBSSxXQUFXLEdBQVEsQ0FBQyxDQUFDO0FBRXpCLElBQUksUUFBUSxHQUFTLEtBQUssQ0FBQztBQUMzQixNQUFxQixJQUFJO0lBQXpCO1FBSXFCLGFBQVEsR0FBRyxNQUFNLENBQUM7SUFvQnZDLENBQUM7SUFsQkcsSUFBSTtRQUNGLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFakYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR2hCLENBQUM7S0FBQTs7QUFuQlAsdUJBd0JDO0FBdkJRLFlBQU8sR0FBUyxFQUFFLENBQUM7QUF3QjVCLFNBQWdCLE9BQU8sQ0FBQyxNQUFzQjtJQUM1QyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEIsSUFBRyxRQUFRLElBQUUsS0FBSyxFQUFDO1FBQ2pCLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDZCxXQUFXLENBQUMsY0FBVyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDO0FBTkQsMEJBTUM7QUFDRCxTQUFlLFNBQVMsQ0FBQyxNQUFxQjs7UUFHNUMsTUFBTSxNQUFNLEdBQUUsZ0JBQU0s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