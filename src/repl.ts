import * as readline from "node:readline";
import { State } from "./state.js";

export function cleanInput(input: string): string[]{
    return input.toLowerCase().trim().split(/\s+/);
}

export async function startREPL(state: State): Promise<void>{
    const rl = state.stateInterface;

    rl.prompt();
    rl.on("line", async (input) => {
        const realInput = cleanInput(input);

        if(realInput[0] == ""){
            rl.prompt();
            return;
        }

        const commands = state.commandRegistry;
        const command = commands[realInput[0]];

        if(command){
            try{
                await command.callback(state);
            }
            catch(error: unknown){
                console.error(`Error: ${error}`);
            }
        }
        else{
            console.log("Unknown command.");
        }

        rl.prompt();
    });
}
