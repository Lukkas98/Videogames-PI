import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGames, getAllGames, getAllGenres, orderGames, searchByName } from './redux/actions.js';
import Landing from './components/Landing/Landing.jsx';

import imageLanding from "./assets/images/FondoLanding.jpg"
import Error404 from './components/Error404/Error404.jsx';

function App() {
  let body = document.querySelector("body");
  body.style.backgroundImage = `url(${imageLanding})`

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const allGames = useSelector(state => state.allVideogames);
  const gamesFilterName = useSelector(state => state.gamesSearch);
  const gamesFiltered = useSelector(state => state.gamesFiltered);
  
  const [videogames, setVideogames] = useState(null);
  const [error, setError] = useState(false);

  useEffect( ()=>{
    dispatch(getAllGames());
    dispatch(getAllGenres());
  }, [dispatch]);

  useEffect(() => {
    if (allGames.length > 0) {
      setVideogames(allGames);
    }
  }, [allGames]);
  
  useEffect( ()=>{
    if (videogames !== null && gamesFilterName.length) {
      setVideogames(gamesFilterName)
    }else if(videogames !== null && !gamesFilterName.length){
      setError(true)
    }
  }, [gamesFilterName, videogames]);

  useEffect(()=>{ 
    if (videogames !== null && gamesFiltered.length) {
      setVideogames(gamesFiltered)  
    }else if(videogames !== null && !gamesFiltered.length){
      setError(true)
    }
  }, [gamesFiltered, videogames])

  useEffect(()=>{
    if (videogames !== null) {
      if (videogames[0] && videogames[0].error) setError(true)
      else setError(false)
    }
    else setError(false)
  }, [videogames])

  const searchGame = (name)=>{
    dispatch(searchByName(name))
  }

  const filter = (value)=>{
      dispatch(filterGames(value))
  }
  const order = (value)=>{
    dispatch(orderGames(value))
  }
  
  return (
    <> 
      {
        pathname === "/home" && <Nav searchGame={searchGame}></Nav>
      }
      
      <Routes>
        <Route path="*" element={<Error404/>} />
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<HomePage videogames={videogames} filter={filter} order={order} error={error}/>}/>
        <Route path='/create' element={<Form />}/>
        <Route path='/detail/:id' element={<Detail />}/>
      </Routes>
    </>
  );
}

export default App;
