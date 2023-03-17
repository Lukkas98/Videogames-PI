import "./Error.modules.css"
import { NavLink } from "react-router-dom";

export default function Error( {nameError, errorPage} ){

    return(
        <div className="divError">
            {
                nameError ? 
                (
                    <>
                        <p>ERROR 404 NOT FOUND</p>
                        <p>There're no games with name {nameError}</p>
                    </>
                )
                : !errorPage && <p>ERROR 404 Games not Found</p>
            }
            {
                errorPage && 
                <div style={{textAlign:"center"}}>
                    <NavLink to="/home" className="link" style={{display:"inline-block"}} >BACK HOME</NavLink> 
                    
                    <p>ERROR 404</p>
                    <p>PAGE NOT FOUND</p>
                    
                </div>
            }
        </div>
    )
}