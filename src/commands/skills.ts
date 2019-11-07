import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import update, { initialize } from "./update";
const queue = new Map();
export default class skills implements IBotCommand {

    private readonly _command = "skills";

    help(): string {
        return "~skills shikiname|to search for a shiki's skill set.\n";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

      const shikiQuery = args.join(" ");
      if(!args[0]){
        return;
    }


    this.accessSheet(shikiQuery,msgObject,false);
    }
    async accessSheet(shikiQuery:string,msgObject:Discord.Message,retried:boolean){
     const serverQueue = queue.get(msgObject.guild.id);
     const shikiQueue = new Map();
      var shiki:boolean=false;
      var queryArray=[];

      for(var i=0;i<update.skillArray.length;i++){
              const aliasArray:string[] =update.skillArray[i][1].split(",");
              for(let x=0;x<aliasArray.length;x++){
                if(aliasArray[x].charAt(0)==" "){
                  aliasArray[x]=aliasArray[x].substring(1);
              }
                  aliasArray[x]=aliasArray[x].toLowerCase();
              }
              if(update.skillArray[i][0].toLowerCase()==shikiQuery.toLowerCase()){
                   queryArray.push(update.skillArray[i]);
                   shikiQueue.set(update.skillArray[i][0],true);
                   shiki=true;
                  break;
              }
            
              if(aliasArray.indexOf(shikiQuery.toLowerCase())!=-1){
                queryArray.push(update.skillArray[i]);
                shikiQueue.set(update.skillArray[i][0],true);
                shiki=true;
                  break;
           }     
      }
     const shikiCheck= shikiQueue.get(update.skillArray[i][0]);


     //possible redundant
      for(let x=i+1;x<update.skillArray.length;x++){
        if(update.skillArray[x][0]!=""){

          break;
        }
        queryArray.push(update.skillArray[x]);
      }
   
      if(shiki&&shikiCheck){
        console.log("shikiCheck pass");
        var tempArray=[];
        var skill=queryArray[0][3];
          for(let i=0;i<queryArray.length;i++){
              if(queryArray[i][3]==skill||queryArray[i][3]==""){
 
                tempArray.push(queryArray[i]);

              }else{
                //when its not the same skill
                
                skill=queryArray[i][3];
                //empty tempArray
                tempArray.splice(0,queryArray.length);

                tempArray.push(queryArray[i]);
    
              }
           
          }
          this.format(tempArray,msgObject);
      }else if(!shiki&&retried){
        msgObject.channel.send(`Sorry, I can't find the Shikigami named ${shikiQuery} to display it's skills.`)
        return;
    }else if(!shiki&&!retried){
        await initialize();
        this.accessSheet(shikiQuery,msgObject,true);  
        };
 
  }
//|Shiki name	|Alias|	number of skills|	skill|	SKILL upgrade|	skill level|	type|	coldown	|onibi|thumbnail|skillname|note name|note description

  format(tempArray:any[][],msgObject:Discord.Message){
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

    var skillLevel="";
    var skillUpgrade="";
    var level="Level";
    var effect="Effect";
    if(tempArray[0][5]==""){ 
      skillLevel="\u200b";
      skillUpgrade="\u200b";
      level="\u200b";
      effect="\u200b";
    }else{
      for(let i=0;i<tempArray.length;i++){
        skillLevel+=tempArray[i][5];
        skillLevel+="\n"
        skillUpgrade+=tempArray[i][4];
        skillUpgrade+="\n"
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
    .addField(level+" and "+effect,skillLevel+" "+skillUpgrade,false)
    // .addField(effect,skillUpgrade,true)
    for(let i=0;i<noteArray.length;i++){
      embed.addField(noteArray[i],noteArrayValue[i],true);
    }
    // msgObject.channel.send(embed)
    // .catch(console.error);
    manageMessage(embed,msgObject);
  }


} 

function manageMessage(embed:Discord.RichEmbed,msgObject:Discord.Message){
 const msgID= msgObject.channel.send(embed).then(msg =>{
    return (msg as Discord.Message).id;
  })

}