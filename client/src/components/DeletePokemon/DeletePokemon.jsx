import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, cleanFiltro, cleanDeletePokemon } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import style from '../DeletePokemon/DeletePokemon.module.css';

export default function DeletePokemon(){

    const dispatch = useDispatch();
    const deletePokemon = useSelector(state => state.deletePokemon)

    useEffect(() => {
        return () => {
            dispatch(cleanDeletePokemon())
        }
    }, [])

    function handleCleanError(){
        dispatch(cleanError());
        dispatch(cleanFiltro());
    }

    return(
        <div className={style.container}>
            <h1>{deletePokemon.message.toUpperCase()}</h1>
            <img src={deletePokemon.image} alt="" />
            <NavLink to='/home' onClick={handleCleanError} >
                <button>Cargar todos los pokemons</button>
            </NavLink>
        </div>
    )
}