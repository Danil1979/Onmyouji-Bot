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
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            msgObject.guild.voiceConnection.dispatcher.end();
            msgObject.channel.send(`>>> Song skipped!`);
            return;
        });
    }
}
exports.default = skip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQztJQW9CdkMsQ0FBQztJQWxCRyxJQUFJO1FBQ0EsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzFCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRW5CLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVDLE9BQU87UUFDWCxDQUFDO0tBQUE7Q0FJSjtBQXRCRCx1QkFzQkMifQ==