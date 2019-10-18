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
class join {
    constructor() {
        this._command = "join";
    }
    help() {
        return "~join|have the bot join the voice channel that the user is currently in.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentChannel = msgObject.member.voiceChannel;
            if (currentChannel) {
                currentChannel.join();
                msgObject.channel.send(">>> Joined");
            }
            else {
                msgObject.channel.send(">>> Please join a voice channel first.");
                return;
            }
        });
    }
}
exports.default = join;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9qb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsTUFBcUIsSUFBSTtJQUF6QjtRQUdpQixhQUFRLEdBQUcsTUFBTSxDQUFDO0lBNEJuQyxDQUFDO0lBMUJELElBQUk7UUFDRixPQUFPLDRFQUE0RSxDQUFDO0lBQ3RGLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUd0QixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNyRCxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDTCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUNqRSxPQUFPO2FBQ1I7UUFHSCxDQUFDO0tBQUE7Q0FFQTtBQS9CRCx1QkErQkMifQ==