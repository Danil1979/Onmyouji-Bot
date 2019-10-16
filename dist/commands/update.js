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
        return "testing";
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
function gsrun(gclient) {
    return __awaiter(this, void 0, void 0, function* () {
        const gclientapi = googleapis_1.google.sheets({ version: "v4", auth: gclient });
        const opt = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Onmyouji1"
        };
        const skill = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Skill"
        };
        const timer = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Timer"
        };
        const updateOption = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Timer!A2",
            valueInputOption: 'USER_ENTERED',
            resource: { values: date_1.default.newDate }
        };
        if (date_1.default.newDate === undefined || date_1.default.newDate.length == 0) {
            let data = yield gclientapi.spreadsheets.values.get(opt);
            let skillData = yield gclientapi.spreadsheets.values.get(skill);
            let timerData = yield gclientapi.spreadsheets.values.get(timer);
            update.dataArray = data.data.values || [];
            update.skillArray = skillData.data.values || [];
            update.TimerArray = timerData.data.values || [];
            update.dataArray.shift();
            update.skillArray.shift();
            update.TimerArray.shift();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFvQztBQUdwQyxpQ0FBMEI7QUFFMUIsTUFBcUIsTUFBTTtJQUEzQjtRQUltQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBbUJ2QyxDQUFDO0lBakJDLElBQUk7UUFDRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUssVUFBVSxDQUNkLElBQWMsRUFDZCxTQUEwQixFQUMxQixNQUFzQjs7WUFFdEIsTUFBTSxVQUFVLEVBQUUsQ0FBQztZQUVuQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQUE7O0FBdEJILHlCQXVCQztBQXRCUSxnQkFBUyxHQUFZLEVBQUUsQ0FBQztBQUN4QixpQkFBVSxHQUFZLEVBQUUsQ0FBQztBQUN6QixpQkFBVSxHQUFZLEVBQUUsQ0FBQztBQXNCbEMsU0FBZSxLQUFLLENBQUMsT0FBWTs7UUFDOUIsTUFBTSxVQUFVLEdBQUcsbUJBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sR0FBRyxHQUFHO1lBQ1YsYUFBYSxFQUFFLDhDQUE4QztZQUM3RCxLQUFLLEVBQUUsV0FBVztTQUNuQixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLDhDQUE4QztZQUM3RCxLQUFLLEVBQUUsT0FBTztTQUNmLENB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