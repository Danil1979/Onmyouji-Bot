"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class help {
    constructor() {
        this._command = "help";
    }
    help() {
        return "testing";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            var helpMessage = "```Intro```\n I am Verniy\nAuthor:Danil#7708\n```Command List```\n **Core commands**\n`~stats`-retrieve the stats of a specific Shikigami\n`~skills` -retrives the skills of a specific Shikigami\n`~souls` -etrive the info about a specific souls\n`~bounties` -return the locations to farm for the Shikigami\n `~clues` -return the Shikigami in the clues and the location to farm\n\n **Music command**\n`~play or ~p` -to search for a song on youtube and play it\n`~pause`-to pause the music player\n`~resume` -to resume a paused music player\n`~volume or ~vol`-to adjust the volume of the music player\n `~pop`-to remove the most recently added song\n`~queue`-get the current queued song(s)\n `~leave` -have the bot stop playing and leave the voice channel ";
            msgObject.channel.send(helpMessage);
        });
    }
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFDO0lBaUJ2QyxDQUFDO0lBZkcsSUFBSTtRQUNBLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUMxQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQ2pGLElBQUssV0FBVyxHQUFRLG12QkFBbXZCLENBQUE7WUFDM3dCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtDQUlKO0FBbkJELHVCQW1CQyJ9