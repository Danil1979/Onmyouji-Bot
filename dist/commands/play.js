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
        return "~play songname or URL|to play a song from Youtube, user must be in a voice channel.\n";
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
                console.log("Music bot:URL");
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
                    console.log("Music Bot:Entering queueSong function");
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
                    console.log("Music bot: searching using song name");
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
                    console.log("Music Bot:Entering queueSong function.");
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
            console.log("entered searchVideo function");
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
            console.log("MusicBot:entered queueSong function.");
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
    console.log("playSong function");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLGtDQUFrQztBQUNsQyxnREFBZ0Q7QUFDaEQscUNBQThCO0FBQzlCLGlDQUEwQjtBQUMxQixpQ0FBMEI7QUFDMUIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJLElBQUksR0FBdUM7SUFDN0MsVUFBVSxFQUFFLEVBQUU7SUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO0NBQy9CLENBQUM7QUFDRixNQUFxQixJQUFJO0lBQXpCO1FBSW1CLGFBQVEsR0FBRyxNQUFNLENBQUM7SUFnS3JDLENBQUM7SUE5SkMsSUFBSTtRQUNGLE9BQU8sdUZBQXVGLENBQUM7SUFDakcsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFFbkMsQ0FBQztJQUVLLFVBQVUsQ0FDZCxJQUFjLEVBQ2QsU0FBMEIsRUFDMUIsTUFBc0I7O1lBRXRCLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBRXJELElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsT0FBTzthQUNWO1lBQ0QsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFDO2dCQUNoQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2dCQUM3RCxPQUFPO2FBQ1I7WUFDRCxJQUNFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMs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