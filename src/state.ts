import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap, commandMapBack } from "./command_map.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    stateInterface: Interface;
    commandRegistry: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
}

export function initState(): State{

    const newState: State = {
        stateInterface: createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    }),
        commandRegistry: getCommands(),
        api: new PokeAPI(),
        nextLocationsURL: "",
        prevLocationsURL: "",
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
        },
        map: {
            name: "map",
            description: "Displays location area names",
            callback: commandMap,
        },
        mapb: {
            name: "map back",
            description: "Displays previous pages' location area names",
            callback: commandMapBack,
        }
    };
}