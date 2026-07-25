import { stringify } from "node:querystring";

export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T){
        const value: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }

        if(!this.#cache.get(key)){
            this.#cache.set(key, value);
        }

    }

    get<T>(key: string): T | undefined{
        const value = this.#cache.get(key);

        if(value){
            return value.val;
        }

        return undefined;
    }

    #reap(){
        const cutoff = Date.now() - this.#interval;

        for(const [key, value] of this.#cache){
            if(value.createdAt <= cutoff){
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}