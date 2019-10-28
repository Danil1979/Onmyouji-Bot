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
const date_1 = require("./commands/date");
require('dotenv').config();
const client = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    client.user.setActivity("Ring Toss!", { type: "PLAYING" });
    yield update_1.initialize();
    date_1.setDate(client);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBRXZDLDhDQUErQztBQUMvQywwQ0FBMEM7QUFDMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRzNCLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUlwRCxJQUFJLFFBQVEsR0FBbUIsRUFBRSxDQUFDO0FBRWxDLFlBQVksQ0FBQyxHQUFHLFNBQVMsV0FBVyxDQUFDLENBQUM7QUFFdEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBUSxFQUFFO0lBSXpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sbUJBQVUsRUFBRSxDQUFDO0lBQ2xCLGNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFDRixNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBQyxHQUFHLENBQUEsRUFBRTtJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixHQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyxDQUFBO0FBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsR0FBRyxDQUFBLEVBQUU7SUFHckIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUFDLE9BQU87S0FBQztJQUU1QixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFFLElBQUksRUFBQztRQUFDLE9BQU87S0FBQztJQUVuQyxJQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUFDLE9BQU87S0FBQztJQUUvRCxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUUsT0FBTyxFQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLE9BQU87S0FDVjtJQUVELGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQTtBQUVGLFNBQWUsSUFBSSxDQUFDLEdBQW1COztRQUNuQyxJQUFJLFdBQVcsR0FBUSxNQUFNLENBQUM7UUFDOUIsS0FBSSxNQUFNLGFBQWEsSUFBSSxRQUFRLEVBQUM7WUFFaEMsSUFBSTtnQkFJQSxXQUFXLElBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7YUFFNUM7WUFDRCxPQUFNLFNBQVMsRUFBQztnQkFFWixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQUE7QUFDRCxTQUFlLGFBQWEsQ0FBQyxHQUFtQjs7UUFFNUMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVGLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQyxLQUFJLE1BQU0sYUFBYSxJQUFJLFFBQVEsRUFBQztZQUVoQyxJQUFJO2dCQUVBLElBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFDO29CQUVyQyxTQUFTO2lCQUNaO2dCQUVELE1BQU0sYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBRXBEO1lBQ0QsT0FBTSxTQUFTLEVBQUM7Z0JBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxQjtTQUNKO0lBQ0wsQ0FBQztDQUFBO0FBRUEsU0FBUyxZQUFZLENBQUMsWUFBb0I7SUFFM0MsSUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFxQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFBQyxPQUFPO0tBQUU7SUFHekYsS0FBSyxNQUFNLFdBQVcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQW9CLEVBQUM7UUFFN0QsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsWUFBWSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRXhFLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxFQUFpQixDQUFDO1FBRW5ELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDMUI7QUFFQSxDQUFDO0FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDIn0=