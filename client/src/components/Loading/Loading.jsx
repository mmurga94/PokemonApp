import style from '../Loading/Loading.module.css'

export default function Loading(){
    return(
        <div className={style.loading}>
            <h1>Cargando...</h1>
            <img src="https://androidayuda.com/wp-content/uploads/2016/07/pikachu.gif" alt="" /> 
        </div>
    )
}