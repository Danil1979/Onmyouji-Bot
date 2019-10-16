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
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            setDate(args, msgObject, client);
        });
    }
}
exports.default = date;
date.newDate = [];
function setDate(args, msgObject, client) {
    countdown(msgObject);
    if (interval == false) {
        interval = true;
        setInterval(function () { countdown(msgObject); }, 60000);
    }
}
exports.setDate = setDate;
function countdown(msgObject) {
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
        const timerChannel = msgObject.guild.channels.get("633989276627107849");
        const nameChannel = msgObject.guild.channels.get("633986619376009216");
        if (!timerChannel) {
            console.log("timerChannel not found");
            return;
        }
        if (!nameChannel) {
            console.log("nameChannel not found");
            return;
        }
        if (daysDisplay > 0) {
            timerChannel.setName("⏱ " + daysDisplay + "D " + hoursDisplay + "H " + minsDisplay + "M");
        }
        if (hours <= 0) {
            if (onGoingFeast) {
                onGoingFeast = false;
                timerChannel.setName("🎉 Feast is ending!");
                nameChannel.setName("(TESTING)🍖 " + "Time until Feast");
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
    console.log(end.format("YYYY-MM-DD HH:mm"));
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
        hoursDisplay = hours.toString();
    }
    if (Minutes.toString().length == 1) {
        minsDisplay = "0" + Minutes;
    }
    else {
        minsDisplay = Minutes.toString();
    }
    return hours;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsaUNBQWlDO0FBQ2pDLHFDQUE4QztBQUU5QyxJQUFJLFFBQXNCLENBQUM7QUFDM0IsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDO0FBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztBQUM3QixJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7QUFDNUIsSUFBSSxXQUFXLEdBQVEsQ0FBQyxDQUFDO0FBRXpCLElBQUksUUFBUSxHQUFTLEtBQUssQ0FBQztBQUMzQixNQUFxQixJQUFJO0lBQXpCO1FBSXFCLGFBQVEsR0FBRyxNQUFNLENBQUM7SUFtQnZDLENBQUM7SUFqQkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRWpGLE9BQU8sQ0FBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9CLENBQUM7S0FBQTs7QUFsQlAsdUJBdUJDO0FBdEJRLFlBQU8sR0FBUyxFQUFFLENBQUM7QUF1QjVCLFNBQWdCLE9BQU8sQ0FBQyxJQUFhLEVBQUMsU0FBMEIsRUFBQyxNQUFxQjtJQUNwRixTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsSUFBRyxRQUFRLElBQUUsS0FBSyxFQUFDO1FBQ2pCLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDZCxXQUFXLENBQUMsY0FBVyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEQ7QUFDSCxDQUFDO0FBTkQsMEJBTUM7QUFDRCxTQUFlLFNB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