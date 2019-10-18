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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFvQztBQUdwQyxpQ0FBMEI7QUFFMUIsTUFBcUIsTUFBTTtJQUEzQjtRQUltQixhQUFRLEdBQUcsUUFBUSxDQUFDO0lBbUJ2QyxDQUFDO0lBakJDLElBQUk7UUFDRixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixNQUFNLFVBQVUsRUFBRSxDQUFDO1lBRW5CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTs7QUF0QkgseUJBdUJDO0FBdEJRLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBQ3pCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBc0JsQyxTQUFlLEtBQUssQ0FBQyxPQUFZOztRQUM5QixNQUFNLFVBQVUsR0FBRyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUc7WUFDVixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRSw4Q0FBOEM7WUFDN0QsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FB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