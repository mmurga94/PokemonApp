import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import style from './../Home/Home.module.css';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';


export default function Home(){

    let [pokemonsFilter, setPokemonsFilter] = useState([]);
    const [filterResult, setFilterResult] = useState(true);
    const pokemons = useSelector( state => state.pokemons );
    const filtro = useSelector(state => state.filtro);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if(pokemons.length === 0){
            dispatch(getAllPokemons())
        }
    }, [])
    
    useEffect(() => {
        setPokemonsFilter([...pokemons]);
        filtrado(filtro);
    }, [pokemons, filtro])

    function filtrado(filtro){
        if(filtro.origen === 'todos' || filtro.origen === 'filtrar') setPokemonsFilter(pokemonsFilter = [...pokemons]);
        else if(filtro.origen === 'api') setPokemonsFilter(pokemonsFilter = pokemons.filter(pokemon => pokemon.id.length < 5));
        else setPokemonsFilter(pokemonsFilter = pokemons.filter(pokemon => pokemon.id.length > 5));

        if(filtro.type === 'todos' || filtro.type === 'filtrar') setPokemonsFilter(pokemonsFilter)
        else setPokemonsFilter(pokemonsFilter = pokemonsFilter.filter(pokemon => pokemon.types.includes(filtro.type)))

        if(filtro.ordenado === 'null') setPokemonsFilter(pokemonsFilter);
        else if(filtro.ordenado === 'nommbreAscendente') setPokemonsFilter(pokemonsFilter = pokemonsFilter.sort((a,b) => {
            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
        }));
        else if(filtro.ordenado === 'nombreDescendente')setPokemonsFilter(pokemonsFilter = pokemonsFilter.sort((a,b) => {
            return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
        }));
        else if(filtro.ordenado === 'ataqueAscendente') setPokemonsFilter(pokemonsFilter = pokemonsFilter.sort((a,b) => {
            return a.attack - b.attack;
        }));
        else setPokemonsFilter(pokemonsFilter = pokemonsFilter.sort((a,b) => {
            return b.attack - a.attack;
        }));

        if(pokemonsFilter.length === 0) setFilterResult(false);
        else setFilterResult(true);
    }

    return(
        <div className={style.container}>
            <Filter />

            {loading ? <Loading /> : 
            (error.state || !filterResult ? <Error message={error.message}/> : <Pagination pokemons={pokemonsFilter} />) }

        </div>
    )
}