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
            msgObject.channel.send("Updated.");
        });
    }
}
exports.default = update;
update.dataArray = [];
update.skillArray = [];
function gsrun(gclient) {
    return __awaiter(this, void 0, void 0, function* () {
        const gclientapi = googleapis_1.google.sheets({ version: 'v4', auth: gclient });
        const opt = {
            spreadsheetId: '1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM',
            range: 'Onmyouji1'
        };
        const skill = {
            spreadsheetId: '1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM',
            range: 'Skill'
        };
        let data = yield gclientapi.spreadsheets.values.get(opt);
        let skillData = yield gclientapi.spreadsheets.values.get(skill);
        update.dataArray = data.data.values || [];
        update.skillArray = skillData.data.values || [];
        update.dataArray.shift();
        update.skillArray.shift();
    });
}
function initialize() {
    if (!process.env.CLIENT_KEY) {
        console.log("CLIENT_KEY NOT FOUND.");
        return;
    }
    const googleClient = new googleapis_1.google.auth.JWT(process.env.CLIENT_EMAIL, "", process.env.CLIENT_KEY.replace(/\\n/g, '\n'), ['https://www.googleapis.com/auth/spreadsheets.readonly']);
    googleClient.authorize(function (err, tokens) {
        if (err) {
            console.error(err);
            return;
        }
        else {
            console.log('GoogleClient connected.');
            gsrun(googleClient);
        }
    });
}
exports.initialize = initialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFrQztBQUtsQyxNQUFxQixNQUFNO0lBQTNCO1FBR3FCLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFpQnpDLENBQUM7SUFmRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDakYsTUFBTyxVQUFVLEVBQUUsQ0FBQztZQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7O0FBaEJMLHlCQW9CQztBQW5CVSxnQkFBUyxHQUFTLEVBQUUsQ0FBQztBQUNyQixpQkFBVSxHQUFTLEVBQUUsQ0FBQztBQW1CakMsU0FBZSxLQUFLLENBQUMsT0FBVzs7UUFDNUIsTUFBTSxVQUFVLEdBQUcsbUJBQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sR0FBRyxHQUFFO1lBQ1gsYUFBYSxFQUFDLDhDQUE4QztZQUM1RCxLQUFLLEVBQUMsV0FBVztTQUNoQixDQUFDO1FBQ0YsTUFBTSxLQUFLLEdBQUU7WUFDVCxhQUFhLEVBQUMsOENBQThDO1lBQzVELEtBQUssRUFBQyxPQUFPO1NBQ2hCLENBQUE7UUFDRCxJQUFJLElBQUksR0FBRSxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxJQUFJLFNBQVMsR0FBRSxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvRCxNQUFNLENBQUMsU0FBUyxHQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFFLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFFLEVBQUUsQ0FBQztRQUM3QyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFM0IsQ0FBQztDQUFBO0FBRUgsU0FBZ0IsVUFBVTtJQUN0QixJQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXJDLE9BQU87S0FDVjtJQUNQLE1BQU0sWUFBWSxHQUFHLElBQUksbUJBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFDNUIsRUFBRSxFQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQzVDLENBQUMsdURBQXVELENBQUMsQ0FFeEQsQ0FBQztJQUNFLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBUyxHQUFHLEVBQUMsTUFBTTtRQUN0QyxJQUFHLEdBQUcsRUFBQztZQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxPQUFPO1NBQUM7YUFDaEM7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0QsQ0FBQyxDQUFDLENBQUM7QUFFVCxDQUFDO0FBckJELGdDQXFCQyJ9