import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as moment from "moment";
import update, { initialize } from "./update";

var FeastEnd:moment.Moment;
var onGoingFeast:boolean=false;
var hoursDisplay:string="00";
var minsDisplay:string="00";
var daysDisplay:number=0;

var interval:boolean=false;
export default class date implements IBotCommand {
  static newDate:any[][]=[];

  
    private readonly _command = "date";

    help(): string {
      return "";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

      setDate(client);
      
     
      }
   



} 
export function setDate(client: Discord.Client){
  countdown(client);
  if(interval==false){
    interval=true;
    setInterval(function(){countdown(client)}, 60000);
  }
}
async function countdown(client:Discord.Client){

 
  const feast1= update.TimerArray[0];
  const feast2=update.TimerArray[1];
  const now = moment.utc().subtract(5,"hours").format("YYYY-MM-DD HH:mm");
  const ESTnow = moment(now);
  // .utc().subtract(5,'hours');
console.log(ESTnow.format("YYYY-MM-DD HH:mm"));
  const feast1date=moment(feast1[1]);
  const feast2date=moment(feast2[1]);
     if(feast1date.isBefore(feast2date)){
      var end = feast1date;
     var nextFeast="feast1";
  
    }else{
      var end=feast2date;
      var nextFeast="feast2";
      
    } 
var hours;
  if(onGoingFeast){
 hours=  createDisplayTime(ESTnow,FeastEnd);
  }else{
  hours = createDisplayTime(ESTnow,end);
   
  }//else end
 const guild =client.guilds.get("404154708572373029");//Elysium guild ID
 if(!guild){
  console.log("Guild not found");
   return;

 }

  const timerChannel=guild.channels.get("633989276627107849");
  
  const nameChannel=guild.channels.get("634317691905376256");
  if(!timerChannel){
    console.log("timerChannel not found");
    return;
  }
  if(!nameChannel){
    console.log("nameChannel not found");
    return;
  }

    timerChannel.setName(	"⏱ "+daysDisplay+"D "+hoursDisplay+"H "+minsDisplay+"M");
  


if(hours<=0){
  if(onGoingFeast){
    onGoingFeast=false;
    timerChannel.setName("🎉 Feast is ending!");
    nameChannel.setName("🍖 "+"Time until Feast");
  }else{
      nameChannel.setName("🎉 "+"Feast is happening!");   
    if(nextFeast=="feast1"){
      FeastEnd=moment(feast1date).add(feast1[2],"minutes");
      onGoingFeast=true;
      feast1date.add(7,'days');
      feast1[1]=feast1date.format('YYYY-MM-DD HH:mm');
    }else{
      FeastEnd=moment(feast2date).add(feast2[2],"minutes");
      onGoingFeast=true;
      feast2date.add(7,'days');
      feast2[1]=feast2date.format('YYYY-MM-DD HH:mm');
    }
    timerChannel.setName("🎉 Feast starts now!");
  }

 feast1.pop();
 feast2.pop();
  date.newDate.push(feast1);
  date.newDate.push(feast2)
   initialize();

}
}

function createDisplayTime(now:moment.Moment,end:moment.Moment):number{
  
  const duration = moment.duration(end.diff(now));
  const hours = duration.asHours();

  daysDisplay=Math.floor(hours/24);
  var Remainder=hours % 24;
  var Hour=Math.floor(Remainder);
  var Minutes=Math.floor(60*(Remainder-Hour));

if(Hour.toString().length==1){
  hoursDisplay= "0"+Hour.toString();
}else{
  hoursDisplay=Hour.toString();
}
if(Minutes.toString().length==1){
  minsDisplay="0"+Minutes;
}else{
  minsDisplay=Minutes.toString();
}
return hours;
}