import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number){
        this.cache = new Cache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations>{
        let locationURL = "";

        if(!pageURL){
            locationURL = PokeAPI.baseURL + "/location-area/";
        }
        else{
            locationURL = pageURL;
        }

        const cached = this.cache.get<ShallowLocations>(locationURL);

        if(cached != undefined){
            return cached;
        }
            
        const resp = await fetch(locationURL, {
            method: "GET"
        });

        const data = await resp.json();

        this.cache.add(locationURL, data);

        return data;
    }

    // not fully implemented
    async fetchLocation(locationName: string): Promise<Location>{
        const locationURL = PokeAPI.baseURL + `/location-area/${locationName}`;

        const cached = this.cache.get<Location>(locationURL);

        if(cached != undefined){
            return cached;
        }

        const resp = await fetch(locationURL, {
            method: "GET"
        });
        const data = await resp.json();

        this.cache.add(locationURL, data);

        return data;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon>{
        const pokemonURL = PokeAPI.baseURL + `/pokemon/${pokemonName}`;
        const speciesURL = PokeAPI.baseURL + `/pokemon-species/${pokemonName}`;

        const resp = await fetch(pokemonURL, {
            method: "GET"
        });
        const data = await resp.json();

        const respSpec = await fetch(speciesURL, {
            method: "GET"
        });
        const dataSpec = await respSpec.json();

        const types = [];
        for(const entry of data.types){
            types.push(entry.type.name)
        }

        return {
            name: data.name,
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                spAtk: data.stats[3].base_stat,
                spDef: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            },
            types: types,
            capture_rate: dataSpec.capture_rate,
        }
    }
}

export type ShallowLocations = {
    next: string,
    previous: string,
    results: {
        "name": string;
        "url": string;
    }[];
};

export type Location = {
    name: string,
    pokemon_encounters: [{pokemon: {
        name: string,
    }, version_details: []}],
};

export type Pokemon = {
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    stats: {
        hp: number,
        attack: number,
        defense: number,
        spAtk: number,
        spDef: number,
        speed: number
    }
    types: string[],
    capture_rate: number,
}