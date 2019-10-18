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
class resume {
    constructor() {
        this._command = "resume";
    }
    help() {
        return "~resume|to resume paused song.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.guild.voiceConnection.dispatcher) {
                return;
            }
            msgObject.guild.voiceConnection.dispatcher.resume();
            msgObject.channel.send(">>> Resumed.");
            return;
        });
    }
}
exports.default = resume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3Jlc3VtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQXFCLE1BQU07SUFBM0I7UUFFcUIsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQXNCekMsQ0FBQztJQXBCRyxJQUFJO1FBQ0EsT0FBTyxrQ0FBa0MsQ0FBQztJQUM5QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFDO2dCQUMzQyxPQUFPO2FBQ1Y7WUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdkMsT0FBTztRQUNYLENBQUM7S0FBQTtDQUlKO0FBeEJELHlCQXdCQyJ9