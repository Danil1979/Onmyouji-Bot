import * as Discord from "discord.js";

export interface IBotCommand {
help(): string;
isThisCommand(command:string):boolean;
runCommand(args:string[], msgObject:Discord.Message, client: Discord.Client): Promise<void>;


}
export interface emojis{
[key:string]:string
        SS:"<:ss:632559004266266625>",
        spd:"<:spd:632559004278718487>",
        S:"<:s_:632559004379250688>",
        hp:"<:hp:632559004106883104>",
        def:"<:def:632559004383707147>",
        D:"<:d_:632559004366929950>",
        crit:"<:crit:632559004375056385>",
        C:"<:c_:632559004157214731>",
        B:"<:b_:632559004366667776>",
        att:"<:att:632559004450684928>",
        A:"<:a_:632559004341633028>"

}
