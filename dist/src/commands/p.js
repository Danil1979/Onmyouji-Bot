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
            if (args[0]) {
                const play = require("./play").default;
                const playCommand = new play();
                playCommand.runCommand(args, msgObject, client);
                return;
            }
            else {
                if (!voiceConnection) {
                    return;
                }
                if (!voiceConnection.dispatcher) {
                    return;
                }
                if (voiceConnection.dispatcher.paused) {
                    const resume = require("./resume").default;
                    const resumeCommand = new resume();
                    resumeCommand.runCommand(args, msgObject, client);
                    return;
                }
                else if (!voiceConnection.dispatcher.paused) {
                    const pause = require("./pause").default;
                    const pauseCommand = new pause();
                    pauseCommand.runCommand(args, msgObject, client);
                    return;
                }
            }
        });
    }
}
exports.default = p;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsQ0FBQztJQUF0QjtRQUNpQixhQUFRLEdBQUcsR0FBRyxDQUFDO0lBMENoQyxDQUFDO0lBeENELElBQUk7UUFDSixPQUFPLHdCQUF3QixDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUM3QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2pDLENBQUM7SUFFSyxVQUFVLENBQ2hCLElBQWMsRUFDZCxTQUEwQixFQUMxQixNQUFzQjs7WUFFbEIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE1BQU0sZUFBZSxHQUEyQixTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNwRixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDVCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBaUIsQ0FBQztnQkFDOUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxPQUFPO2FBQ1Y7aUJBQU07Z0JBQ0gsSUFBRyxDQUFDLGVBQWUsRUFBQztvQkFDaEIsT0FBTztpQkFDVjtnQkFDRCxJQUFHLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBQztvQkFDM0IsT0FBTztpQkFDVjtnQkFDRCxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUMzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLE1BQU0sRUFBaUIsQ0FBQztvQkFDbEQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNsRCxPQUFPO2lCQUNOO3FCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDL0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDekMsTUFBTSxZQUFZLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7b0JBQ2hELFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDakQsT0FBTztpQkFDTjthQUNKO1FBQ0QsQ0FBQztLQUFBO0NBQ0E7QUEzQ0Qsb0JBMkNDIn0=