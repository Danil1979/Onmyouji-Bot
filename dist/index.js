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
const Discord = require("discord.js");
const ConfigFile = require("./config");
const update_1 = require("./commands/update");
require('dotenv').config();
const client = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    client.user.setActivity("Ring Toss!", { type: "PLAYING" });
    yield update_1.initialize();
    console.log("Ready!!");
}));
client.on("rateLimit", msg => {
    console.log("ATTENTION!HITTING RATE LIMIT " + msg);
});
client.on("message", msg => {
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == "dm") {
        return;
    }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    if (msg.content.toLowerCase() == "~help") {
        help(msg);
        return;
    }
    handleCommand(msg);
});
function help(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        var commandList = ">>> ";
        for (const commandsClass of commands) {
            try {
                commandList += yield commandsClass.help();
            }
            catch (exception) {
                console.log(exception);
            }
        }
        msg.channel.send(commandList);
    });
}
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
        let args = msg.content.split(" ").slice(1);
        for (const commandsClass of commands) {
            try {
                if (!commandsClass.isThisCommand(command)) {
                    continue;
                }
                yield commandsClass.runCommand(args, msg, client);
            }
            catch (exception) {
                console.log(exception);
            }
        }
    });
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
    }
}
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBRXZDLDhDQUErQztBQUUvQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFHM0IsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBSXBELElBQUksUUFBUSxHQUFtQixFQUFFLENBQUM7QUFFbEMsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFRLEVBQUU7SUFJekIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDMUQsTUFBTSxtQkFBVSxFQUFFLENBQUM7SUFHbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFBO0FBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFBLEVBQUU7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUMsQ0FBQTtBQUNGLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDLEdBQUcsQ0FBQSxFQUFFO0lBR3JCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFBQyxPQUFPO0tBQUM7SUFFNUIsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBRSxJQUFJLEVBQUM7UUFBQyxPQUFPO0tBQUM7SUFFbkMsSUFBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFBQyxPQUFPO0tBQUM7SUFFL0QsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFFLE9BQU8sRUFBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixPQUFPO0tBQ1Y7SUFFRCxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFDRixTQUFlLElBQUksQ0FBQyxHQUFtQjs7UUFDbkMsSUFBSSxXQUFXLEdBQVEsTUFBTSxDQUFDO1FBQzlCLEtBQUksTUFBTSxhQUFhLElBQUksUUFBUSxFQUFDO1lBRWhDLElBQUk7Z0JBSUEsV0FBVyxJQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2FBRTVDO1lBQ0QsT0FBTSxTQUFTLEVBQUM7Z0JBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUFBO0FBQ0QsU0FBZSxhQUFhLENBQUMsR0FBbUI7O1FBRTVDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1RixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0MsS0FBSSxNQUFNLGFBQWEsSUFBSSxRQUFRLEVBQUM7WUFFaEMsSUFBSTtnQkFFQSxJQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBQztvQkFFckMsU0FBUztpQkFDWjtnQkFFRCxNQUFNLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUVwRDtZQUNELE9BQU0sU0FBUyxFQUFDO2dCQUVaLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7Q0FBQTtBQUVBLFNBQVMsWUFBWSxDQUFDLFlBQW9CO0lBRTNDLElBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBcUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQUMsT0FBTztLQUFFO0lBR3pGLEtBQUssTUFBTSxXQUFXLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFvQixFQUFDO1FBRTdELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLFlBQVksSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUV4RSxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBaUIsQ0FBQztRQUVuRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFCO0FBRUEsQ0FBQztBQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyJ9