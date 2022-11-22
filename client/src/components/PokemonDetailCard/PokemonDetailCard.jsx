import style from '../PokemonDetailCard/PokemonDetailCard.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletePokemonById, getAllPokemons, cleanPokemonDetail }from '../../redux/actions/index';
import { NavLink } from 'react-router-dom';

export default function PokemonDetailCard({image, name, types, id, hp, attack, defense, speed, height, weight, created}){

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(cleanPokemonDetail())
        }
    }, [])

    async function deletePokemon(){
        await dispatch(deletePokemonById(id));
        dispatch(getAllPokemons());
    }

    return(
        <div className={style.container}>
            <div className={style.card}>
                <img src={image} alt="" />
                <section className={style.infoCard}>
                    <h1>{name && name.toUpperCase()}</h1>
                    {id && <h5>ID: {id.toUpperCase()}</h5>}
                    <p className={style.types} > {types && types.map((type, index) => <span className={style.type} key={index}>{type && type[0].toUpperCase() + type.slice(1)}</span>)}</p>
                    <section>
                        <p>Altura: {height}</p>
                        <p>Peso: {weight}</p>
                        <p>Vida: {hp}</p>
                        <p>Ataque: {attack}</p>
                        <p>Defensa: {defense}</p>
                        <p>Velocidad: {speed}</p>
                    </section>
                </section>
            </div>
            {created && <NavLink to='/home/delete' onClick={deletePokemon}>Eliminar</NavLink>}
        </div>
    )
}
