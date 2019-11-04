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
            range: "Timer!A2",
            valueInputOption: 'USER_ENTERED',
            resource: { values: date_1.default.newDate }
        };
        if (date_1.default.newDate === undefined || date_1.default.newDate.length == 0) {
            let soulData = yield gclientapi.spreadsheets.values.get(soul);
            let data = yield gclientapi.spreadsheets.values.get(opt);
            let skillData = yield gclientapi.spreadsheets.values.get(skill);
            let timerData = yield gclientapi.spreadsheets.values.get(timer);
            let bountiesData = yield gclientapi.spreadsheets.values.get(bounties);
            let cluesData = yield gclientapi.spreadsheets.values.get(clues);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFvQztBQUdwQyxpQ0FBMEI7QUFFMUIsTUFBcUIsTUFBTTtJQUEzQjtRQU9tQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBbUJ2QyxDQUFDO0lBakJDLElBQUk7UUFDRixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixNQUFNLFVBQVUsRUFBRSxDQUFDO1lBRW5CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTs7QUF6QkgseUJBMEJDO0FBekJRLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLG9CQUFhLEdBQVUsRUFBRSxDQUFDO0FBQzFCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBc0JsQyxTQUFlLEtBQUssQ0FBQyxPQUFZOztRQUM5QixNQUFNLFVBQVUsR0FBRyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUc7WUFDVixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQztRQUNGLE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLDhDQUE4QztZQUM3RCxLQUFLLEVBQUUsUUFBUTtT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