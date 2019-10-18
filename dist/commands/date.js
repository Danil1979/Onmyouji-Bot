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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsaUNBQWlDO0FBQ2pDLHFDQUE4QztBQUU5QyxJQUFJLFFBQXNCLENBQUM7QUFDM0IsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDO0FBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztBQUM3QixJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7QUFDNUIsSUFBSSxXQUFXLEdBQVEsQ0FBQyxDQUFDO0FBRXpCLElBQUksUUFBUSxHQUFTLEtBQUssQ0FBQztBQUMzQixNQUFxQixJQUFJO0lBQXpCO1FBSXFCLGFBQVEsR0FBRyxNQUFNLENBQUM7SUFvQnZDLENBQUM7SUFsQkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRWpGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUdoQixDQUFDO0tBQUE7O0FBbkJQLHVCQXdCQztBQXZCUSxZQUFPLEdBQVMsRUFBRSxDQUFDO0FBd0I1QixTQUFnQixPQUFPLENBQUMsTUFBc0I7SUFDNUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLElBQUcsUUFBUSxJQUFFLEtBQUssRUFBQztRQUNqQixRQUFRLEdBQUMsSUFBSSxDQUFDO1FBQ2QsV0FBVyxDQUFDLGNBQVcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25EO0FBQ0gsQ0FBQztBQU5ELDBCQU1DO0FBQ0QsU0FBZSxTQUFTLENBQUMsTUFBcUI7O1FBRzVDLE1BQU0sTUFBTSxHQUFFLGdCQUFN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