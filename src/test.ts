import { PokeAPI } from "./pokeapi.js";

const api = new PokeAPI();
const locations = await api.fetchLocations();

console.log("Fetch Locations");
for (const item of locations.results){
    console.log(item.name);
}

const locations2 = await api.fetchLocations(locations.next);
console.log(locations2);