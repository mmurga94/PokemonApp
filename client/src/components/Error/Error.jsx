import style from '../Error/Error.module.css';
import { useDispatch } from 'react-redux';
import { cleanError, cleanFiltro } from '../../redux/actions';
import { NavLink } from 'react-router-dom';

export default function Error({message}){

    const dispatch = useDispatch();

    function messageDefault(message){
        if(message !== '') return <h1>{message}</h1>;
        else return <h1>No se encontró ningún Pokemon</h1>
    }

    function handleCleanError(){
        dispatch(cleanError());
        dispatch(cleanFiltro());
    }

    return(
        <div className={style.container}>
            {messageDefault(message)}
            <img src="https://i.pinimg.com/originals/30/4c/8c/304c8cdcee468bff27edcee97792c595.gif" alt="" />
            <NavLink to='/home' onClick={handleCleanError} >
                <button>Cargar todos los pokemons</button>
            </NavLink>
        </div>
    )
}