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
class info {
    constructor() {
        this._command = "info";
    }
    help() {
        return "";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send(`>>> Info: ${info.info}`);
                return;
            }
            if (args[0] == "false" || args[0] == "off") {
                info.info = false;
                msgObject.channel.send(`>>> Loop: ${info.info}`);
                return;
            }
            else if (args[0] == "true" || args[0] == "on") {
                info.info = true;
                msgObject.channel.send(`>>> Info: ${info.info}`);
                return;
            }
            else {
                msgObject.channel.send("Please enter ~info on/off to use this command.");
                return;
            }
        });
    }
}
exports.default = info;
info.info = true;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsSUFBSTtJQUF6QjtRQUNtQixhQUFRLEdBQUcsTUFBTSxDQUFDO0lBZ0NyQyxDQUFDO0lBOUJDLElBQUk7UUFDRixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNaLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pELE9BQU87YUFDUjtZQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNSO2lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDakQsT0FBTzthQUNSO2lCQUFJO2dCQUNELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ3pFLE9BQU87YUFDVjtRQUNILENBQUM7S0FBQTs7QUFoQ0gsdUJBaUNDO0FBL0JRLFNBQUksR0FBWSxJQUFJLENBQUMifQ==