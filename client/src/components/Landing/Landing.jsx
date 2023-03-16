import { NavLink } from "react-router-dom"
import "./Landing.modules.css"

export default function Landing(){


    return(
        <>
            <div className="tv-container">
                <div className="tv-screen">
                    <h1 className="h1" >Search any game in the world</h1>
                    <NavLink to="/home" className="btn">Let's Start</NavLink>
                    <div className="btn disabled">Load</div>
                    <div className="btn disabled">Exit</div>
                </div>
            </div>
        </>
    )
}