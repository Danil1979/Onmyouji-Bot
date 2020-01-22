import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as moment from "moment";
import update, { initialize } from "./update";

var interval:boolean=false;
var hoursDisplay:string="00";
var minsDisplay:string="00";
var daysDisplay:number=0;

export default class testCommand implements IBotCommand {
    static birthday:any[][]=[];

    private readonly _command = "testCommand";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      
    }
} 
export function setBirthday(client: Discord.Client){
    countdown(client);
    if(interval==false){
      interval=true;
      setInterval(function(){countdown(client)}, 60000);
    }
  }

async function countdown(client: Discord.Client){
    const now = moment.utc().format("YYYY-MM-DD HH:mm");
    const stringNow = moment(now);
    console.log(now);

    const guild =client.guilds.get("378048380200288257");//GJR guild ID

    if(!guild){
        console.log("GJR Guild not found");
        return;
    }
    const end = update.birthdayArray[0];
    console.log(end);
    const stringEnd = moment(end);
    const hours = createDisplayTime(stringNow,stringEnd);

    const timerChannel=guild.channels.get("669532629502001152");

    if(!timerChannel){
        console.log("timerChannel not found");
        return;
    }
    timerChannel.setName(	"⏱ "+daysDisplay+"D "+hoursDisplay+"H "+minsDisplay+"M");
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