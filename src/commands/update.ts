import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { promises } from "dns";
import date from "./date";

export default class update implements IBotCommand {
  static dataArray: any[][] = [];
  static skillArray: any[][] = [];
  static TimerArray: any[][] = [];
  static soulArray: any[][] = [];
  static bountiesArray: any[][]=[];
  static cluesArray: any[][] = [];  
  private readonly _command = "update";

  help(): string {
    return "";
  }

  isThisCommand(command: string): boolean {
    return command === this._command;
  }

  async runCommand(
    args: string[],
    msgObject: Discord.Message,
    client: Discord.Client
  ): Promise<void> {
    await initialize();

    msgObject.channel.send(">>> Updated.");
  }
}

async function gsrun(gclient: JWT): Promise<void> {
   const gclientapi = google.sheets({ version: "v4", auth: gclient });
  const opt = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Stats"
  };
  const skill = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Skills"
  };
  const timer = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Timers"
  }
  const soul = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Souls"
  }
  const bounties = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Bounties!A:E"
  }
  const clues = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Bounties!A:B"
  }
  const updateOption = {
  spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
  range: "Timers!A2",
  valueInputOption: 'USER_ENTERED',
  resource: {values:date.newDate}
}
if(date.newDate === undefined || date.newDate.length == 0){
    let soulData =await gclientapi.spreadsheets.values.get(soul);
    let data = await gclientapi.spreadsheets.values.get(opt);
    let skillData = await gclientapi.spreadsheets.values.get(skill);
    let timerData = await gclientapi.spreadsheets.values.get(timer);
    let bountiesData = await gclientapi.spreadsheets.values.get(bounties);
    let cluesData = await gclientapi.spreadsheets.values.get(clues);
    update.soulArray = soulData.data.values || [];
    update.dataArray = data.data.values || [];
    update.skillArray = skillData.data.values || [];
    update.TimerArray =   timerData.data.values || [];
    update.bountiesArray = bountiesData.data.values || [];
    update.cluesArray = cluesData.data.values || [];
    update.dataArray.shift();
    update.skillArray.shift();
    update.TimerArray.shift();
    update.bountiesArray.shift();
    update.cluesArray.shift();
    return;
}else{

    let res = await gclientapi.spreadsheets.values.update(updateOption);
    date.newDate=[];
    let timerData = await gclientapi.spreadsheets.values.get(timer);
    update.TimerArray =   timerData.data.values || [];
    update.TimerArray.shift();
    return;
}


  
}

export async function initialize(): Promise<void> {
  var connected;
  if (!process.env.CLIENT_KEY) {
    console.log("CLIENT_KEY NOT FOUND.");

    return;
  }
  const googleClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    "",
    process.env.CLIENT_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  googleClient.authorize(async function(err, tokens) {
    if (err) {
      console.error(err);
      return;
    } else {
      return;
    }
  });
 await gsrun(googleClient);
 console.log("GoogleClient connected.");
 return;

}
