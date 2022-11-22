import { NavLink } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import style from "../NavBar/NavBar.module.css"

export default function NavBar(){
    return(
        <div className={style.nav}>
            <NavLink to='/home' className={style.menus} >
                <img  className={style.homeImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
            </NavLink>
            <SearchBar />
            <NavLink className={style.menus} to='/home/create'>Crear Pokemon</NavLink>
        </div>
    )
}