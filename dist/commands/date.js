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
            if (client.user.id == "634326983655948308") {
                setDate(client);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsaUNBQWlDO0FBQ2pDLHFDQUE4QztBQUU5QyxJQUFJLFFBQXNCLENBQUM7QUFDM0IsSUFBSSxZQUFZLEdBQVMsS0FBSyxDQUFDO0FBQy9CLElBQUksWUFBWSxHQUFRLElBQUksQ0FBQztBQUM3QixJQUFJLFdBQVcsR0FBUSxJQUFJLENBQUM7QUFDNUIsSUFBSSxXQUFXLEdBQVEsQ0FBQyxDQUFDO0FBRXpCLElBQUksUUFBUSxHQUFTLEtBQUssQ0FBQztBQUMzQixNQUFxQixJQUFJO0lBQXpCO1FBSXFCLGFBQVEsR0FBRyxNQUFNLENBQUM7SUFzQnZDLENBQUM7SUFwQkcsSUFBSTtRQUNGLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDakYsSUFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBRSxvQkFBb0IsRUFBQztnQkFDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pCO1FBSUQsQ0FBQztLQUFBOztBQXJCUCx1QkEwQkM7QUF6QlEsWUFBTyxHQUFTLEVBQUUsQ0FBQztBQTBCNUIsU0FBZ0IsT0FBTyxDQUFDLE1BQXNCO0lBQzVDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQixJQUFHLFFBQVEsSUFBRSxLQUFLLEVBQUM7UUFDakIsUUFBUSxHQUFDLElBQUksQ0FBQztRQUNkLFdBQVcsQ0FBQyxjQUFXLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNuRDtBQUNILENBQUM7QUFORCww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