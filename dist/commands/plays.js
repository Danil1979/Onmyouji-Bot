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
const ytdl = require("ytdl-core");
const youtubeSearch = require("youtube-search");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.YOUTUBE_TOKEN);
const queue = new Map();
var opts = {
    maxResults: 10,
    key: process.env.YOUTUBE_TOKEN
};
class plays {
    constructor() {
        this._command = "plays";
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
            const serverQueue = queue.get(msgObject.guild.id);
            const currentChannel = msgObject.member.voiceChannel;
            if (!currentChannel) {
                msgObject.channel.send("You must be in a voice channel to use this command.");
            }
            if (args[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
                const songInfo = yield ytdl.getInfo(args[0]);
                var song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                    channel: songInfo.author.name,
                };
            }
            else {
                const songToSearch = args.join(" ");
                const songInfo = yield youtubeSearch(songToSearch, opts);
                if (songInfo.pageInfo.totalResults == 0) {
                    msgObject.channel.send(">>> No song found.");
                    return;
                }
                else {
                    for (var i = 0; i < 10; i++) {
                        if (songInfo.results[i].kind != undefined &&
                            songInfo.results[i].kind != "youtube#video") {
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                    var song = {
                        title: songInfo.results[i].title,
                        url: songInfo.results[i].link,
                        channel: songInfo.results[i].channelTitle
                    };
                    const embed = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${song.title}`)
                        .setDescription(`You searched for ${songToSearch}, here is what I found!\n${song.url}`)
                        .setFooter(`Channel Name:${song.channel}`);
                    msgObject.channel.send({ embed });
                }
            }
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: msgObject.channel,
                    voiceChannel: currentChannel,
                    connection: null,
                    songs: [],
                    volume: 1,
                    playing: true,
                };
                queue.set(msgObject.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
                try {
                    var connection = yield currentChannel.join();
                    queueConstruct.connection = connection;
                    play(msgObject.guild, queueConstruct.songs[0]);
                }
                catch (err) {
                    console.error(err);
                    queue.delete(msgObject.guild.id);
                    msgObject.channel.send(err);
                    return;
                }
            }
            else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                msgObject.channel.send(`>>> ${song.title} has been added to the queue.`);
                return;
            }
        });
    }
}
exports.default = plays;
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url), {
        quality: "highestaudio",
        highWaterMark: 1024 * 1024 * 10
    })
        .on('end', () => {
        console.log('Music ended.');
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
        .on("error", (e) => {
        return console.error(e);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcGxheXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsa0NBQWtDO0FBQ2xDLGdEQUFnRDtBQUloRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFeEIsSUFBSSxJQUFJLEdBQXVDO0lBQzdDLFVBQVUsRUFBRSxFQUFFO0lBQ2QsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYTtDQUMvQixDQUFDO0FBRUYsTUFBcUIsS0FBSztJQUExQjtRQUVxQixhQUFRLEdBQUcsT0FBTyxDQUFDO0lBNkd4QyxDQUFDO0lBM0dHLElBQUk7UUFDQSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDMUIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNSLE9BQU87YUFDVjtZQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUdyRCxJQUFHLENBQUMsY0FBYyxFQUFDO2dCQUNmLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7YUFDakY7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