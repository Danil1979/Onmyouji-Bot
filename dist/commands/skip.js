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
class skip {
    constructor() {
        this._command = "skip";
    }
    help() {
        return "~skip|to skip current song.\n";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.guild.voiceConnection || !msgObject.guild.voiceConnection.dispatcher) {
                return;
            }
            msgObject.guild.voiceConnection.dispatcher.end();
            msgObject.channel.send(`>>> Song skipped!`);
            return;
        });
    }
}
exports.default = skip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9za2lwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFDO0lBc0J2QyxDQUFDO0lBcEJHLElBQUk7UUFDQSxPQUFPLCtCQUErQixDQUFDO0lBQzNDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRS9FLElBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBQztnQkFDN0UsT0FBTzthQUNWO1lBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDNUMsT0FBTztRQUNYLENBQUM7S0FBQTtDQUlKO0FBeEJELHVCQXdCQyJ9