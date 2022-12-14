import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getAllTypes, setFiltro, cleanFiltro } from '../../redux/actions/index';
import style from '../Filter/Filter.module.css';

export default function Filter(){

    const types = useSelector(state => state.types);
    const filtro = useSelector(state => state.filtro);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTypes());
    }, [])

    async function cleanFilters(){
        await dispatch(getAllPokemons());
        dispatch(cleanFiltro());
    }

    function showTypesOptions(){
        const options = types.map(type => {
            return <option key={type.id} value={type.name} >{type.name.toUpperCase()}</option>
        })
        return(
            <select className={style.select} name='type' value={filtro.type} onChange={(e) => setFiltroOption(e)}>
                <option value="filtrar">Filter by type</option>
                {options}
            </select>
        )
    }

    function setFiltroOption(e){
        dispatch(setFiltro(e.target.name, e.target.value))
    }

    return(
        <div className={style.container}>
            <select className={style.select} name="origen" id="" value={filtro.origen} onChange={(e) => setFiltroOption(e)}>
                <option value="filtrar">Filter by origin</option>
                <option value="api">API</option>
                <option value="creado">Created</option>
                <option value="todos">All</option>
            </select>
            {types && showTypesOptions()}
            <select className={style.select} name="ordenado" id="" value={filtro.ordenado} onChange={(e) => setFiltroOption(e)}>
                <option value="null">Sort by</option>
                <option value="nommbreAscendente">A-Z</option>
                <option value="nombreDescendente">Z-A</option>
                <option value="ataqueAscendente">Attack: Low to High</option>
                <option value="ataqueDescendente">Attack: High to Low</option>
            </select>
            <button className={style.button} onClick={cleanFilters}>Clean Filters</button>
        </div>
    )
}