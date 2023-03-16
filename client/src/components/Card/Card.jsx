import { NavLink } from "react-router-dom";
import "./Card.modules.css"
//recibe por parametro las props y crea la card
import imgDefault from "../../assets/images/pngwing.com.png"
export default function Card({game}){

    return(
        <div className="divCard">
            <p>{game.name}</p>
            {/* <p>Description: <span dangerouslySetInnerHTML={{__html: game.description}}></span></p> */}
            <NavLink to={`/detail/${game.id || game.uuid}`}>
                <img className="imgGame" src={game.image || imgDefault} alt="img-redundant-alt" />
            </NavLink>
            {
                game.hasOwnProperty("uuid") ? (
                    game.genresList.map( (genre, i) => <span key={i}>{genre}</span>)
                ) : (
                    game.genres.map( (genre, i) => <span key={i} >{genre.name}</span>)
                )
            }
        </div>
    )
}