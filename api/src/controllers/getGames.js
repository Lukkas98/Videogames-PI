const axios = require("axios");
const { API_KEY } = require("../db");
const { Videogame } = require("../db")

const URL =  `https://api.rawg.io/api/games?key=${API_KEY}`;

const getAllVideogames = async (url, videogames = [])=>{
    try {
        if(videogames.length >= 100) return videogames;
        const {next, results} = (await axios(url)).data;

        results.forEach( game => {
            videogames.push({
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.platforms,
                image: game.background_image,
                releaseDate: game.released,
                rating: game.rating,
                genres: game.genres
            })
        });
        return getAllVideogames(next, videogames);
    } catch (err) {
        return {err: err.message};
    }
};

const getGamesByName = async (name, videogames = [])=>{
    try {
        let games = await Videogame.findAll();
        await games.forEach( game => {
            if (videogames.length >= 15) return videogames; 
            if(game.dataValues.name.toLowerCase().includes(name)) videogames.push(game.dataValues);
        })
        //si ya se llena desde la base de datos no hago la llamada a la Api

        games =  await getAllVideogames(URL);
        
        games.forEach( game => {
            if(videogames.length >= 15) return videogames
            if(game.name.toLowerCase().includes(name)) videogames.push(game)
        })

        return videogames;

    } catch (error) {
        return {err: error.message }
    }
}




const getGames = async (req, res)=>{
    try {
        const { name } = req.query;

        let allVideogames = []

        if (!name) {
            let dbGame = await Videogame.findAll();
            let apiGames = await getAllVideogames(URL);

            if (!dbGame.length) {
                allVideogames = apiGames
            }else{
                dbGame.forEach( game => {
                    allVideogames.push(game.dataValues)
                })
                allVideogames = [...allVideogames, ...apiGames]
            }
        }      
        else allVideogames = await getGamesByName(name.toLowerCase());

        if(!allVideogames.length) throw new Error("empty array")

        res.status(200).json(allVideogames);
        
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

module.exports = getGames;