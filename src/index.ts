import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";
import { initialize}  from "./commands/update";
import { setDate } from "./commands/date";
import { leaveChannel } from "./commands/play";
require('dotenv').config();


const client: Discord.Client = new Discord.Client();



let commands : IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

client.on("ready", async ()=>{
    //when bot is ready

    //bot activity
    client.user.setActivity("Ring Toss!", {type:"PLAYING" });
   await initialize();
    setDate(client);
    console.log("Ready!!");
})

client.on("rateLimit",msg=>{
    console.log("ATTENTION!HITTING RATE LIMIT "+msg);
})
client.on("voiceStateUpdate",(_oldmember,newmember)=>{

    if(newmember.user.id==client.user.id){
        if(!newmember.voiceChannel){
            leaveChannel(newmember.guild);
        }
    }
    })
client.on("message",msg=>{

    //if messager = bot, ignore it
    if(msg.author.bot) {return;}
    //if its direct message then ignore
    if(msg.channel.type=="dm"){return;}
    //if message did not start with ~
    if(!msg.content.startsWith(ConfigFile.config.prefix)) {return;}

    if(msg.content.toLowerCase()=="~help"){
        help(msg);
        return;
    }
    //Handle Command
    handleCommand(msg);
})

async function help(msg:Discord.Message){
    var commandList:string=">>> ";
    for(const commandsClass of commands){
        //attempt to execute commands
        try {
           
       
            //Pause execution whilst we run the command's coce
            commandList +=await commandsClass.help();
            
        }
        catch(exception){

            console.log(exception);
        }
    }
    msg.channel.send(commandList);
}
async function handleCommand(msg:Discord.Message){
//Split the string into command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    for(const commandsClass of commands){
        //attempt to execute commands
        try {
            //check commandClass for if this command is the correct one
            if(!commandsClass.isThisCommand(command)){
                //go to next one if this is not the correct one
                continue;
            }
            //Pause execution whilst we run the command's coce
            await commandsClass.runCommand(args,msg, client);
            
        }
        catch(exception){

            console.log(exception);
        }
    }
}

 function loadCommands(commandsPath: string){
//Exit if no commands
if(!ConfigFile.config ||(ConfigFile.config.commands as string[]).length === 0 ){return; }

//Loop through command list
for (const commandName of ConfigFile.config.commands as string[]){

    const commandsClass = require(`${commandsPath}/${commandName}`).default;

    const command = new commandsClass() as IBotCommand;

    commands.push(command);
}   

 }

client.login(process.env.DISCORD_TOKEN);
