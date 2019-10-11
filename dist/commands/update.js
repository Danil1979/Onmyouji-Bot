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
const creds = require('../../credentials.json');
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
            initialize();
        });
    }
}
exports.default = update;
update.dataArray = [];
function gsrun(gclient) {
    return __awaiter(this, void 0, void 0, function* () {
        const gclientapi = googleapis_1.google.sheets({ version: 'v4', auth: gclient });
        const opt = {
            spreadsheetId: '1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM',
            range: 'Onmyouji1'
        };
        let data = yield gclientapi.spreadsheets.values.get(opt);
        update.dataArray = data.data.values || [];
        update.dataArray.shift();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFrQztBQUdsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUVoRCxNQUFxQixNQUFNO0lBQTNCO1FBRXFCLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFnQnpDLENBQUM7SUFkRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsVUFBVSxFQUFFLENBQUM7UUFDakIsQ0FBQztLQUFBOztBQWRMLHlCQWtCQztBQWpCVSxnQkFBUyxHQUFTLEVBQUUsQ0FBQztBQWtCaEMsU0FBZSxLQUFLLENBQUMsT0FBVzs7UUFDNUIsTUFBTSxVQUFVLEdBQUcsbUJBQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sR0FBRyxHQUFFO1lBQ1gsYUFBYSxFQUFDLDhDQUE4QztZQUM1RCxLQUFLLEVBQUMsV0FBVztTQUNoQixDQUFDO1FBQ0YsSUFBSSxJQUFJLEdBQUUsTUFBTSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBRSxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUcxQixDQUFDO0NBQUE7QUFFSCxTQUFnQixVQUFVO0lBQ3RCLElBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFckMsT0FBTztLQUNWO0lBQ1AsTUFBTSxZQUFZLEdBQUcsSUFBSSxtQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUM1QixFQUFFLEVBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFDNUMsQ0FBQyx1REFBdUQsQ0FBQyxDQUV4RCxDQUFDO0lBQ0UsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFTLEdBQUcsRUFBQyxNQUFNO1FBQ3RDLElBQUcsR0FBRyxFQUFDO1lBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLE9BQU87U0FBQzthQUNoQztZQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdkI7SUFDRCxDQUFDLENBQUMsQ0FBQztBQUVULENBQUM7QUFyQkQsZ0NBcUJDIn0=