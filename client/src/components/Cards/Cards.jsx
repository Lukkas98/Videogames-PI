import Card from "../Card/Card";
import "./Cards.modules.css"

export default function Cards( {videogames} ){

    return(
        <div className="divFlex">
            {
                videogames.map( (game, i) => <Card key={i} game={game}/>)                 
            } 
        </div>
    )
}