import "./Nav.modules.css"
import SearchBar from "../SearchBar/SearchBar";

export default function Nav( {searchGame} ){

    return(
        <>
            <SearchBar searchGame={searchGame} />    
        </>
    )
}