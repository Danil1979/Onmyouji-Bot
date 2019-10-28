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
class leave {
    constructor() {
        this._command = "leave";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msgObject.member.voiceChannel && (msgObject.member.voiceChannel == msgObject.guild.voiceConnection.channel)) {
                play_1.leaveChannel(msgObject.guild, msgObject);
            }
            else if (msgObject.member.voiceChannel != msgObject.guild.voiceConnection.channel) {
                msgObject.channel.send(">>> You must be in the same channel as the bot to use this command.");
            }
            else {
                msgObject.channel.send(">>> Sorry you can't use this command.");
            }
        });
    }
}
exports.default = leave;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxpQ0FBbUM7QUFDbkMsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFDO0lBdUJ4QyxDQUFDO0lBckJHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxJQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUM7Z0JBQ3ZHLG1CQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxTQUFTLENBQUMsQ0FBQzthQUMzQztpQkFBSyxJQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBQztnQkFDNUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUVBQXFFLENBQUMsQ0FBQzthQUNqRztpQkFBSTtnQkFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ25FO1FBRUwsQ0FBQztLQUFBO0NBSUo7QUF6QkQsd0JBeUJDIn0=