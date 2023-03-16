import { NavLink } from "react-router-dom";

export default function Error404(){

    return(
        <div style={{textAlign:"center"}}>
            <NavLink to="/home" className="link" style={{display:"inline-block"}} >BACK HOME</NavLink> 
            <div className="divError">
                <p>ERROR 404</p>
                <p>PAGE NOT FOUND</p>
            </div>
        </div>
    )
}