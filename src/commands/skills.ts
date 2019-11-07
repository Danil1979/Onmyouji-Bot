import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import update from "./update";
const queue = new Map();
export default class skills implements IBotCommand {

    private readonly _command = "skills";

    help(): string {
        return "skills";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        const shikiQuery = args.join(" ");
        if(!args[0]){
          return;
      }
      accessSheet(shikiQuery,msgObject,client.user.id);
      // console.log(client.user.id);
    }



} 

function accessSheet(shikiQuery:string,msgObject:Discord.Message,id:string){
    let shikiArray=[];
    let shiki:boolean=false;
    for(var i=0;i<update.skillArray.length;i++){
        const aliasArray:string[] =update.skillArray[i][1].split(",");
        
        for(let x=0;x<aliasArray.length;x++){
            aliasArray[x]=aliasArray[x].trim();
            aliasArray[x]=aliasArray[x].toLowerCase();
        }

        
        if(update.skillArray[i][0].toLowerCase()==shikiQuery.toLowerCase()){
            shikiArray.push(update.skillArray[i]);
            //  shikiQueue.set(update.skillArray[i][0],true);
             shiki=true;
            break;
        }
      
        if(aliasArray.indexOf(shikiQuery.toLowerCase())!=-1){
            shikiArray.push(update.skillArray[i]);
        //   shikiQueue.set(update.skillArray[i][0],true);
          shiki=true;
            break;
     }     
}
if(shiki){
    console.log("shiki found");

    for(let x=i+1;x<update.skillArray.length;x++){
        if(update.skillArray[x][0]!=""){
    
          break;
        }
        shikiArray.push(update.skillArray[x]);
      }

      let tempArray = [];
      let skillArray =[];
      let skillName= shikiArray[0][3];
      for(let i=0;i<shikiArray.length;i++){

        if(shikiArray[i][3]==skillName||shikiArray[i][3]==""){
 
            tempArray.push(shikiArray[i]);

          }else{
            //when its not the same skill
            skillArray.push(tempArray.slice(0));

            skillName=shikiArray[i][3];
            //empty tempArray
            tempArray.splice(0,shikiArray.length);

            tempArray.push(shikiArray[i]);

          }


      }
      skillArray.push(tempArray.slice(0));
      queue.set(msgObject.guild.id,skillArray);
      const embedArray:Discord.RichEmbed[]=[];
      skillArray.forEach(embed => {
         embedArray.push(format(embed));
      });

 
      sendMessage(embedArray,msgObject,id);



}else{
    msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery} to display it's skills.`)
}


}
function format(tempArray:any[][]):Discord.RichEmbed{
    const shikiSkill={
      name:tempArray[0][0],
      skillDescription:tempArray[0][3],
      type:tempArray[0][6],
      coldown:tempArray[0][7],
      onibi:tempArray[0][8],
      thumbnail:tempArray[0][9],
      skillname:tempArray[0][10]
    }
    var noteArray=[];
    var noteArrayValue=[];
    for(let i=0;i<tempArray.length;i++){
      if(tempArray[i][11]){
        
        noteArray.push(tempArray[i][11]);
        noteArrayValue.push(tempArray[i][12]);
      }
    }

    // var skillLevel="";
    // var skillUpgrade="";
    var skillDisplay="";
    var level="Level";
    var effect="Effect";
    if(tempArray[0][5]==""){ 
    //   skillLevel="\u200b";
    //   skillUpgrade="\u200b";
      skillDisplay="\u200b";
      level="\u200b";
      effect="\u200b";
    }else{
      for(let i=0;i<tempArray.length;i++){
        // skillLevel+=tempArray[i][5];
        // skillLevel+="\n"
        // skillUpgrade+=tempArray[i][4];
        // skillUpgrade+="\n"
        skillDisplay+=tempArray[i][5];
        skillDisplay+=". ";
        skillDisplay+=tempArray[i][4];
        skillDisplay+="\n";
      }
    }
   
    let embed =new Discord.RichEmbed()
    // .addField(shikiSkill.name,"\u200b",false)
    .setAuthor(shikiSkill.skillname)
    .setDescription(shikiSkill.skillDescription)
    .setThumbnail(shikiSkill.thumbnail)
    .setColor("RANDOM")
    .addField("Type",shikiSkill.type,true)
    .addField("Onibi",shikiSkill.onibi,true)
    .addField(level+" and "+effect,skillDisplay,false)
    // .addField(effect,skillUpgrade,true)
    for(let i=0;i<noteArray.length;i++){
      embed.addField(noteArray[i],noteArrayValue[i],true);
    }
    // msgObject.channel.send(embed)
    // .catch(console.error);
    return embed;
  }

  async function sendMessage(embedArray:Discord.RichEmbed[],msgObject:Discord.Message,id:string){

   const messageID= await msgObject.channel.send(embedArray[0]).then(msg =>{
        return (msg as Discord.Message).id;
    })
  const msg= await msgObject.channel.fetchMessage(messageID);
    
setTimeout(() => {
    sendMessage2(msg,msgObject,embedArray,id);
}, 500);
 

  }

  async function sendMessage2(msg:Discord.Message,msgObject:Discord.Message,embedArray:Discord.RichEmbed[],id:string){
 
    await msg.react('👍').then(() => msg.react('👎'));
    const filter = (reaction: { emoji: { name: string; }; }) => {
        return ['👍', '👎'].includes(reaction.emoji.name) ;
    };
    messageReact(filter,msg,embedArray,0,id)

  }

  
  function messageReact(filter:any,msg:Discord.Message,embedArray:Discord.RichEmbed[],index:number,id:string){


    msg.awaitReactions(filter, { max:1, time: 300000, errors: ['time'] })
    .then(collected => {
        const botReaction = collected.first();
 
        //    collected.first().remove("222728476816310272")
            
        
            botReaction.users.forEach(user => {
                if(user.id!=id){
                    botReaction.remove(user.id);
                }
            });
            
       
        if (botReaction.emoji.name === '👍') {
            index--;
            if(index<=-1){
                index=3;
            }
            
            
       
            msg.edit(embedArray[index]);
            messageReact(filter,msg,embedArray,index,id);
        } else {
            index++;
            if(index>=3){
                index=0;
            }
     
            msg.edit(embedArray[index]);
            messageReact(filter,msg,embedArray,index,id);
        }
    })
    .catch(collected => {
        msg.delete();
    });

}