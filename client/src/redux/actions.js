import axios from "axios";
import { GET_ALLGAMES, CREATE_GAME, GET_GENRES, ORDER, FILTER, SEARCH } from "./type";

export const getAllGames = ()=>{
    return async (dispatch)=>{
        const {data} = await axios("http://localhost:3001/videogames")
        dispatch({
            type: GET_ALLGAMES,
            payload: data
        })
    }
}

export const createGame = (game)=>{
    return{
        type: CREATE_GAME,
        payload: game
    }
}

export const getAllGenres = ()=>{
    return async (dispatch)=>{
        const {data} = await axios("http://localhost:3001/videogames/genres")
        dispatch({
            type: GET_GENRES,
            payload: data
        })
    }
}

export const searchByName = (name)=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios(`http://localhost:3001/videogames?name=${name}`)
            dispatch({
                type: SEARCH,
                payload: data
            })
        } catch {
            dispatch({
                type: SEARCH,
                payload: [{error: name}]
            })
        }
    }
}

export const filterGames = (filterType)=>{
    return{
        type: FILTER,
        payload: filterType
    }
}

export const orderGames = (orderType)=>{
    return{
        type: ORDER,
        payload: orderType
    }
}