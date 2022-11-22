import axios from 'axios';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const CLEAN_POKEMON_DETAIL = 'CLEAN_POKEMON_DETAIL';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const SET_FILTRO = 'SET_FILTRO';
export const CLEAN_FILTRO = 'CLEAN_FILTRO';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const CLEAN_CREATE_POKEMON = 'CLEAN_CREATE_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const CLEAN_DELETE_POKEMON = 'CLEAN_DELETE_POKEMON'


export const getAllPokemons = () => {
    return async function(dispatch){
        try {
            dispatch(loading());
            const { data } = await axios.get('http://localhost:3001/pokemon')
            dispatch( { type: GET_ALL_POKEMONS, payload: {data, loading: false, error: {state: false, message: ''}} })
        } catch (error) {
            dispatch(setError(error.message))
        }
    }
}

export const getPokemonDetail = id => {
    return async function(dispatch){
        try {
            dispatch(loading());
            const { data } = await axios.get(`http://localhost:3001/pokemon/${id}`)
            dispatch({ type: GET_POKEMON_DETAIL, payload: {data, loading: false}})
        } catch (error) {
            dispatch(setError(error.response.data))
        }
    }
}

export const cleanPokemonDetail = () =>{
    return { type: CLEAN_POKEMON_DETAIL, payload: {data: {} }}
}

export const getPokemonByName = name => {
    return async function(dispatch){
        try {
            dispatch(loading());
            const { data } = await axios.get(`http://localhost:3001/pokemon?name=${name}`)
            dispatch({ type: GET_POKEMON_BY_NAME, payload: {data, loading: false, error: {state: false, message: ''}}})
        } catch (error) {
            dispatch(setError(error.response.data))
        }
    }
}

export const getAllTypes = () => {
    return async function(dispatch){
        const { data } = await axios.get('http://localhost:3001/types')
        dispatch({ type: GET_ALL_TYPES, payload: {data}})
    }
}

export const createPokemon = (newPokemon) => {
    return async function(dispatch){
        try {
            const { data } = await axios.post('http://localhost:3001/pokemon/', newPokemon)
            dispatch({ type: CREATE_POKEMON, payload: {data}})
        } catch (error) {
            console.log(error)
        }
    }
}

export const deletePokemonById = id => {
    return async function(dispatch){
        try {
            const { data } = await axios.delete('http://localhost:3001/pokemon', {data: {id}})
            dispatch({ type: DELETE_POKEMON, payload: {data} })
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanDeletePokemon = () => {
    return { type: CLEAN_DELETE_POKEMON, payload: {data: {message: '', image: ''} }}
}

export const cleanCreatePokemon = () => {
    return { type: CLEAN_CREATE_POKEMON, payload: {message: '', created: false}}
}

export const setFiltro = (attribute, value) => {
    return { type: SET_FILTRO, payload: {attribute, value}}
}

export const cleanFiltro = () => {
    return { type: CLEAN_FILTRO, payload: {
        origen: 'filtrar',
        type: 'filtrar',
        ordenado: 'null'
    }}
}

export const loading = () => {
    return { type: LOADING, payload: {loading: true} }
}

export const setError = (error) => {
    return { 
        type: ERROR, 
        payload: {
            data: {state: true, message: error }, 
            loading: false
        }
    }
}

export const cleanError = () => {
    return{
        type: CLEAN_ERROR,
        payload: {state: false, message: ''}
    }
}