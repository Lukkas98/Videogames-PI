import {  GET_ALLGAMES, CREATE_GAME, GET_GENRES, ORDER, FILTER, SEARCH } from "./type";

const initialState = {
    allVideogames: [],
    gamesCreated: [],
    allGenres: [],
    gamesSearch: [],
    gamesFiltered: []
}

export default function reducer (state = initialState, { type, payload }){
    switch (type) {    
        case GET_ALLGAMES:
            return{
                ...state,
                allVideogames: [...state.allVideogames, ...payload],
            }

        case CREATE_GAME:
            return{
                ...state,
                gamesCreated: [...state.gamesCreated, payload],
                allVideogames: [...state.allVideogames, payload]
            }
        
        case GET_GENRES:
            return{
                ...state,
                allGenres: payload
            }
        case SEARCH:
            return{
                ...state,
                gamesSearch: [...payload]
            }
        case FILTER:
            if(payload === "all") {
                return{
                    ...state,
                    gamesFiltered: [...state.allVideogames]
                }
            }
            if(payload === "bd"){
                let filterBdGames = state.allVideogames.filter(game => game.uuid);
                return{
                    ...state,
                    gamesFiltered: filterBdGames
                }
            }
            if(payload === "api"){
                let filterApiGames = state.allVideogames.filter(game => game.id );
                return{
                    ...state,
                    gamesFiltered: filterApiGames
                }
            }     
            
            let filterGamesApi = state.allVideogames.filter(game => {
                if(game.id){ //game api
                    return game.genres.some(genre => genre.name === payload);
                }else{ //game bd
                    return game.genresList.includes(payload);
                }           
            })
            return{
                ...state,
                gamesFiltered: filterGamesApi
            }
        case ORDER:
            let GamesToOrder = []
            let gamesOrdered = []
            state.gamesFiltered.length ? GamesToOrder= [...state.gamesFiltered] : GamesToOrder = [...state.allVideogames];

            if (payload === "A-Z") {
                gamesOrdered = GamesToOrder.sort((a,b)=>{
                    return a.name.localeCompare(b.name);
                })
            }else if(payload === "Z-A"){
                gamesOrdered = GamesToOrder.sort((a,b)=>{
                    return b.name.localeCompare(a.name);
                })
            }else if(payload === "ascending"){
                gamesOrdered = GamesToOrder.sort((a,b)=>{
                    return a.rating - b.rating
                })
            }else if(payload === "descending"){
                gamesOrdered = GamesToOrder.sort((a,b)=>{
                    return b.rating - a.rating
                })
            }
            return{
                ...state,
                gamesFiltered: gamesOrdered
            }

        default:
            return {...state}
    }
}