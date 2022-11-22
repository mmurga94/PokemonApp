import {NavLink} from 'react-router-dom';
import style from '../PokemonsHomeCard/PokemonsHomeCard.module.css';

export default function PokemonsHomeCard({name, image, types, id}){


    return(
        <div className={style.card}>
            <NavLink to={`/home/pokemon/${id}`} >
            <img src={image} alt="" />
            <section className={style.infoSection}>
                <h2>{name.toUpperCase()}</h2>
                <section className={style.typeSection}>
                    {types && types.map((type, index) => <span key={index}>{type[0].toUpperCase() + type.slice(1)}</span>)}
                </section>
            </section>
            </NavLink>
        </div>
    )
} 