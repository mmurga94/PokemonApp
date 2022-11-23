import style from '../PokemonDetailCard/PokemonDetailCard.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deletePokemonById, getAllPokemons, cleanPokemonDetail, loading }from '../../redux/actions/index';
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

    function updatePokemon(){
        dispatch(loading())
    }

    return(
        <div className={style.container}>
            <div className={style.card}>
                <img src={image} alt="" />
                <section className={style.infoCard}>
                    <h1>{name && name.toUpperCase()}</h1>
                    {id && <h5>ID: {id.toUpperCase()}</h5>}
                    <p className={style.types} > {types && types.map((type, index) => <span className={style.type} key={index}>{type && type[0].toUpperCase() + type.slice(1)}</span>)}</p>
                    <section className={style.stats}>
                        <div>
                            <p className={style.statsDescription}>Height: {height}</p> <p>Weight: {weight}</p> 
                        </div>
                        <div>
                            <p className={style.statsDescription}>HP: {hp} </p> <progress max={200} value={hp} >Vida</progress>
                        </div>
                        <div>
                            <p className={style.statsDescription} >Attack: {attack}</p> <progress max={200} value={attack} >Ataque</progress>
                        </div>
                        <div>
                            <p className={style.statsDescription}>Defense: {defense}</p> <progress max={200} value={defense} >Defensa</progress>
                        </div>
                        <div>
                            <p className={style.statsDescription}>Speed: {speed}</p> <progress max={200} value={speed} >Velocidad</progress>
                        </div>
                    </section>
                </section>
            </div>
            <section className={style.buttons}>
                {created && <NavLink to={`/home/update/${id}`} onClick={updatePokemon}>Update</NavLink>}
                {created && <NavLink to='/home/delete' onClick={deletePokemon}>Delete</NavLink>}
            </section>
        </div>
    )
}
