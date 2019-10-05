import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as ytdl from "ytdl-core";
import join from "./join";
import * as youtubeSearch from "youtube-search";
const Youtube = require("simple-youtube-api");
const youtube = new Youtube("AIzaSyDGnC_2VEXkFXOmbMlwW75Zx7fTMbLM8q0");

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 10,
  key: "AIzaSyDGnC_2VEXkFXOmbMlwW75Zx7fTMbLM8q0"
};
export default class play implements IBotCommand {
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
    msgObject.delete();
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
    if (join.channelList.indexOf(currentChannel.id) == -1) {
        join.channelList.push(currentChannel.id);
        join.bigQueue.push(new Array());
        join.bigQueue[join.channelList.indexOf(currentChannel.id)].push(song);
        join.isPlaying.push(false);
      } else {
        join.bigQueue[join.channelList.indexOf(currentChannel.id)].push(song);
      }

      if (
        join.isPlaying[join.channelList.indexOf(currentChannel.id)] ==
          false ||
        typeof join.isPlaying[join.channelList.indexOf(currentChannel.id)] ==
          "undefined"
      ) {
        join.isPlaying[join.channelList.indexOf(currentChannel.id)] = true;
        // msgObject.channel.send("Playing song now.");
        return playSong(join.bigQueue, msgObject, currentChannel);
      } else if (
        join.isPlaying[join.channelList.indexOf(currentChannel.id)] == true
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
            ytdl(queue[join.channelList.indexOf(currentChannel.id)][0].url, {
              quality: "highestaudio",
              highWaterMark: 1024 * 1024 * 10
            })
          )
          .on("start", () => {
            msg.channel.send(
              `>>> Now Playing: ${queue[join.channelList.indexOf(currentChannel.id)][0].title}-----`
            );
          })
          .on("end", end => {
            queue[join.channelList.indexOf(currentChannel.id)].shift();

            if (
              queue[join.channelList.indexOf(currentChannel.id)].length >= 1
            ) {
              return playSong(queue, msg, currentChannel);
            } else {
              join.isPlaying[
                join.channelList.indexOf(currentChannel.id)
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
