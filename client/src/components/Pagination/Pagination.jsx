import { useEffect, useState } from "react";
import PokemonsHomeCard from '../PokemonsHomeCard/PokemonsHomeCard';
import style from '../Pagination/Pagination.module.css';

export default function Pagination( {pokemons} ) {

    let [pokemonsPages, setPokemonsPages] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPokemonsPages(pokemonsPages = paginacion(pokemons)); 
        setPage(0);
    }, [pokemons])
    
    function paginacion(pokemons){
        let numPages = Math.ceil(pokemons.length / 12);
        let pokemonsPages = [];
        for(let i = 1; i <= numPages; i++){
            if(i === numPages){
                let resto = pokemons.length % 12;
                if(resto !== 0) pokemonsPages.push(pokemons.slice(-resto));
                else pokemonsPages.push(pokemons.slice((i-1)*12,12*i));
            }else{
                pokemonsPages.push(pokemons.slice((i-1)*12,12*i))
            }
        }
        return pokemonsPages;
    }

    function createPagination(pokemonsPages){
        let pages = [];
        for(let i = 0; i < pokemonsPages.length; i++){
            let page = <div className={style.pokemonSection}>
                {pokemonsPages[i].map(pokemon => <PokemonsHomeCard key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} types={pokemon.types} />)}
            </div>
            pages.push(page);
        }
        return pages;
    }

    function changePage(e){
        setPage(Number(e.target.value));
    }

    function previusPage(){
        setPage(page - 1);
    }

    function nextPage(){
        setPage(page + 1);
    }

    function showPagesNumber(pages, page){
        return <div className={style.sectionButtons}>
            {page !== 0 ? <button className={style.paginationButtons} onClick={previusPage} >◀</button> : null}
            {pages.map((p, index) => <button className={ index === page ? style.paginationButtonsActive : style.paginationButtons} key={index} value={index} onClick={(e) => changePage(e)}>{index+1}</button>)}
            {page !== pages.length-1 ? <button className={style.paginationButtons} onClick={nextPage}>▶</button> : null}
        </div>
    }

    function showPagination(pokemonsPages, page){
       let pages = createPagination(pokemonsPages);
       return <div>
        {showPagesNumber(pages, page)}
        {pages[page]}
       </div>
    }

    return <div className={style.container}>
        {pokemons && showPagination(pokemonsPages, page)}
    </div>
}
