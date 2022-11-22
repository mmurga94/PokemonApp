const axios = require("axios");
const { Pokemon, Type } = require("../../db");

const getPokemonsFromApi = async (numOfPokemons) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemons}`
        const { data } = await axios.get(url);
        const urls = data.results.map( pokemon => pokemon.url);
        const grossData = await Promise.all( urls.map( async u => {
            const { data } = await axios.get(u);
            return data;
        }))
        const pokemons = grossData.map( pokemon => {
            obj = {
                id: String(pokemon.id),
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map( type => type.type.name),
                image: pokemon.sprites.other.home.front_default,
                created: false
            }
            return obj;
        } )
        return pokemons;
    } catch (error) {
        console.log('Error api ' + error.message)
    }
}

const getPokemonsFromDb = async () => {
    try {
        const grossPokemons = await Pokemon.findAll({
            include: [{
                model: Type,
                through: {
                    attributes: []
                  }
            }]
        });
        const pokemons = grossPokemons.map( pokemon => {
            return{
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                image: pokemon.image,
                types: pokemon.types.map( t => t.name ),
                created: true
            }
        } )
        return pokemons;
    } catch (error) {
        console.log('error db' + error.message)
    }
}

const getAllPokemons = async () => {
    const pokemonsApi = await getPokemonsFromApi(40);
    const pokemonsDb = await getPokemonsFromDb();
    const pokemons = [...pokemonsApi, ...pokemonsDb];
    return pokemons;
}

const getPokemonsRutaPrincipal = async () => {
    const pokemons = await getAllPokemons();
    const pokemonsRutaPrincipal = pokemons.map( pokemon => {
        return{
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            types: pokemon.types,
            attack: pokemon.attack
            //types: pokemon.types.map( t => t.name)
        }
    })
    return pokemonsRutaPrincipal;
}

const getPokemonsByID = async (id) => {
    const pokemons = await getAllPokemons();
    let pokemonById = pokemons.find( pokemon => pokemon.id === String(id) );
    if(!pokemonById) throw new Error(`No se encontro ningún pokemon con el id ${id}`);
    return pokemonById;
} 

const getPokemonsByName = async (name) => {
    const pokemons = await getAllPokemons();
    let pokemonByName = pokemons.find( pokemon => pokemon.name.toUpperCase() === name.toUpperCase() );
    if(!pokemonByName) throw new Error(`No existe ningún Pokemon con el nombre ${name}`);
    return pokemonByName;
}

const detelePokemon = async (id) => {
    const pokemon = await Pokemon.findByPk(id);
    if(!pokemon) throw new Error(`No se encontro ningun pokemon con el id ${id}`)
    await pokemon.destroy();
    return {message: `${pokemon.name} fue eliminado`, image: pokemon.image};
}

const updatePokemon = async (id, attribute, value) => {
    let pokemon;
    if(attribute === "types"){
        pokemon = await Pokemon.findByPk(id);
        if(!pokemon) throw new Error("No se encontro ningun pokemon con ese id")
        await pokemon.setTypes(value)
    }else{
        pokemon = await Pokemon.update(
            {
                [attribute]: value
            },
            {
                where: { id: id }
            }
        )
        if(pokemon[0] === 0) throw new Error("No se encontro ningun pokemon con ese id")
    }
    return pokemon
}

const getTypesApi = async () => {
    const url = "https://pokeapi.co/api/v2/type";
    const { data } = await axios.get(url);
    const types = data.results.map( type => { 
        return {
            name: type.name
        }
     } );
    return types;
}

const getTypes = async () => {
    const countTypes = await Type.count();
    let types;
    if(countTypes > 0){
        types = await Type.findAll();
    }else{
        const apiTypes = await getTypesApi();
        types = await Type.bulkCreate(apiTypes);
    }
    return types;
}

module.exports = {
    getPokemonsRutaPrincipal,
    getPokemonsByID,
    getPokemonsByName,
    detelePokemon,
    updatePokemon,
    getTypes
}