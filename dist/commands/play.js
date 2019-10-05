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
const join_1 = require("./join");
const youtubeSearch = require("youtube-search");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube("AIzaSyDGnC_2VEXkFXOmbMlwW75Zx7fTMbLM8q0");
var opts = {
    maxResults: 10,
    key: "AIzaSyDGnC_2VEXkFXOmbMlwW75Zx7fTMbLM8q0"
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
            msgObject.delete();
            if (!args[0]) {
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
            if (join_1.default.channelList.indexOf(currentChannel.id) == -1) {
                join_1.default.channelList.push(currentChannel.id);
                join_1.default.bigQueue.push(new Array());
                join_1.default.bigQueue[join_1.default.channelList.indexOf(currentChannel.id)].push(song);
                join_1.default.isPlaying.push(false);
            }
            else {
                join_1.default.bigQueue[join_1.default.channelList.indexOf(currentChannel.id)].push(song);
            }
            if (join_1.default.isPlaying[join_1.default.channelList.indexOf(currentChannel.id)] ==
                false ||
                typeof join_1.default.isPlaying[join_1.default.channelList.indexOf(currentChannel.id)] ==
                    "undefined") {
                join_1.default.isPlaying[join_1.default.channelList.indexOf(currentChannel.id)] = true;
                return playSong(join_1.default.bigQueue, msgObject, currentChannel);
            }
            else if (join_1.default.isPlaying[join_1.default.channelList.indexOf(currentChannel.id)] == true) {
                msgObject.channel.send(`${song.title} added to queue`);
                return;
            }
        });
    }
}
exports.default = play;
function playSong(queue, msg, currentChannel) {
    if (currentChannel) {
        currentChannel
            .join()
            .then(connection => {
            const dispatcher = connection
                .playStream(ytdl(queue[join_1.default.channelList.indexOf(currentChannel.id)][0].url, {
                quality: "highestaudio",
                highWaterMark: 1024 * 1024 * 10
            }))
                .on("start", () => {
                msg.channel.send(`>>> Now Playing: ${queue[join_1.default.channelList.indexOf(currentChannel.id)][0].title}-----`);
            })
                .on("end", end => {
                queue[join_1.default.channelList.indexOf(currentChannel.id)].shift();
                if (queue[join_1.default.channelList.indexOf(currentChannel.id)].length >= 1) {
                    return playSong(queue, msg, currentChannel);
                }
                else {
                    join_1.default.isPlaying[join_1.default.channelList.indexOf(currentChannel.id)] = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLGtDQUFrQztBQUNsQyxpQ0FBMEI7QUFDMUIsZ0RBQWdEO0FBQ2hELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFFdkUsSUFBSSxJQUFJLEdBQXVDO0lBQzdDLFVBQVUsRUFBRSxFQUFFO0lBQ2QsR0FBRyxFQUFFLHlDQUF5QztDQUMvQyxDQUFDO0FBQ0YsTUFBcUIsSUFBSTtJQUF6QjtRQUNtQixhQUFRLEdBQUcsTUFBTSxDQUFDO0lBb0pyQyxDQUFDO0lBbEpDLElBQUk7UUFDRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUssVUFBVSxDQUNkLElBQWMsRUFDZCxTQUEwQixFQUMxQixNQUFzQjs7WUFFdEIsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDckQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ1IsT0FBTzthQUNWO1lBQ0QsSUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLEVBQ3RFO2dCQUNBLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEIsSUFBSTtvQkFDRixNQUFNLFFBQVEsR0FBRyxHQUFHO3lCQUNqQixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQzt5QkFDdEIsS0FB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