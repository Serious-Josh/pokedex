import * as readline from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Lists info on possible commands",
            callback: commandHelp,
        }
        // more commands
    };
}

export function cleanInput(input: string): string[]{
    return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL(): void{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    rl.on("line", (input) => {
        const realInput = cleanInput(input);

        if(realInput.length === 0){
            rl.prompt();
        }

        const commands = getCommands();
        const command = commands[realInput[0]];

        if(command){
            command.callback(commands);
        }
        else{
            console.log("Unknown command.");
        }

        rl.prompt();
    });
}
