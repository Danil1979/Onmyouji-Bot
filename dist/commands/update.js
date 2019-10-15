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
        let data = yield gclientapi.spreadsheets.values.get(opt);
        let skillData = yield gclientapi.spreadsheets.values.get(skill);
        update.dataArray = data.data.values || [];
        update.skillArray = skillData.data.values || [];
        update.dataArray.shift();
        update.skillArray.shift();
        return true;
    });
}
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        var connected;
        if (!process.env.CLIENT_KEY) {
            console.log("CLIENT_KEY NOT FOUND.");
            return;
        }
        const googleClient = new googleapis_1.google.auth.JWT(process.env.CLIENT_EMAIL, "", process.env.CLIENT_KEY.replace(/\\n/g, "\n"), ["https://www.googleapis.com/auth/spreadsheets.readonly"]);
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
        connected = yield gsrun(googleClient);
        if (connected) {
            console.log("GoogleClient connected.");
            return;
        }
    });
}
exports.initialize = initialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFvQztBQUlwQyxNQUFxQixNQUFNO0lBQTNCO1FBR21CLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFtQnZDLENBQUM7SUFqQkMsSUFBSTtRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixNQUFNLFVBQVUsRUFBRSxDQUFDO1lBRW5CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTs7QUFyQkgseUJBc0JDO0FBckJRLGdCQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3hCLGlCQUFVLEdBQVksRUFBRSxDQUFDO0FBc0JsQyxTQUFlLEtBQUssQ0FBQyxPQUFZOztRQUMvQixNQUFNLFVBQVUsR0FBRyxtQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxHQUFHLEdBQUc7WUFDVixhQUFhLEVBQUUsOENBQThDO1lBQzdELEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRSw4Q0FBOEM7WUFDN0QsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDO1FBQ0YsSUFBSSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxTQUFTLEdBQUcsTUFBTSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUFBO0FBRUQsU0FBc0IsVUFBVTs7UUFDOUIsSUFBSSxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRXJDLE9BQU87U0FDUjtRQUNELE1BQU0sWUFBWSxHQUFHLElBQUksbUJBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFDeEIsRUFBRSxFQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQzVDLENBQUMsdURBQXVELENBQUMsQ0FDMUQsQ0FBQztRQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBZSxHQUFHLEVBQUUsTUFBTTs7Z0JBQy9DLElBQUksR0FBRyxFQUFFO29CQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLE9BQU87aUJBQ1I7cUJBQU07b0JBQ0wsT0FBTztpQkFDUjtZQUNILENBQUM7U0FBQSxDQUFDLENBQUM7UUFDSCxTQUFTLEdBQUcsTUFBTSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsT0FBTztTQUNSO0lBQ0gsQ0FBQztDQUFBO0FBMUJELGdDQTBCQyJ9