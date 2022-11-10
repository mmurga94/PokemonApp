const { Router } = require('express');
const { Pokemon } = require('./../db');
const pokemonRouter = Router();
const { getPokemonsRutaPrincipal, getPokemonsByID, getPokemonsByName, detelePokemon, updatePokemon } = require('./controllers/controllers')


pokemonRouter.get('/', async(req, res) => {
    try {
        let pokemons;
        const { name } = req.query;
        if(name) pokemons = await getPokemonsByName(name);
        else pokemons = await getPokemonsRutaPrincipal();
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

pokemonRouter.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await getPokemonsByID(id);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

pokemonRouter.post('/', async(req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, types, image } = req.body;
        if( !name || !hp || !attack || !defense || !speed || !height || !weight || !types || !image) throw new Error("Faltan argumentos para crear el Pokemon");
        const newPokemon = await Pokemon.create({ name, hp, attack, defense, speed, height, weight, image });
        newPokemon.addTypes(types)
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

pokemonRouter.delete('/', async(req, res) => {
    try {
        const { id } = req.body;
        if(!id) throw new Error("No se recibidio ningun id")
        const deletePokemon = await detelePokemon(id)
        res.status(200).json(deletePokemon);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

pokemonRouter.put('/', async(req, res) => {
    try {
        const { id, attribute, value } = req.body;
        if(!id || !attribute || !value) throw new Error("Faltan atributos")
        const pokemonUpdated = await updatePokemon(id, attribute, value);
        res.status(200).json(pokemonUpdated);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = pokemonRouter;