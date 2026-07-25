import { State } from "./state.js";

export async function commandExplore(state: State, location: string): Promise<void>{

    const resp = await state.api.fetchLocation(location);

    console.log(`Exploring ${location}...`);
    console.log("Found Pokemon:");
    for(const item of resp.pokemon_encounters){
        console.log(`- ${item.pokemon.name}`);
    }

}