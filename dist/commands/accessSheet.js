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
const googleClient = new googleapis_1.google.auth.JWT(creds.client_email, "", creds.private_key, ['https://www.googleapis.com/auth/spreadsheets.readonly']);
class accessSheet {
    constructor() {
        this._command = "accessSheet";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("test");
            update();
        });
    }
}
exports.default = accessSheet;
accessSheet.dataArray = [];
function gsrun(gclient) {
    return __awaiter(this, void 0, void 0, function* () {
        const gclientapi = googleapis_1.google.sheets({ version: 'v4', auth: gclient });
        const opt = {
            spreadsheetId: '1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM',
            range: 'Onmyouji1'
        };
        let data = yield gclientapi.spreadsheets.values.get(opt);
        accessSheet.dataArray = data.data.values || [];
        accessSheet.dataArray.shift();
    });
}
function update() {
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
exports.update = update;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzU2hlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvYWNjZXNzU2hlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSwyQ0FBa0M7QUFHbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDaEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxtQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ3BDLEtBQUssQ0FBQyxZQUFZLEVBQ2xCLEVBQUUsRUFDRixLQUFLLENBQUMsV0FBVyxFQUNqQixDQUFDLHVEQUF1RCxDQUFDLENBRXhELENBQUM7QUFDTixNQUFxQixXQUFXO0lBQWhDO1FBRXFCLGFBQVEsR0FBRyxhQUFhLENBQUM7SUFpQjlDLENBQUM7SUFmRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixNQUFNLEVBQUUsQ0FBQztRQUNiLENBQUM7S0FBQTs7QUFmTCw4QkFtQkM7QUFsQlUscUJBQVMsR0FBUyxFQUFFLENBQUM7QUFtQmhDLFNBQWUsS0FBSyxDQUFDLE9BQVc7O1FBQzVCLE1BQU0sVUFBVSxHQUFHLG1CQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLEdBQUcsR0FBRTtZQUNYLGFBQWEsRUFBQyw4Q0FBOEM7WUFDNUQsS0FBSyxFQUFDLFdBQVc7U0FDaEIsQ0FBQztRQUNGLElBQUksSUFBSSxHQUFFLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELFdBQVcsQ0FBQyxTQUFTLEdBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUUsRUFBRSxDQUFDO1FBQzdDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFHOUIsQ0FBQztDQUFBO0FBRUgsU0FBZ0IsTUFBTTtJQUNwQixZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVMsR0FBRyxFQUFDLE1BQU07UUFDdEMsSUFBRyxHQUFHLEVBQUM7WUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUFDO2FBQ2hDO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2QjtJQUVELENBQUMsQ0FBQyxDQUFDO0FBRVQsQ0FBQztBQVZELHdCQVVDIn0=