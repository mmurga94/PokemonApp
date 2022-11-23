import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_BY_NAME, GET_ALL_TYPES, CREATE_POKEMON, SET_FILTRO, CLEAN_FILTRO, LOADING, ERROR, CLEAN_ERROR, CLEAN_CREATE_POKEMON, DELETE_POKEMON, CLEAN_DELETE_POKEMON, CLEAN_POKEMON_DETAIL, UPDATE_POKEMON, CLEAN_UPDATE_POKEMON } from "../actions";

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    newPokemon: {message: '', created: false},
    updatedPokemon: {message: '', updated: false},
    types: [],
    filtro: {origen: 'filtrar', type: 'todos', ordenado: 'null'},
    loading: false,
    error: {state: false, message: ''},
    deletePokemon: {message: '', image: ''}
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return{
                ...state,
                pokemons: action.payload.data,
                loading: action.payload.loading,
                error: action.payload.error
            }
        case GET_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload.data,
                loading: action.payload.loading
            }
        case CLEAN_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: action.payload.data
            }
        case GET_POKEMON_BY_NAME:
            return{
                ...state,
                pokemons: [action.payload.data],
                loading: action.payload.loading,
                error: action.payload.error
            }
        case GET_ALL_TYPES:
            return{
                ...state,
                types: action.payload.data
            }
        case CREATE_POKEMON:
            return{
                ...state,
                newPokemon: action.payload.data
            }
        case CLEAN_CREATE_POKEMON:
            return{
                ...state,
                newPokemon: action.payload  
            }
        case UPDATE_POKEMON:
            return{
                ...state,
                updatedPokemon: action.payload
            }
        case CLEAN_UPDATE_POKEMON:
            return{
                ...state,
                updatedPokemon: action.payload.data
            }
        case DELETE_POKEMON:
            return{
                ...state,
                deletePokemon: action.payload.data
            }
        case CLEAN_DELETE_POKEMON:
            return{
                ...state,
                deletePokemon: action.payload.data
            }
        case SET_FILTRO:
            return{
                ...state,
                filtro: {...state.filtro, [action.payload.attribute]: action.payload.value}
            }
        case CLEAN_FILTRO:
            return{
                ...state,
                filtro: action.payload
            }
        case LOADING:
            return{
                ...state,
                loading: action.payload.loading
            }
        case ERROR:
            return{
                ...state,
                loading: action.payload.loading,
                error: action.payload.data
            }
        case CLEAN_ERROR:
            return{
                ...state,
                error: action.payload
            }
        default:
            return{...state}
    }
}

export default rootReducer