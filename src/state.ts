import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    stateInterface: Interface;
    commandRegistry: Record<string, CLICommand>;
}

export function initState(): State{

    const newState: State = {
        stateInterface: createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    }),
        commandRegistry: getCommands()
    }

    return newState;

}

function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
        // more commands
    };
}