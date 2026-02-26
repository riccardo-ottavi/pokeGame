const endPoint = "https://pokeapi.co/api/v2/pokemon/"
const totalPokemon = 1025;

export async function fetchPokeData(id) {
    const response = await fetch(`${endPoint}/${id}`)
    const data = await response.json()
    return data
}

export async function fetchMoveData(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
    const data = await response.json()
    return data
}

export async function customizePokemon(data) {
    const moveSet = await createMoveSet(data);

    return {
        ...data,
        exp: 0,
        expToNextLevel: 1000,
        level: 5,
        actualStats: {
            hp: Math.floor(((2 * data.stats[0].base_stat) * data.level) / 100) + data.level + 10,
            att: Math.floor(((2 * data.stats[1].base_stat) * data.level) / 100) + 5,
            def: Math.floor(((2 * data.stats[2].base_stat) * data.level) / 100) + 5,
            spAtt:Math.floor(((2 * data.stats[3].base_stat) * data.level) / 100) + 5,
            spDef: Math.floor(((2 * data.stats[4].base_stat) * data.level) / 100) + 5,
            speed: Math.floor(((2 * data.stats[5].base_stat) * data.level) / 100) + 5,
        },
        persistentStatus: null,
        volatileStatus: null,
        moveSet
    };
}

export async function createMoveSet(poke) {
    const possibleSet = [poke.moves[0].move.name, poke.moves[1].move.name, poke.moves[2].move.name, poke.moves[3].move.name]
    const newSet = await Promise.all(possibleSet.map(move => fetchMoveData(move)));
    return newSet
}