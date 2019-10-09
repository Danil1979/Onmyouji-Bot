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
class destroy {
    constructor() {
        this._command = "destroy";
    }
    help() {
        return "destroy";
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
            msgObject.channel.send(">>> Shutting Down...");
            client.destroy();
            return;
        });
    }
}
exports.default = destroy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdHJveS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kZXN0cm95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsT0FBTztJQUE1QjtRQUVxQixhQUFRLEdBQUcsU0FBUyxDQUFDO0lBNkIxQyxDQUFDO0lBM0JHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUcvRSxJQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFDO2dCQUMvQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO2dCQUN4RyxPQUFPO2FBQ1Y7WUFFRCxJQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFFLG9CQUFvQixFQUFDO2dCQUN6QyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUMzRCxPQUFPO2FBQ1Y7WUFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixPQUFPO1FBQ1gsQ0FBQztLQUFBO0NBSUo7QUEvQkQsMEJBK0JDIn0=