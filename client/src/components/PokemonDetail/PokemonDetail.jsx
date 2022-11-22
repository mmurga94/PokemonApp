import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../../redux/actions/index';
import { useParams } from 'react-router-dom';
import PokemonDetailCard from '../PokemonDetailCard/PokemonDetailCard';
import Loading from '../Loading/Loading';
import style from '../PokemonDetail/PokemonDetail.module.css';
import Error from '../Error/Error';

export default function PokemonDetail(){

    const { id } = useParams();
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);

    useEffect(() => {
        dispatch(getPokemonDetail(id))
    }, [])

    return(
        <div className={style.container}>
            {loading ? <Loading /> :
            error.state ? <Error message={error.message} /> :
            pokemonDetail.name && 
            <PokemonDetailCard image={pokemonDetail.image} name={pokemonDetail.name} 
            types={pokemonDetail.types} id={pokemonDetail.id} hp={pokemonDetail.hp} attack={pokemonDetail.attack}
            defense={pokemonDetail.defense} speed={pokemonDetail.speed} height={pokemonDetail.height} 
            weight={pokemonDetail.weight} created={pokemonDetail.created} />
           }
        </div>
    )
}