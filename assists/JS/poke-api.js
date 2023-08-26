

const pokeApi = {}

function convertePokeApiDetalsToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const ability = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
 
    pokemon.abilities = ability

    pokemon.base_experience = pokeDetail.base_experience

    const stat = pokeDetail.stats.map((statsSlot) => {
        return {
            name: statsSlot.stat.name,
            base_stat: statsSlot.base_stat
        };
    });

    pokemon.stats = stat
    

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const[type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertePokeApiDetalsToPokemon)
}
    

pokeApi.getPokemons = (offset, limit) => {

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetals) => pokemonDetals)
       
    

}
pokeApi.getPokemonById = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertePokeApiDetalsToPokemon);
}

