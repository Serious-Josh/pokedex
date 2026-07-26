import { State } from "./state.js";

export async function commandInspect(state: State, pokemon: string): Promise<void>{
    if(!Object.keys(state.pokedex).includes(pokemon)){
        console.log("you have not caught that pokemon");
    }
    else{
        const check = state.pokedex[pokemon];
        console.log(`Name: ${check.name}`)
        console.log(`Height: ${check.height}`);
        console.log(`Weight: ${check.weight}`);
        console.log("Stats:");
        console.log(`    -hp: ${check.stats.hp}`);
        console.log(`    -attack: ${check.stats.attack}`);
        console.log(`    -defense: ${check.stats.defense}`);
        console.log(`    -special-attack: ${check.stats.spAtk}`);
        console.log(`    -special-defense: ${check.stats.spDef}`);
        console.log(`    -speed: ${check.stats.speed}`);
        console.log("Types:");
        for(const type of check.types){
            console.log(`   - ${type}`);
        }
    }
}