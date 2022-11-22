import style from './../Landing/Landing.module.css';
import { NavLink } from 'react-router-dom';

export default function Landing(){

    return(
        <>
            <div className={style.background} >
                <img  className={style.titleImg} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
                <NavLink to='/home' className={style.buttonIngresar}>Ingresar</NavLink>
            </div>
        </>
    )
}