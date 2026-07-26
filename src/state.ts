import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { describe } from "vitest";
import { commandPokedex } from "./pokedex_command.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    stateInterface: Interface;
    commandRegistry: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string, Pokemon>
}

export function initState(): State{

    const newState: State = {
        stateInterface: createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    }),
        commandRegistry: getCommands(),
        api: new PokeAPI(5_000),
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {},
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
        },
        explore: {
            name: "explore",
            description: "Examine a specific area in more detail",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a specific Pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a specific Pokemon within your Pokedex",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "View all caught Pokemon registered in your Pokedex",
            callback: commandPokedex,
        }
    };
}