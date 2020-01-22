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
const play_1 = require("./commands/play");
const birthday_1 = require("./commands/birthday");
require('dotenv').config();
const client = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    client.user.setActivity("Ring Toss!", { type: "PLAYING" });
    yield update_1.initialize();
    date_1.setDate(client);
    birthday_1.setBirthday(client);
    console.log("Ready!!");
}));
client.on("rateLimit", msg => {
    if (msg.limit == 1) {
        console.log("react rate limit");
    }
    else {
        console.log("ATTENTION!HITTING RATE LIMIT ");
        console.log(msg.limit);
        console.log(msg.method);
        console.log(msg.timeDifference);
    }
});
client.on("voiceStateUpdate", (_oldmember, newmember) => {
    if (newmember.user.id == client.user.id) {
        if (!newmember.voiceChannel) {
            play_1.leaveChannel(newmember.guild);
        }
    }
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
    handleCommand(msg);
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBRXZDLDhDQUErQztBQUMvQywwQ0FBMEM7QUFDMUMsMENBQStDO0FBQy9DLGtEQUErQztBQUMvQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFM0IsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBSXBELElBQUksUUFBUSxHQUFtQixFQUFFLENBQUM7QUFFbEMsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQztBQUV0QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFRLEVBQUU7SUFJekIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDMUQsTUFBTSxtQkFBVSxFQUFFLENBQUM7SUFDbEIsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLHNCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFBLEVBQUU7SUFDdkIsSUFBRyxHQUFHLENBQUMsS0FBSyxJQUFFLENBQUMsRUFBQztRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNuQztTQUFJO1FBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFH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