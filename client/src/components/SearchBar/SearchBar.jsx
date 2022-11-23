import { useState } from "react"
import { useDispatch } from "react-redux";
import { cleanFiltro, getPokemonByName } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import image from "../SearchBar/search.png"
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar(){

    const [form, setForm] = useState('');
    const dispatch = useDispatch();

    function handleFormValue(e){
        setForm(e.target.value);
    }

    async function searchByName(e){
        await dispatch(getPokemonByName(form));
        dispatch(cleanFiltro())
        setForm('');
    }

    return(
        <div className={style.searchbar}>
            <form  className={style.form} >
                <input className={style.input} type="text" value={form} onChange={(e) => handleFormValue(e)}  placeholder='Search by name' />
                <NavLink className={style.button} to='/home' onClick={(e) => searchByName(e)}>
                    <img className={style.image} src={image} alt="" />
                </NavLink>
            </form>
        </div>
    )
}