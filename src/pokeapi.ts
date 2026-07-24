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

        const resp = await fetch(locationURL, {
            method: "GET"
        });
        const data = await resp.json();
        return data;
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

export type Location = {};