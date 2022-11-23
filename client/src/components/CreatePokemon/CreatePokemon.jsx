import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getAllTypes, cleanCreatePokemon, getAllPokemons } from '../../redux/actions/index';
import style from '../CreatePokemon/CreatePokemon.module.css';
import PokemonDetailCard from '../PokemonDetailCard/PokemonDetailCard';

export default function CreatePokemon(){

    let [pokemon, setPokemon] = useState({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', types: [], image: ''})
    let [error, setError] = useState({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', types: 'Select the types', image: ''});
    let [screen, setScreen] = useState({first: true, second: false})
    let [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const pokemons = useSelector(state => state.pokemons);
    const newPokemon = useSelector(state => state.newPokemon);

    useEffect(() => {
        dispatch(getAllTypes());
        if(pokemons.length === 0){
            dispatch(getAllPokemons());
        }
        return () => {
        dispatch(cleanCreatePokemon());
        }
    }, [])

    function displayTypes(){
        return types.map(type => {
            return <input className={ pokemon.types.includes(String(type.id)) ? style.typeOptions2 : style.typeOptions } 
            key={type.id} name={type.id} type='button' value={type.name.toUpperCase()} onClick={(e) => setType(e)} />
        })
    }

    function showScreen(e){
        console.log('se presiono')
        setScreen(screen = {first: false, second: false});
        setScreen({...screen, [e.target.value]: true})
    }

    function handleDisabled(){
        setDisabled(false)
        for(let inputs in error){ 
            if(inputs !== 'types' && error[inputs] !== '') setDisabled(disabled = true);
        }
    }

    function setNewPokemon(e){
        
        setPokemon(pokemon = {
            ...pokemon,
            [e.target.name]: e.target.value
        })

        for(let attribute in pokemon){
            if(pokemon[attribute] === '') setError(error = {...error, [attribute]: `The ${attribute} field cannot be empty`});
            else if(attribute !== 'types' ) setError(error = {...error, [attribute]: ''})
        }

        const includesName = pokemons.find(pokemon => pokemon.name.toUpperCase() === e.target.value.toUpperCase());
        if(includesName) setError(error = {...error, name: `There is already a pokemon with the name ${pokemon.name}`});

        if(e.target.type === 'number'){
            if(e.target.value > 200 || e.target.value < 1) setError(error = {...error, [e.target.name]: 'The value must be between 0 and 201'});
            else setError(error = {...error, [e.target.name]: ''})
        }

        handleDisabled();
    }

    function setType(e){
        const includes = pokemon.types.includes(e.target.name)
        if(includes){
            setPokemon(pokemon = {
                ...pokemon,
                types: pokemon.types.filter(type => type !== e.target.name)
            })
        }else{
            setPokemon(pokemon = {
                ...pokemon,
                types: [...pokemon.types, e.target.name]
            })
        }
        if(pokemon.types.length <= 0) setError(error = {...error, types: 'You have to select at least 1 type'});
        else if(pokemon.types.length >= 3) setError(error = {...error, types: 'You can select max 2 types'});
        else setError(error = {...error, types: 'Select the types'})
    }

    async function createNewPokemon(e){
        e.preventDefault();
        await dispatch(createPokemon(pokemon));
        dispatch(getAllPokemons());
        setPokemon({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', types: [], image: ''});
        setScreen({first: true, second: false})
    }


    return(
        <div className={style.container}>
            <form  className={style.form} action="" onSubmit={(e) => createNewPokemon(e) }>
                <h1>Create Pokemon</h1>

                {screen.first && (
                <div className={style.screen}>
                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.name ? style.labelError : style.label} htmlFor="">Name </label>
                            <input className={error.name ? style.inputError : style.input} type="text" name="name" value={pokemon.name} onChange={(e) => setNewPokemon(e)} placeholder='Enter the name of the pokemon' />
                        </section>
                        { error.name && <p>{error.name}</p> }
                    </section>

                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.image ? style.labelError : style.label} htmlFor="">Image</label>
                            <input className={error.image ? style.inputError : style.input} type="text" name="image" value={pokemon.image} onChange={(e) => setNewPokemon(e)}  placeholder='Enter the pokemon image in URL' />
                        </section>
                        {error.image && <p>{error.image}</p>}
                    </section>

                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.height ? style.labelError : style.label} htmlFor="">Height</label>
                            <input className={error.height ? style.inputError : style.input} type="number" name="height" value={pokemon.height} onChange={(e) => setNewPokemon(e)} />
                        </section>
                        {error.height && <p>{error.height}</p>}
                    </section>
                    
                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.weight ? style.labelError : style.label} htmlFor="">Weight</label>
                            <input className={error.weight ? style.inputError : style.input} type="number" name="weight" value={pokemon.weight} onChange={(e) => setNewPokemon(e)} />
                        </section>
                        {error.weight && <p>{error.weight}</p>}
                    </section>

                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.hp ? style.labelError : style.label} htmlFor="">HP</label>
                            <input className={error.hp ? style.inputError : style.input} type="number" name="hp" value={pokemon.hp} onChange={(e) => setNewPokemon(e)} />
                        </section>
                        {error.hp && <p>{error.hp}</p>}
                    </section>


                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.attack ? style.labelError : style.label} htmlFor="">Attack</label>
                            <input className={error.attack ? style.inputError : style.input}  type="number" name="attack" value={pokemon.attack} onChange={(e) => setNewPokemon(e)} />
                        </section>
                        {error.attack && <p>{error.attack}</p>}
                    </section>

                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.defense ? style.labelError : style.label} htmlFor="">Defense</label>
                            <input className={error.defense ? style.inputError : style.input} type="number" name="defense" value={pokemon.defense} onChange={(e) => setNewPokemon(e)} />
                        </section>
                        {error.defense && <p>{error.defense}</p>}
                    </section>

                    <section className={style.inputContainer}>
                        <section className={style.inputContainerData}>
                            <label className={error.speed ? style.labelError : style.label} htmlFor="">Speed</label>
                            <input className={error.speed ? style.inputError : style.input} type="number" name="speed" value={pokemon.speed} onChange={(e) => setNewPokemon(e)} />
                        </section>
                        {error.speed && <p>{error.speed}</p>}
                    </section>

                    <button onClick={(e) => showScreen(e)} value='second' disabled={ disabled ? true: false} >Next</button>
                </div>
                )}

                {screen.second && (
                <div className={style.screen}>
                    <label className={error.types !== 'Select the types' ? style.labelErrorTypes : style.labelTypes} htmlFor=""> {error.types} </label>
                    <div className={style.types}>{displayTypes()}</div>
                    <div className={style.buttonContainer}>
                        <button onClick={(e) => showScreen(e)} value='first' >Previous</button>
                        <button type="submit" disabled={ pokemon.types.length >= 3 || pokemon.types.length <= 0 }>Create Pokemon</button>
                    </div>
                </div>
                )}
            </form>
            <section className={style.preview}>
                {newPokemon.created &&
                    <h1 className={style.createdMessage}>✅ {newPokemon.message.toUpperCase()}</h1>
                }
                <h1>PREVIEW</h1>
                <PokemonDetailCard name={pokemon.name} image={pokemon.image} hp={pokemon.hp} attack={pokemon.attack} 
                    defense={pokemon.defense} speed={pokemon.speed} height={pokemon.height} weight={pokemon.weight}
                    types={types.filter( type =>  pokemon.types.includes(String(type.id)) ).map(type => type.name)} />
            </section>
        </div>
    )
}