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
        const soul = {
            spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
            range: "Soul"
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
            update.soulArray = soulData.data.values || [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFvQztBQUdwQyxpQ0FBMEI7QUFFMUIsTUFBcUIsTUFBTTtJQUEzQjtRQUttQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBbUJ2QyxDQUFDO0lBakJDLElBQUk7UUFDRixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixNQUFNLFVBQVUsRUFBRSxDQUFDO1lBRW5CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTs7QUF2QkgseUJBd0JDO0FBdkJRLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBc0JqQyxTQUFlLEtBQUssQ0FBQyxPQUFZOztRQUM5QixNQUFNLFVBQVUsR0FBRyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUc7WUFDVixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRSw4Q0FBOEM7WUFDN0QsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUUsOENBQThDO1lB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