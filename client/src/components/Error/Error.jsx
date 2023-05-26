import "./Error.modules.css"
import { NavLink } from "react-router-dom";

export default function Error( {nameError, errorPage} ){

    return(
        <>
        <NavLink to="/home" className="link linkError">BACK HOME</NavLink>  
        <div className="divError">
            {
                nameError ? 
                (
                    <div className="errorContainer">
                        <p className="errorText">ERROR 404 NOT FOUND</p>
                        <p className="errorText">There're no games with name {nameError}</p>
                    </div>
                )
                : !errorPage && <p className="errorText">ERROR 404 Games not Found</p>
            }
            {
                errorPage && 
                <div className="errorContainer">         
                    <p className="errorText">ERROR 404</p>
                    <p className="errorText">PAGE NOT FOUND</p>
                </div>
            }
        </div>
        </>
    )
}