import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { promises } from "dns";

export default class update implements IBotCommand {
  static dataArray: any[][] = [];
  static skillArray: any[][] = [];
  private readonly _command = "update";

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
    await initialize();

    msgObject.channel.send(">>> Updated.");
  }
}

async function gsrun(gclient: JWT): Promise<boolean> {
  const gclientapi = google.sheets({ version: "v4", auth: gclient });
  const opt = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Onmyouji1"
  };
  const skill = {
    spreadsheetId: "1Ff5Jkwizib0XyOFSEJzWbiWkqJgYxZJdtMjWStzj5WM",
    range: "Skill"
  };
  let data = await gclientapi.spreadsheets.values.get(opt);
  let skillData = await gclientapi.spreadsheets.values.get(skill);

  update.dataArray = data.data.values || [];
  update.skillArray = skillData.data.values || [];
  update.dataArray.shift();
  update.skillArray.shift();
  return true;
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
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );
  googleClient.authorize(async function(err, tokens) {
    if (err) {
      console.error(err);
      return;
    } else {
      return;
    }
  });
  connected = await gsrun(googleClient);
  if (connected) {
    console.log("GoogleClient connected.");
    return;
  }
}
