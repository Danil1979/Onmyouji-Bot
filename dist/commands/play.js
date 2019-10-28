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
const volume_1 = require("./volume");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.YOUTUBE_TOKEN);
const queue = new Map();
var opts = {
    maxResults: 10,
    key: process.env.YOUTUBE_TOKEN
};
class play {
    constructor() {
        this._command = "play";
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
                    playing: true,
                };
                queue.set(msgObject.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
                try {
                    var connection = yield currentChannel.join();
                    queueConstruct.connection = connection;
                    playSong(msgObject.guild, queueConstruct.songs[0], msgObject);
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
exports.default = play;
function playSong(guild, song, msgObject) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url), {
        quality: "highestaudio",
        highWaterMark: 1024 * 1024 * 10
    }).on('start', () => {
        dispatcher.setVolume(volume_1.default.volume / 100);
        msgObject.channel.send(`>>> Now playing ${song.title} with volume ${volume_1.default.volume}%`);
    })
        .on('end', () => {
        console.log('Music ended.');
        serverQueue.songs.shift();
        playSong(guild, serverQueue.songs[0], msgObject);
    })
        .on("error", (e) => {
        return console.error(e);
    });
}
function popSong(guild, msgObject) {
    const serverQueue = queue.get(guild.id);
    if (!serverQueue.songs[0]) {
        msgObject.channel.send(">>> No song are playing at the moment.");
        return;
    }
    if (serverQueue.songs.length == 1) {
        msgObject.channel.send(">>> I can't remove the only song in the queue.");
        return;
    }
    const removedSong = serverQueue.songs.pop();
    msgObject.channel.send(`>>> Successfully removed ${removedSong.title} from the queue.`);
}
exports.popSong = popSong;
function leaveChannel(guild, msgObject) {
    const serverQueue = queue.get(guild.id);
    serverQueue.songs = [];
    if (!msgObject.guild.voiceConnection) {
        msgObject.channel.send(">>> The bot is not in any voice channel.");
        return;
    }
    if (msgObject.guild.voiceConnection.dispatcher) {
        msgObject.guild.voiceConnection.dispatcher.end();
    }
}
exports.leaveChannel = leaveChannel;
function queueList(guild, msgObject) {
    const serverQueue = queue.get(guild.id);
    var Once = false;
    const embed = new Discord.RichEmbed()
        .setAuthor("===================================================")
        .setColor("RANDOM")
        .setDescription(`Now Playing:\n[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`);
    for (let i = 1; i < serverQueue.songs.length; i++) {
        if (!Once) {
            Once = true;
            embed.addField("\u200b", "Up Next", false);
        }
        embed.addField("\u200b", i + `. [${serverQueue.songs[i].title}](${serverQueue.songs[i].url})`, false);
    }
    msgObject.channel.send(embed);
}
exports.queueList = queueList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLGtDQUFrQztBQUNsQyxnREFBZ0Q7QUFDaEQscUNBQThCO0FBRzlCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV4QixJQUFJLElBQUksR0FBdUM7SUFDN0MsVUFBVSxFQUFFLEVBQUU7SUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO0NBQy9CLENBQUM7QUFFRixNQUFxQixJQUFJO0lBQXpCO1FBRXFCLGFBQVEsR0FBRyxNQUFNLENBQUM7SUE0R3ZDLENBQUM7SUExR0csSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsT0FBTzthQUNWO1lBRUQsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBR3JELElBQUcsQ0FBQyxjQUFjLEVBQUM7Z0JBQ2YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMs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