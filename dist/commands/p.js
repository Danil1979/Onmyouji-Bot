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
class p {
    constructor() {
        this._command = "p";
    }
    help() {
        return "play or pause function";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceConnection = msgObject.guild.voiceConnection;
            try {
                if (args[0]) {
                    const play = require("./play").default;
                    const playCommand = new play();
                    playCommand.runCommand(args, msgObject, client);
                    return;
                }
                else {
                    if (!voiceConnection || !voiceConnection.dispatcher) {
                        return;
                    }
                    voiceConnection.dispatcher.paused = !voiceConnection.dispatcher.paused;
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.default = p;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsQ0FBQztJQUF0QjtRQUNpQixhQUFRLEdBQUcsR0FBRyxDQUFDO0lBbUNoQyxDQUFDO0lBakNELElBQUk7UUFDSixPQUFPLHdCQUF3QixDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUM3QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLENBQUM7SUFFSyxVQUFVLENBQ2hCLElBQWMsRUFDZCxTQUEwQixFQUMxQixNQUFzQjs7WUFHbEIsTUFBTSxlQUFlLEdBQTJCLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ2hGLElBQUc7Z0JBQ0MsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ1QsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDdkMsTUFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQWlCLENBQUM7b0JBQzlDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDaEQsT0FBTztpQkFDVjtxQkFBTTtvQkFDSCxJQUFHLENBQUMsZUFBZSxJQUFFLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBQzt3QkFDN0MsT0FBTztxQkFDVjtvQkFDRCxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO2lCQUVwRTthQUNSO1lBQUEsT0FBTSxHQUFHLEVBQUM7Z0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QjtRQUVMLENBQUM7S0FBQTtDQUNBO0FBcENELG9CQW9DQyJ9