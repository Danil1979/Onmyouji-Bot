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
const loop_1 = require("./loop");
const info_1 = require("./info");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.YOUTUBE_TOKEN);
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
            const currentChannel = msgObject.member.voiceChannel;
            if (!args[0]) {
                return;
            }
            if (!msgObject.member.voiceChannel) {
                msgObject.channel.send("Please join a voice channel first.");
                return;
            }
            if (args[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
                const url = args[0];
                try {
                    const urlQuery = url
                        .replace(/(>|<)/gi, "")
                        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                    const id = urlQuery[2].split(/[^0-9a-z_\-]/i)[0];
                    const video = yield youtube.getVideoByID(id);
                    if (video.raw.snippet.liveBroadcastContent === "live") {
                        msgObject.channel.send("I don't support ive streams!");
                        return;
                    }
                    const title = video.title;
                    const song = {
                        url,
                        title,
                        currentChannel
                    };
                    this.queueSong(currentChannel, song, msgObject);
                }
                catch (err) {
                    console.error(err);
                    msgObject.channel.send("error occur");
                    return;
                }
            }
            else {
                try {
                    const songToSearch = args.join(" ");
                    var songInfo = yield this.searchVideo(songToSearch);
                    if (!songInfo) {
                        msgObject.channel.send(`>>> There was an error searching for ${songToSearch}, please try something else`);
                        return;
                    }
                    let songFound = false;
                    for (var i = 0; i < 10; i++) {
                        if (songInfo.results[i].kind != undefined &&
                            songInfo.results[i].kind != "youtube#video") {
                            continue;
                        }
                        else {
                            songFound = true;
                            break;
                        }
                    }
                    if (songFound == false) {
                        msgObject.channel.send(">>> Song not found");
                        return;
                    }
                    var song = {
                        title: songInfo.results[i].title,
                        url: songInfo.results[i].link,
                        channel: songInfo.results[i].channelTitle,
                        currentChannel
                    };
                    const embed = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${song.title}`)
                        .setDescription(`You searched for ${songToSearch}, here is what I found!\n${song.url}`)
                        .setFooter(`Channel Name:${song.channel}`);
                    yield msgObject.channel.send({ embed });
                }
                catch (err) {
                    console.error(err);
                    return;
                }
                try {
                    this.queueSong(currentChannel, song, msgObject);
                }
                catch (err) {
                    console.error(err);
                    return;
                }
            }
        });
    }
    searchVideo(songToSearch) {
        return __awaiter(this, void 0, void 0, function* () {
            const songInfo = yield youtubeSearch(songToSearch, opts);
            if (songInfo.pageInfo.totalResults == 0) {
                return null;
            }
            else {
                return songInfo;
            }
        });
    }
    queueSong(currentChannel, song, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (play.channelList.indexOf(currentChannel.id) == -1) {
                play.channelList.push(currentChannel.id);
                play.bigQueue.push(new Array());
                play.bigQueue[play.channelList.indexOf(currentChannel.id)].push(song);
                play.isPlaying.push(false);
            }
            else {
                play.bigQueue[play.channelList.indexOf(currentChannel.id)].push(song);
            }
            if (play.isPlaying[play.channelList.indexOf(currentChannel.id)] ==
                false ||
                typeof play.isPlaying[play.channelList.indexOf(currentChannel.id)] ==
                    "undefined") {
                play.isPlaying[play.channelList.indexOf(currentChannel.id)] = true;
                return playSong(play.bigQueue, msgObject, currentChannel);
            }
            else if (play.isPlaying[play.channelList.indexOf(currentChannel.id)] == true) {
                msgObject.channel.send(`${song.title} added to queue`);
                return;
            }
        });
    }
}
exports.default = play;
play.bigQueue = [];
play.channelList = [];
play.isPlaying = [];
function playSong(queue, msg, currentChannel) {
    if (currentChannel) {
        currentChannel
            .join()
            .then(connection => {
            const dispatcher = connection
                .playStream(ytdl(queue[play.channelList.indexOf(currentChannel.id)][0].url, {
                quality: "highestaudio",
                highWaterMark: 1024 * 1024 * 10
            }))
                .on("start", () => {
                dispatcher.setVolume(volume_1.default.volume / 100);
                if (info_1.default.info == true) {
                    msg.channel.send(`>>> Now Playing: ${queue[play.channelList.indexOf(currentChannel.id)][0].title} with volume: ${volume_1.default.volume}%-----`);
                }
            })
                .on("end", end => {
                if (!loop_1.default.loop) {
                    queue[play.channelList.indexOf(currentChannel.id)].shift();
                }
                if (queue[play.channelList.indexOf(currentChannel.id)].length >= 1) {
                    return playSong(queue, msg, currentChannel);
                }
                else {
                    play.isPlaying[play.channelList.indexOf(currentChannel.id)] = false;
                    return currentChannel.leave();
                }
            })
                .on("error", e => {
                msg.channel.send("error has occured");
                return console.error(e);
            });
        })
            .catch(err => console.error(err));
    }
}
exports.playSong = playSong;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLGtDQUFrQztBQUNsQyxnREFBZ0Q7QUFDaEQscUNBQThCO0FBQzlCLGlDQUEwQjtBQUMxQixpQ0FBMEI7QUFDMUIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJLElBQUksR0FBdUM7SUFDN0MsVUFBVSxFQUFFLEVBQUU7SUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO0NBQy9CLENBQUM7QUFDRixNQUFxQixJQUFJO0lBQXpCO1FBSW1CLGFBQVEsR0FBRyxNQUFNLENBQUM7SUEwSnJDLENBQUM7SUF4SkMsSUFBSTtRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRW5DLENBQUM7SUFFSyxVQUFVLENBQ2QsSUFBYyxFQUNkLFNBQTBCLEVBQzFCLE1BQXNCOztZQUV0QixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUVyRCxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNSLE9BQU87YUFDVjtZQUNELElBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQztnQkFDaEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztnQkFDN0QsT0FBTzthQUNSO1lBQ0QsSUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHVE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