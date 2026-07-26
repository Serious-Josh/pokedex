import { State } from "./state.js";

export async function commandCatch(state: State, pokemon: string): Promise<void>{

    const resp = await state.api.fetchPokemon(pokemon);
    console.log(`Throwing a Pokeball at ${pokemon}...`)

    const catchAttempt = Math.floor(Math.random() * 256)

    if(catchAttempt < resp.capture_rate){
        console.log(`${pokemon} was caught!`);
        state.pokedex[pokemon] = resp;
        console.log("You may now inspect it with the inspect command.")
    }
    else{
        console.log(`${pokemon} escaped!`)
    }

}