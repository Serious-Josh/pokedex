import * as readline from "node:readline";
import { State } from "./state.js";

export function cleanInput(input: string): string[]{
    return input.toLowerCase().trim().split(/\s+/);
}

export function startREPL(state: State): void{
    const rl = state.stateInterface;

    rl.prompt();
    rl.on("line", (input) => {
        const realInput = cleanInput(input);

        if(realInput.length === 0){
            rl.prompt();
        }

        const commands = state.commandRegistry;
        const command = commands[realInput[0]];

        if(command){
            command.callback(state);
        }
        else{
            console.log("Unknown command.");
        }

        rl.prompt();
    });
}
