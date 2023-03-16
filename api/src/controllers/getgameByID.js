const axios = require("axios");
const { API_KEY, Videogame } = require("../db");

const searchById = async (id, source)=>{
    let game = {}
    if (source === "api") {
        const data = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;

        game = {
            id: data.id,
            name: data.name,
            description: data.description,
            platforms: data.platforms,
            image: data.background_image,
            releaseDate: data.released,
            rating: data.rating,
            genres: data.genres
        }
    }else if (source === "bdd"){
        game = await Videogame.findByPk(id);
    }else{
        throw Error("error");
    }
    return game;
}

const getGameById = async ( req, res )=>{
    try {
        const { idVideogame } = req.params; 
        const source = isNaN(idVideogame) ? "bdd" : "api";
        let game = await searchById( idVideogame, source);

        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = getGameById;