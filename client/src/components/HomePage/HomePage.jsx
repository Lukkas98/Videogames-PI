import "./HomePage.modules.css"
import { useState } from "react"
import Cards from "../Cards/Cards"
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default function HomePage ({videogames, filter, order, error}){

    const [page, setPage] = useState(1);
    const pageSize = 15;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    //paginado dinamico
    const videogamesArray = videogames || [];
    const totalPages = Math.ceil(videogamesArray.length / pageSize);
    let pagination = []
    for (let i = 1; i <= totalPages; i++) {
        if(i !== page){
            pagination.push(
                <button key={i} onClick={() => setPage(i)} >{i}</button>
            ) 
        }else{
            pagination.push(
                <button style={{
                    backgroundColor: "#46469e",
                    color: "#ffffff"}}
                    key={i} 
                    onClick={() => setPage(i)}>{i}
                </button>
            )
        }
    }

    const allGenres = useSelector(store => store.allGenres)

    const handleOnChangeFilter = (e) => {
        filter(e.target.value);
        setPage(1);
        e.target.value = "";
    }
    const handleOnChangeOrder = (e) =>{
        order(e.target.value);
        setPage(1);
        e.target.value = "";
    }

    return(
        <>
            <div className="divFilters">
                <select className="select" onChange={handleOnChangeFilter}>
                    <option hidden value="">Filter by genre</option>
                    {
                        allGenres.map(genre => <option key={genre.id} value={genre.name}>{genre.name}</option>)
                    }
                </select>
                <select className="select" onChange={handleOnChangeFilter}>
                    <option hidden value="">Filter by Create or All</option>
                    <option value="all">All</option>
                    <option value="bd">Created</option>
                    <option value="api">No Created</option>
                </select>
                <select className="select" onChange={handleOnChangeOrder}>
                    <option hidden value="">Order</option>
                    <optgroup label="Order by Name">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </optgroup>
                    <optgroup label="Order by Rating">
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </optgroup>
                </select>
            </div>
            {
                !Array.isArray(videogames) && !error && <Loading />
            }
            {
                Array.isArray(videogames) && !error && <Cards videogames={videogames.slice(startIndex, endIndex)}/>
            }
            {
                error && videogames[0].error && <Error nameError={videogames[0].error}/>
            }
            {
                error && !videogames[0].error && <Error />
            }
            {
                !error && 
                <div className="btnsPagination">
                    <div className="pagination">
                        {pagination}
                    </div>
                    {
                        Array.isArray(videogames) && videogames.slice(startIndex, endIndex).length < pageSize ? (
                            totalPages === 1 ? null : <button onClick={()=>{setPage(page - 1)}} >Previous</button>
                        ) : (
                            page === 1 ? (
                                <button onClick={()=>{setPage(page + 1)}} >Next</button>
                            ) : (
                                <>
                                    <button onClick={()=>{setPage(page - 1)}} >Previous Page</button>
                                    <button onClick={()=>{setPage(page + 1)}} >Next Page</button>
                                </>
                            )
                        )       
                    }
                </div>
            }
        </>
    )
}