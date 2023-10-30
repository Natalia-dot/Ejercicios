export const allPokemonTypes = (pokemonList) => {
    const typeList = []
    pokemonList.forEach((pokemon) => {
        pokemon.type.forEach((type) => {
            !typeList.includes(type.type.name) && typeList.push(type.type.name)
        });
    })
    return typeList;
}