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
const play_1 = require("./play");
class queue {
    constructor() {
        this._command = "queue";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.guild.voiceConnection || !msgObject.guild.voiceConnection.dispatcher) {
                msgObject.channel.send(">>> There are no song playing at the moment.");
                return;
            }
            play_1.queueList(msgObject.guild, msgObject);
        });
    }
}
exports.default = queue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxpQ0FBZ0M7QUFFaEMsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFDO0lBb0J4QyxDQUFDO0lBbEJHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxJQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUM7Z0JBQzdFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQ3ZFLE9BQU87YUFDVjtZQUNMLGdCQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7Q0FJSjtBQXRCRCx3QkFzQkMifQ==