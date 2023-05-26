import { useState } from "react"
import { NavLink } from "react-router-dom"
import "./SearchBar.modules.css"

export default function SearchBar({ searchGame }){

    const [videogame, setVideogame] = useState("")

    const onChange = (e)=>{
        setVideogame(e.target.value);
    }

    return(
        <div className="containerNav">
            
            <div>
                <NavLink className="links" to="/">Exit</NavLink>
                <NavLink className="links" to="/create" >create game</NavLink>
            </div>
            <div className="searchBar">
                <input className="inputSearch" type="text" onChange={onChange} placeholder="search a game" />
                <button className="btnSearch" onClick={(e)=>{
                    searchGame(videogame);
                    e.target.value = "";
                    }}>Search
                </button>
            </div>  
        </div>
    )
}