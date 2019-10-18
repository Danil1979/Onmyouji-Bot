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
class restart {
    constructor() {
        this._command = "restart";
    }
    help() {
        return "";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msgObject.guild.voiceConnection) {
                msgObject.channel.send(">>> I can't carry out that function right now because I'm in a voice channel!");
                return;
            }
            if (msgObject.member.id != '222728476816310272') {
                msgObject.channel.send("Only Danil can use this command!");
                return;
            }
            msgObject.channel.send(">>> Restarting...");
            client.destroy();
            yield client.login(process.env.DISCORD_TOKEN);
            msgObject.channel.send(">>> Online");
            return;
        });
    }
}
exports.default = restart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsT0FBTztJQUE1QjtRQUVxQixhQUFRLEdBQUcsU0FBUyxDQUFDO0lBK0IxQyxDQUFDO0lBN0JHLElBQUk7UUFDQSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRy9FLElBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUM7Z0JBQy9CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLCtFQUErRSxDQUFDLENBQUM7Z0JBQ3hHLE9BQU87YUFDVjtZQUVELElBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUUsb0JBQW9CLEVBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQzNELE9BQU87YUFDVjtZQUNELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLE9BQU87UUFDVixDQUFDO0tBQUE7Q0FJSjtBQWpDRCwwQkFpQ0MifQ==