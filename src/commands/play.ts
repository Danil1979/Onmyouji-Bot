import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as ytdl from "ytdl-core";
import * as youtubeSearch from "youtube-search";
import volume from "./volume";
import loop from "./loop";
import info from "./info";
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.YOUTUBE_TOKEN);
const queue = new Map();

var opts: youtubeSearch.YouTubeSearchOptions = {
  maxResults: 10,
  key: process.env.YOUTUBE_TOKEN
};

export default class play implements IBotCommand {

    private readonly _command = "play";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(!args[0]){
            return;
        }

        const serverQueue = queue.get(msgObject.guild.id);
        const currentChannel = msgObject.member.voiceChannel;


        if(!currentChannel){
            msgObject.channel.send("You must be in a voice channel to use this command.");
        }
        if(args[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)){
            const songInfo = await ytdl.getInfo(args[0]);
            var song = {
                title: songInfo.title,
                url:songInfo.video_url,
                channel:songInfo.author.name,
            };
        }else{
            const songToSearch = args.join(" ");
            const songInfo = await youtubeSearch(songToSearch, opts);
            if (songInfo.pageInfo.totalResults == 0) {
                msgObject.channel.send(">>> No song found.");
                return;
            } else {
                for (var i = 0; i < 10; i++) {
                    if (
                      songInfo.results[i].kind != undefined &&
                      songInfo.results[i].kind != "youtube#video"
                    ) {
                      continue;
                    } else {
                      break;
                    }
                  }
                  var song = {
                    title: songInfo.results[i].title,
                    url:songInfo.results[i].link,
                    channel:songInfo.results[i].channelTitle
                };
                const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle(`${song.title}`)
                .setDescription(
                  `You searched for ${songToSearch}, here is what I found!\n${song.url}`
                )
                .setFooter(`Channel Name:${song.channel}`);
      
               msgObject.channel.send({ embed });
            }
        }
        
   
    

        if(!serverQueue){

            const   queueConstruct :{
                textChannel: Discord.TextChannel|Discord.DMChannel|Discord.GroupDMChannel,
                voiceChannel: Discord.VoiceChannel,
                connection: Discord.VoiceConnection|null,
                songs: any[],  
                playing: boolean
                
            } ={
                textChannel: msgObject.channel,
                voiceChannel:currentChannel,
                connection: null,
                songs: [],
                playing: true,
            };

            queue.set(msgObject.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try{
                var connection = await currentChannel.join();
                    queueConstruct.connection = connection;
                    playSong(msgObject.guild,queueConstruct.songs[0],msgObject);
            } catch(err){
                console.error(err);
                queue.delete(msgObject.guild.id);
                msgObject.channel.send(err);
                return;
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            msgObject.channel.send(`>>> ${song.title} has been added to the queue.`);
            return;
        }

    }


} 

function playSong(guild:Discord.Guild,song:any,msgObject:Discord.Message) {
    const serverQueue = queue.get(guild.id);

    if(!song){
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }    
    const dispatcher:Discord.StreamDispatcher = serverQueue.connection.playStream(ytdl(song.url),{
        quality: "highestaudio",
        highWaterMark: 1024 * 1024 * 10
    }).on('start',()=>{
        dispatcher.setVolume(volume.volume/100);
        msgObject.channel.send(`>>> Now playing ${song.title} with volume ${volume.volume}%`);
        
    })
    .on('end',()=> {
        console.log('Music ended.');
        serverQueue.songs.shift();
        playSong(guild,serverQueue.songs[0],msgObject);
    })
    .on("error", (e: any) => {
        return console.error(e);
      });
}

export function popSong(guild:Discord.Guild,msgObject:Discord.Message){
    const serverQueue = queue.get(guild.id);
    if(!serverQueue.songs[0]){
        msgObject.channel.send(">>> No song are playing at the moment.");
        return;
    }
    if(serverQueue.songs.length==1){
                   msgObject.channel.send(">>> I can't remove the only song in the queue.");
                return;
    }
        const removedSong:any= serverQueue.songs.pop();
        msgObject.channel.send(`>>> Successfully removed ${removedSong.title} from the queue.`)

}
