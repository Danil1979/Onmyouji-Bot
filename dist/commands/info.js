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
        return "info";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send(`>>> Loop: ${info.info}`);
                return;
            }
            if (args[0] == "false" || args[0] == "off") {
                info.info = false;
                msgObject.channel.send(`>>> Loop: ${info.info}`);
                return;
            }
            else if (args[0] == "true" || args[0] == "on") {
                info.info = true;
                msgObject.channel.send(`>>> Loop: ${info.info}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsSUFBSTtJQUF6QjtRQUNtQixhQUFRLEdBQUcsTUFBTSxDQUFDO0lBZ0NyQyxDQUFDO0lBOUJDLElBQUk7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUssVUFBVSxDQUNkLElBQWMsRUFDZCxTQUEwQixFQUMxQixNQUFzQjs7WUFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDWixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPO2FBQ1I7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pELE9BQU87YUFDUjtpQkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pELE9BQU87YUFDUjtpQkFBSTtnQkFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUN6RSxPQUFPO2FBQ1Y7UUFDSCxDQUFDO0tBQUE7O0FBaENILHVCQWlDQztBQS9CUSxTQUFJLEdBQVksSUFBSSxDQUFDIn0=