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
const play_1 = require("./commands/play");
const birthday_1 = require("./commands/birthday");
require('dotenv').config();
const client = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    client.user.setActivity("Ring Toss!", { type: "PLAYING" });
    yield update_1.initialize();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBRXZDLDhDQUErQztBQUUvQywwQ0FBK0M7QUFDL0Msa0RBQStDO0FBQy9DLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUzQixNQUFNLE1BQU0sR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJcEQsSUFBSSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztBQUVsQyxZQUFZLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQVEsRUFBRTtJQUl6QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMxRCxNQUFNLG1CQUFVLEVBQUUsQ0FBQztJQUVsQixzQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFDLEdBQUcsQ0FBQSxFQUFFO0lBQ3ZCLElBQUcsR0FBRyxDQUFDLEtBQUssSUFBRSxDQUFDLEVBQUM7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDbkM7U0FBSTtRQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixPQUFPLENB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