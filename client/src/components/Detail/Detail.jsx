import "./Detail.modules.css"
import axios from "axios";
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import imgDefault from "../../assets/images/pngwing.com.png"
import Loading from "../Loading/Loading";

export default function Detail(){
    const { id } = useParams();

    const [game, setGame] = useState({});

    useEffect(()=>{
        async function gameData(){
            const {data} = await axios(`http://localhost:3001/videogames/${id}`);
            setGame(data);
        }
        gameData();
    },[id])

    //Pruebas------------------------------------------------------------
    const [typingText, setTypingText] = useState("");

    useEffect(() => {
        let i = 1;
        const speed = 15;
      
        function typeWriter() {
          if (i < game.description.length) {
            setTypingText(prevText => prevText + game.description.charAt(i));
            i++;
            setTimeout(typeWriter, speed);
          }
        }
      
        game.description ? typeWriter() : setTypingText("");
      
        return () => {
            clearTimeout();
            setTypingText("");
        };
    }, [game]);
    
    const descriptionHTML = { __html: typingText };
    //---------------------------------------------------------------------

    return(
        <div className="containerDivDetail" >
            <NavLink className="link" to="/home" >BACK HOME</NavLink>
            <div className="divDetail">
                {
                    game.name ? (
                        <> 
                            <p className="title">{game.name}</p>
                            <img className="img" src={game.image || imgDefault} alt="img"/>

                            <div className="divData">
                                {
                                    game.genresList ? (
                                        game.genresList.map((genre, i) => <span className="genre" key={i}>{genre}</span>)
                                    ) : (
                                        game.genres.map((genre, i) => <span className="genre" key={i} >{genre.name}</span>)
                                    )
                                }
                            </div>
                            <div className="divData">
                                {
                                    game.id ? (
                                        game.platforms.map((objPlatform, i) => 
                                            <span className="platform" key={i}>{objPlatform.platform.name}</span>
                                        )
                                    ) : <p className="platform">{game.platforms}</p>   
                                }                           
                            </div>   
                            
                            <p className="description"><span id="text" dangerouslySetInnerHTML={descriptionHTML}></span></p>
                            <p>Release Date: {game.releaseDate}</p>
                            <p>Game Rating: {game.rating}</p>
                        </>
                    ) : (
                        <Loading />
                    )
                }
            </div>
        </div>
    )
}