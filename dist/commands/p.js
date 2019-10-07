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
            msgObject.delete();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsQ0FBQztJQUF0QjtRQUNpQixhQUFRLEdBQUcsR0FBRyxDQUFDO0lBbUNoQyxDQUFDO0lBakNELElBQUk7UUFDSixPQUFPLHdCQUF3QixDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUM3QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLENBQUM7SUFFSyxVQUFVLENBQ2hCLElBQWMsRUFDZCxTQUEwQixFQUMxQixNQUFzQjs7WUFFbEIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE1BQU0sZUFBZSxHQUEyQixTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNoRixJQUFHO2dCQUNDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNULE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFpQixDQUFDO29CQUM5QyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2hELE9BQU87aUJBQ1Y7cUJBQU07b0JBQ0gsSUFBRyxDQUFDLGVBQWUsSUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUM7d0JBQzdDLE9BQU87cUJBQ1Y7b0JBQ0QsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztpQkFFcEU7YUFDUjtZQUFBLE9BQU0sR0FBRyxFQUFDO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7UUFFTCxDQUFDO0tBQUE7Q0FDQTtBQXBDRCxvQkFvQ0MifQ==