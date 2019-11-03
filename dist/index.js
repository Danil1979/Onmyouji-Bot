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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBRXZDLDhDQUErQztBQUMvQywwQ0FBMEM7QUFDMUMsMENBQStDO0FBQy9DLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUczQixNQUFNLE1BQU0sR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJcEQsSUFBSSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztBQUVsQyxZQUFZLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQVEsRUFBRTtJQUl6QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMxRCxNQUFNLG1CQUFVLEVBQUUsQ0FBQztJQUNsQixjQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFBLEVBQUU7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUMsQ0FBQTtBQUNGLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEVBQUU7SUFFakQsSUFBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQztRQUNqQyxJQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBQztZQUN2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