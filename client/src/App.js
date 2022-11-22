import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import NavBar from './components/NavBar/NavBar';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import DeletePokemon from './components/DeletePokemon/DeletePokemon';

function App() {
  return (
    <div className="App">
      <Route exact path='/' render={() => <Landing/> } />
      <Route path='/home' render={() => <NavBar/> } />
      <Route path='/home/create' render={() => <CreatePokemon/>} />
      <Route exact path='/home' render={() => <Home/> } />
      <Route path='/home/pokemon/:id' render={() => <PokemonDetail />} />
      <Route path='/home/delete' render={() => <DeletePokemon />} />
    </div>
  );
}

export default App;
