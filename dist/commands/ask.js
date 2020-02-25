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
let questionArray = [];
class ask {
    constructor() {
        this._command = "ask";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                return;
            }
            const replies = ["yes", "maybe", "no", "defnitely", "just do whatever you think is right", "why are you asking this?"];
            const danil = yield client.fetchUser("222728476816310272");
            const question = args.join(" ");
            questionArray.push(question);
            if (questionArray.length == 1) {
                questionArray.forEach((question) => __awaiter(this, void 0, void 0, function* () { return msgObject.channel.send(`>>> Please wait...`); }), yield danil.send(question).then((msg) => {
                    msg.channel.awaitMessages(response => response.author.id != client.user.id, { max: 1, time: 10000, errors: ['time'] }).then(collected => msgObject.channel.send(`>>> Question: ${question}\n Answer: ` + collected.first().content)).catch(() => msgObject.channel.send(`>>> Question: ${question}\n Answer: ` + replies[Math.floor(Math.random() * replies.length)]));
                }));
                questionArray.splice(0, questionArray.length);
            }
        });
    }
}
exports.default = ask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Fzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLElBQUksYUFBYSxHQUFtQixFQUFFLENBQUM7QUFFdkMsTUFBcUIsR0FBRztJQUF4QjtRQUVxQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBOEJ0QyxDQUFDO0lBNUJHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNSLE9BQU87YUFDVjtZQUNELE1BQU0sT0FBTyxHQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLHFDQUFxQyxFQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDbEgsTUFBTSxLQUFLLEdBQUUsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDMUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLElBQUcsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7Z0JBQ3pCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBTSxRQUFRLEVBQUMsRUFBRSxnREFDbkMsT0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBLEdBQUEsRUFDNUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO29CQUNsQyxHQUF1QixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvSSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixRQUFRLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQ3RHLENBQUMsS0FBSyxDQUFDLEdBQUUsRUFBRSxDQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixRQUFRLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0SSxDQUFDLENBQUMsQ0FDTCxDQUFDO2dCQUNOLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QztRQUNMLENBQUM7S0FBQTtDQUNKO0FBaENELHNCQWdDQyJ9