import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class timer implements IBotCommand {

    private readonly _command = "timer";

    help(): string {
        return "";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
      if(!args[0]){
          return;
      }
      var d = new Date();
      const timerChannel=msgObject.guild.channels.get("633311434394173441");
      const minutes:number= +args[0];
      if(isNaN(minutes)){
          return;
      }
      if(timerChannel){
        var time=convertMinsToHrsMins(minutes);

            timerChannel.setName(time);
    }



} 
}
function convertMinsToHrsMins(minutes:number){

    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ? 0 + h : h;
    m = m < 10 ? 0 + m : m;
    return h + ':' + m;
}