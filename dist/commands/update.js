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
const googleapis_1 = require("googleapis");
const date_1 = require("./date");
class update {
    constructor() {
        this._command = "update";
    }
    help() {
        return "";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield initialize();
            msgObject.channel.send(">>> Updated.");
        });
    }
}
exports.default = update;
update.dataArray = [];
update.skillArray = [];
update.TimerArray = [];
update.soulArray = [];
update.bountiesArray = [];
update.cluesArray = [];
update.birthdayArray = [];
function gsrun(gclient) {
    return __awaiter(this, void 0, void 0, function* () {
        const gclientapi = googleapis_1.google.sheets({ version: "v4", auth: gclient });
        const opt = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Stats"
        };
        const skill = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Skills"
        };
        const timer = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Timers"
        };
        const soul = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Souls"
        };
        const bounties = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Bounties!A:E"
        };
        const clues = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Bounties!A:B"
        };
        const updateOption = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Timers!A2",
            valueInputOption: 'USER_ENTERED',
            resource: { values: date_1.default.newDate }
        };
        const birthdayDate = {
            spreadsheetId: "1Qk9bphpJgYi1ZY9mSXx7IdTG70HwL7R0KK35OtvZbtg",
            range: "Date"
        };
        if (date_1.default.newDate === undefined || date_1.default.newDate.length == 0) {
            let birthdayData = yield gclientapi.spreadsheets.values.get(birthdayDate);
            let soulData = yield gclientapi.spreadsheets.values.get(soul);
            let data = yield gclientapi.spreadsheets.values.get(opt);
            let skillData = yield gclientapi.spreadsheets.values.get(skill);
            let timerData = yield gclientapi.spreadsheets.values.get(timer);
            let bountiesData = yield gclientapi.spreadsheets.values.get(bounties);
            let cluesData = yield gclientapi.spreadsheets.values.get(clues);
            update.birthdayArray = birthdayData.data.values || [];
            update.soulArray = soulData.data.values || [];
            update.dataArray = data.data.values || [];
            update.skillArray = skillData.data.values || [];
            update.TimerArray = timerData.data.values || [];
            update.bountiesArray = bountiesData.data.values || [];
            update.cluesArray = cluesData.data.values || [];
            update.dataArray.shift();
            update.skillArray.shift();
            update.TimerArray.shift();
            update.bountiesArray.shift();
            update.cluesArray.shift();
            update.birthdayArray.shift();
            return;
        }
        else {
            let res = yield gclientapi.spreadsheets.values.update(updateOption);
            date_1.default.newDate = [];
            let timerData = yield gclientapi.spreadsheets.values.get(timer);
            update.TimerArray = timerData.data.values || [];
            update.TimerArray.shift();
            return;
        }
    });
}
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        var connected;
        if (!process.env.CLIENT_KEY) {
            console.log("CLIENT_KEY NOT FOUND.");
            return;
        }
        const googleClient = new googleapis_1.google.auth.JWT(process.env.CLIENT_EMAIL, "", process.env.CLIENT_KEY.replace(/\\n/g, "\n"), ["https://www.googleapis.com/auth/spreadsheets"]);
        googleClient.authorize(function (err, tokens) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    return;
                }
                else {
                    return;
                }
            });
        });
        yield gsrun(googleClient);
        console.log("GoogleClient connected.");
        return;
    });
}
exports.initialize = initialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFvQztBQUdwQyxpQ0FBMEI7QUFFMUIsTUFBcUIsTUFBTTtJQUEzQjtRQVFtQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBbUJ2QyxDQUFDO0lBakJDLElBQUk7UUFDRixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixNQUFNLFVBQVUsRUFBRSxDQUFDO1lBRW5CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTs7QUExQkgseUJBMkJDO0FBMUJRLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLG9CQUFhLEdBQVUsRUFBRSxDQUFDO0FBQzFCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLG9CQUFhLEdBQVksRUFBRSxDQUFDO0FBc0JyQyxTQUFlLEtBQUssQ0FBQyxPQUFZOztRQUM5QixNQUFNLFVBQVUsR0FBRyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUc7WUFDVixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLDhDQUE4QztZQUM3RCxLQUFLLEVBQUUsUUFBUTtTQUNoQixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxRQUFRO1NBQ2hCLENBQUE7UUFDRCxNQUFNLElBQUksR0FBRztZQUNYLGFBQWEsRUFBRSw4Q0FBOEM7WUFDN0QsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFBO1FBQ0QsTUFBTSxRQUFRLEdBQUc7WUFDZixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxjQUFjO1NBQ3RCLENBQUE7UUFDRCxNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRSw4Q0FBOEM7WUFDN0QsS0FBSyxFQUFFLGNBQWM7U0FDdEIsQ0FBQTtRQUNELE1BQU0sWUFBWSxHQUFHO1lBQ3JCLGFBQWEsRUFBRSw4Q0FBOEM7WUFDN0QsS0FBSyxFQUFFLFdBQVc7WUFDbEIsZ0JBQWdCLEVBQUUsY0FBYztZQUNoQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUMsY0FBSSxDQUFDLE9BQU8sRUFBQztTQUNoQyxDQUFBO1FBQ0QsTUFBTSxZQUFZLEdBQUc7WUFDbkIsYUFBYSxFQUFFLDhDQUE4QztZQUM3RCxLQUFLLEVBQUMsTUFBTTtTQUNiLENBQUE7UUFDRCxJQUFHLGNBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztZQUN0RCxJQUFJLFlBQVksR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxRSxJQUFJLFFBQVEsR0FBRSxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLFNBQVMsR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxJQUFJLFNBQVMsR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxJQUFJLFlBQVksR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0RSxJQUFJLFNBQVMsR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUM5QyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUMxQyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNoRCxNQUFNLENBQUMsVUFBVSxHQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNsRCxNQUFNLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQixNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QixPQUFPO1NBQ1Y7YUFBSTtZQUVELElBQUksR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BFLGNBQUksQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDO1lBQ2hCLElBQUksU0FBUyxHQUFHLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxVQUFVLEdBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUIsT0FBTztTQUNWO0lBSUQsQ0FBQztDQUFBO0FBRUQsU0FBc0IsVUFBVTs7UUFDOUIsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRXJDLE9BQU87U0FDUjtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksbUJBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFDeEIsRUFBRSxFQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQzVDLENBQUMsOENBQThDLENBQUMsQ0FDakQsQ0FBQztRQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBZSxHQUFHLEVBQUUsTUFBTTs7Z0JBQy9DLElBQUksR0FBRyxFQUFFO29CQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLE9BQU87aUJBQ1I7cUJBQU07b0JBQ0wsT0FBTztpQkFDUjtZQUNILENBQUM7U0FBQSxDQUFDLENBQUM7UUFDSixNQUFNLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsT0FBTztJQUVSLENBQUM7Q0FBQTtBQXpCRCxnQ0F5QkMifQ==