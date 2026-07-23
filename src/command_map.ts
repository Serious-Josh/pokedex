import { State } from "./state.js";

export async function commandMap(state: State): Promise<void>{
    const locations = await state.api.fetchLocations(state.nextLocationsURL);

    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for (const item of locations.results){
        console.log(item.name);
    }
}

export async function commandMapBack(state: State): Promise<void>{

    if(state.prevLocationsURL == ""){
        console.log("You're on the first page.");
        return
    }

    const locations = await state.api.fetchLocations(state.prevLocationsURL);

    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for (const item of locations.results){
        console.log(item.name);
    }
}