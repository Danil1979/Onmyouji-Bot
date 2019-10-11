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
const update_1 = require("./update");
class stats {
    constructor() {
        this._command = "stats";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            var exact = false;
            if (args[0].indexOf("-") != -1) {
                exact = true;
                args[0] = args[0].substring(1);
            }
            for (let i = 0; i < update_1.default.dataArray.length; i++) {
                if (exact) {
                    const aliasArray = update_1.default.dataArray[i][4].split(",");
                    for (let x = 0; x < aliasArray.length; x++) {
                        aliasArray[x] = aliasArray[x].toLowerCase();
                    }
                    if (update_1.default.dataArray[i][0].toLowerCase() == args[0].toLowerCase()) {
                        const shiki = update_1.default.dataArray[i];
                        msgObject.channel.send(`${shiki}`);
                        break;
                    }
                    if (aliasArray.indexOf(args[0].toLowerCase()) != -1) {
                        const shiki = update_1.default.dataArray[i];
                        msgObject.channel.send(`${shiki}`);
                        break;
                    }
                }
                else {
                    if (update_1.default.dataArray[i][0].toLowerCase().indexOf(args[0].toLowerCase()) != -1) {
                        const shiki = update_1.default.dataArray[i];
                        msgObject.channel.send(`${shiki}`);
                        break;
                    }
                    if (update_1.default.dataArray[i][4].toLowerCase().indexOf(args[0].toLowerCase()) != -1) {
                        const shiki = update_1.default.dataArray[i];
                        msgObject.channel.send(`${shiki}`);
                        break;
                    }
                }
            }
        });
    }
}
exports.default = stats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxxQ0FBOEI7QUFFOUIsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFDO0lBb0R4QyxDQUFDO0lBbERHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxJQUFJLEtBQUssR0FBUyxLQUFLLENBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxFQUFDO2dCQUN6QixLQUFLLEdBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1lBRUQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGdCQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDdEMsSUFBRyxLQUFLLEVBQUM7b0JBQ0wsTUFBTSxVQUFVLEdBQVcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM3RCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQzt3QkFDaEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDN0M7b0JBQ0QsSUFBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUM7d0JBQzNELE1BQU0sS0FBSyxHQUFFLGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQ25DLE1BQU07cUJBQ1Q7b0JBRUQsSUFBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxFQUFDO3dCQUM3QyxNQUFNLEtBQUssR0FBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNO3FCQUNUO2lCQUNKO3FCQUFJO29CQUNELElBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxFQUFDO3dCQUN2RSxNQUFNLEtBQUssR0FBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNO3FCQUNUO29CQUNELElBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxFQUFDO3dCQUN2RSxNQUFNLEtBQUssR0FBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNO3FCQUNUO2lCQUNKO2FBRUo7UUFDTCxDQUFDO0tBQUE7Q0FJSjtBQXRERCx3QkFzREMifQ==