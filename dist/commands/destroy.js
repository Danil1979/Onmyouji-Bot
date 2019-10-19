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
            if (msgObject.member.id == '222728476816310272' || msgObject.member.id == '149777597612556288') {
                msgObject.channel.send(">>> Shutting Down...");
                client.destroy();
                return;
            }
            else {
                msgObject.channel.send("Only Danil can use this command!");
                return;
            }
        });
    }
}
exports.default = destroy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzdHJveS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kZXN0cm95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsT0FBTztJQUE1QjtRQUVxQixhQUFRLEdBQUcsU0FBUyxDQUFDO0lBK0IxQyxDQUFDO0lBN0JHLElBQUk7UUFDQSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRy9FLElBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUM7Z0JBQy9CLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLCtFQUErRSxDQUFDLENBQUM7Z0JBQ3hHLE9BQU87YUFDVjtZQUVELElBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUUsb0JBQW9CLElBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUUsb0JBQW9CLEVBQUM7Z0JBQ3BGLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakIsT0FBTzthQUNWO2lCQUFJO2dCQUNELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQzNELE9BQU87YUFDVjtRQUVMLENBQUM7S0FBQTtDQUlKO0FBakNELDBCQWlDQyJ9