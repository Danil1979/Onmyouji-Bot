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
class vol {
    constructor() {
        this._command = "vol";
    }
    help() {
        return "~vol|same as ~volume function.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const volume = require("./volume").default;
            const volumeCommand = new volume();
            volumeCommand.runCommand(args, msgObject, client);
            return;
        });
    }
}
exports.default = vol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3ZvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQXFCLEdBQUc7SUFBeEI7UUFFcUIsYUFBUSxHQUFHLEtBQUssQ0FBQztJQW9CdEMsQ0FBQztJQWxCRyxJQUFJO1FBQ0EsT0FBTyxrQ0FBa0MsQ0FBQztJQUM5QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNDLE1BQU0sYUFBYSxHQUFHLElBQUksTUFBTSxFQUFpQixDQUFDO1lBQ2xELGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsRCxPQUFPO1FBQ1gsQ0FBQztLQUFBO0NBSUo7QUF0QkQsc0JBc0JDIn0=