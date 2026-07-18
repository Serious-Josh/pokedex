import { CLICommand, State } from "./state.js";

export function commandHelp(state: State){
    console.log("Welcome to the Pokedex!\n"+
        "Usage:\n");

    for(const command of Object.values(state.commandRegistry)){
        console.log(`${command.name}: ${command.description}`);
    }
};