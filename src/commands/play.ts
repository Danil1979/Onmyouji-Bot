import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as ytdl from "ytdl-core";
import * as youtubeSearch from "youtube-search";
import volume from "./volume";
import loop from "./loop";
const Youtube = require("simple-youtube-api");
const youtube = new Youtube("AIzaSyDGnC_2VEXkFXOmbMlwW75Zx7fTMbLM8q0");

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 10,
  key: "AIzaSyDGnC_2VEXkFXOmbMlwW75Zx7fTMbLM8q0"
};
export default class play implements IBotCommand {
  static bigQueue: any[] = [];
  static channelList: string[] = [];
  static isPlaying: boolean[] = [];
  private readonly _command = "play";

  help(): string {
    return "testing";
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(
    args: string[],
    msgObject: Discord.Message,
    client: Discord.Client
  ): Promise<void> {
    const currentChannel = msgObject.member.voiceChannel;

    if(!args[0]){
        return;
    }
    if (
      args[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
    ) {
      const url = args[0];

      try {
        const urlQuery = url
          .replace(/(>|<)/gi, "")
          .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        const id = urlQuery[2].split(/[^0-9a-z_\-]/i)[0];
        const video = await youtube.getVideoByID(id);

        if (video.raw.snippet.liveBroadcastContent === "live") {
          msgObject.channel.send("I don't support ive streams!");
          return;
        }
        //if video length > 1 hours, dont allow
        // if (video.duration.hours !== 0) {
        //   msgObject.channel.send("I cannot play video longer than 1 hour");
        //   return;
        // }

        const title = video.title;
        const song = {
          url,
          title,
          currentChannel
        };
        this.queueSong(currentChannel,song,msgObject);
      } catch (err) {
        console.error(err);
        msgObject.channel.send("error occur");
        return;
      }
    } else {
      try {
        const songToSearch = args.join(" ");
        var songInfo = await this.searchVideo(songToSearch);
        if (!songInfo) {
          msgObject.channel.send(
            `>>> There was an error searching for ${songToSearch}, please try something else`
          );
          return;
        }
        let songFound = false;
        for (var i = 0; i < 10; i++) {
          if (
            songInfo.results[i].kind != undefined &&
            songInfo.results[i].kind != "youtube#video"
          ) {
            continue;
          } else {
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
          .setDescription(
            `You searched for ${songToSearch}, here is what I found!\n${song.url}`
          )
          .setFooter(`Channel Name:${song.channel}`);

        await msgObject.channel.send({ embed });

        // if (song.raw.snippet.liveBroadcastContent === "live") {
        //   msgObject.channel.send("I don't support livestream!");
        //   return;
        // }
      } catch (err) {
        console.error(err);
        return;
      }
      try {
          this.queueSong(currentChannel,song,msgObject);
 
      } catch (err) {
        console.error(err);
        return;
      }
    }
  }
  async searchVideo(songToSearch: string): Promise<any> {
    const songInfo = await youtubeSearch(songToSearch, opts);
    if (songInfo.pageInfo.totalResults == 0) {
      return null;
    } else {
      return songInfo;
    }
  }
  async queueSong(currentChannel:Discord.VoiceChannel,song:any,msgObject:Discord.Message):Promise<void>{
    if (play.channelList.indexOf(currentChannel.id) == -1) {
      play.channelList.push(currentChannel.id);
      play.bigQueue.push(new Array());
      play.bigQueue[play.channelList.indexOf(currentChannel.id)].push(song);
      play.isPlaying.push(false);
      } else {
        play.bigQueue[play.channelList.indexOf(currentChannel.id)].push(song);
      }

      if (
        play.isPlaying[play.channelList.indexOf(currentChannel.id)] ==
          false ||
        typeof play.isPlaying[play.channelList.indexOf(currentChannel.id)] ==
          "undefined"
      ) {
        play.isPlaying[play.channelList.indexOf(currentChannel.id)] = true;
        // msgObject.channel.send("Playing song now.");
        return playSong(play.bigQueue, msgObject, currentChannel);
      } else if (
        play.isPlaying[play.channelList.indexOf(currentChannel.id)] == true
      ) {
        msgObject.channel.send(`${song.title} added to queue`);
        return;
      }
  }


}

export function playSong(
  queue: any[],
  msg: Discord.Message,
  currentChannel?: Discord.VoiceChannel
): void {
  if (currentChannel) {
    currentChannel
      .join()
      .then(connection => {
        const dispatcher = connection
          .playStream(
            ytdl(queue[play.channelList.indexOf(currentChannel.id)][0].url, {
              quality: "highestaudio",
              highWaterMark: 1024 * 1024 * 10
            })
          )
          .on("start", () => {
            dispatcher.setVolume(volume.volume/100);
            msg.channel.send(
              `>>> Now Playing: ${queue[play.channelList.indexOf(currentChannel.id)][0].title} with volume-----`
            );
          })
          .on("end", end => {
            if(!loop.loop){
              queue[play.channelList.indexOf(currentChannel.id)].shift();
            }
  

            if (
              queue[play.channelList.indexOf(currentChannel.id)].length >= 1
            ) {
              return playSong(queue, msg, currentChannel);
            } else {
              play.isPlaying[
                play.channelList.indexOf(currentChannel.id)
              ] = false;

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
