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
            msgObject.channel.send(">>> Please wait...").then(msg => {
                msg.delete(5000);
            });
            if (!currentChannel) {
                msgObject.channel.send("You must be in a voice channel to use this command.");
                return;
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
    if (serverQueue) {
        serverQueue.songs = [];
        if (!guild.voiceConnection && msgObject) {
            msgObject.channel.send(">>> The bot is not in any voice channel.");
            return;
        }
        if (guild.voiceConnection.dispatcher) {
            guild.voiceConnection.dispatcher.end();
        }
    }
    else if (guild.voiceConnection && guild.voiceConnection.channel) {
        guild.voiceConnection.channel.leave();
        return;
    }
    else {
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLGtDQUFrQztBQUNsQyxnREFBZ0Q7QUFDaEQscUNBQThCO0FBRzlCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV4QixJQUFJLElBQUksR0FBdUM7SUFDN0MsVUFBVSxFQUFFLEVBQUU7SUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO0NBQy9CLENBQUM7QUFFRixNQUFxQixJQUFJO0lBQXpCO1FBRXFCLGFBQVEsR0FBRyxNQUFNLENBQUM7SUFnSHZDLENBQUM7SUE5R0csSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsT0FBTzthQUNWO1lBRUQsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxF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