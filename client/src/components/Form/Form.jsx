import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Form.modules.css"
import validate from "./validation"
import {createGame} from "../../redux/actions"
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Form(){
    const dispatch = useDispatch()

    //otener todos los generos
    const allGenres = useSelector(state => state.allGenres)
    
    const objForState = {
        name:"",
        description:"",
        releaseDate:"",
        rating: "",
        platforms: "",
        image: "",
        genres: []
    }
    const [gameData, setGameData] = useState({...objForState});

    const [ errors, setErrors ] = useState({...objForState});

    const handleInputChange = (e)=>{
        setGameData({
            ...gameData,
            [e.target.name] : e.target.value
        })
        setErrors((validate(gameData)));
    }

    //estado
    const setPlatforms = (e)=>{
        if (!gameData.platforms.includes(e.target.value)) {
            setGameData({
                ...gameData,
                platforms: gameData.platforms.concat(`${e.target.value} `)
            })
        }
        e.target.value = ""
    }

    const setGenres = (e)=>{
        if (!gameData.genres.includes(e.target.value)) {
            setGameData({
                ...gameData,
                genres: [...gameData.genres, e.target.value]
            })
        }else{
            let delGenre = gameData.genres.filter( genre => genre !== e.target.value)
            setGameData({
                ...gameData,
                genres: delGenre
            }) 
        }
        e.target.value = ""
    }
    
    const [info, setInfo] = useState("")

    const onSubmit = async (e)=>{
        try {
            e.preventDefault();
            const {data} = await axios.post("/videogames", gameData);
            
            dispatch(createGame(data));
            setGameData(objForState)
            setErrors(objForState)
            setInfo("Videogame Created")
        } catch (error){
            const data = error.response.data.error;
            setErrors(objForState)
            setGameData(objForState)
            setInfo(data)
        }
    }

    return(
        <div className="divFormPage">
            <NavLink className="link" to="/home" >BACK HOME</NavLink>
            <div className="containerForm">
                <h2>Create a VideoGame</h2>
                <form className="form" onSubmit={onSubmit}>
                    
                    <input onChange={handleInputChange} type="text" name="name" placeholder="Name" autoComplete="off" value={gameData.name}/>
                    
                    {errors.name && <span>{errors.name}</span>}
                    
                    <input onChange={handleInputChange} type="text" name="description" placeholder="description" autoComplete="off" value={gameData.description} />
                    
                    {errors.description && <span>{errors.description}</span>}
                    
                    <select onChange={setPlatforms}>
                        <option hidden value="">Platforms</option>
                        <option value="PC">PC</option>
                        <option value="XBOX 360">XBOX 360</option>
                        <option value="XBOX ONE">XBOX ONE</option>
                        <option value="PLAY STATION">PLAY STATION 1</option>
                        <option value="PLAY STATION 2">PLAY STATION 2</option>
                        <option value="PLAY STATION 3">PLAY STATION 3</option>
                        <option value="PLAY STATION 4">PLAY STATION 4</option>
                        <option value="PLAY STATION 5">PLAY STATION 5</option>
                    </select>
                    {gameData.platforms && <span className="dataSpan" >{gameData.platforms} </span>}
                    
                    <input onChange={handleInputChange} type="text" name="image" placeholder="image src" autoComplete="off" value={gameData.image} />
                    
                    {errors.image && <span>{errors.image}</span>}
                    
                    <input onChange={handleInputChange} type="text" name="releaseDate" placeholder="releaseDate" value={gameData.releaseDate}/>
                    
                    {errors.releaseDate && <span>{errors.releaseDate}</span> }
                    
                    <input onChange={handleInputChange} type="text" name="rating" placeholder="rating" value={gameData.rating}/>
                    
                    {errors.rating && <span>{errors.rating}</span> }

                    
                    <select onChange={setGenres} defaultValue="Genres" >
                        <option hidden value="">Genres</option>
                        {
                        allGenres.length && allGenres.map((genre, i) => {
                            return <option key={i}>{genre.name}</option>;
                        })
                        }
                    </select>
                    
                    {gameData.genres && <span className="dataSpan">{gameData.genres + " "}</span>}
                    
                    {
                        errors.name || errors.description || errors.genres || errors.platforms || errors.rating || errors.releaseDate ? (  
                            <button disabled >Please Complete Form</button>
                        ) : (
                            <button type="submit">Create</button>
                        )
                    }
                    <p>{info}</p>
                </form>
            </div>
        </div>
    )
}