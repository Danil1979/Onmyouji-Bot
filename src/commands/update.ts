import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {google} from "googleapis";
import { JWT } from "google-auth-library";

const creds = require('../../credentials.json');

export default class update implements IBotCommand {
    static dataArray:any[][]=[];
    private readonly _command = "update";

    help(): string {
        return "testing";
    }  
    
    isThisCommand(command: string): boolean {
       return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        initialize();
    }



}
async function gsrun(gclient:JWT){
    const gclientapi = google.sheets({version:'v4', auth: gclient});
    const opt ={
    spreadsheetId:'1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM',
    range:'Onmyouji1'
    };
    let data =await gclientapi.spreadsheets.values.get(opt);
    update.dataArray =data.data.values||[];
     update.dataArray.shift();

    
    }
    
  export function initialize():void{
      if(!process.env.CLIENT_KEY){
          console.log("CLIENT_KEY NOT FOUND.");
          
          return;
      }
const googleClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
"",
process.env.CLIENT_KEY.replace(/\\n/g, '\n'),
['https://www.googleapis.com/auth/spreadsheets.readonly']

);
    googleClient.authorize(function(err,tokens){
        if(err){console.error(err); return;}
        else{
            console.log('GoogleClient connected.');
            gsrun(googleClient);
        }
        });

  }