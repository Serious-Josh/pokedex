import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void>{

    console.log("Your Pokedex:")
    
    for(const pokemon of Object.keys(state.pokedex)){
        console.log(`   - ${pokemon}`);
    }
}