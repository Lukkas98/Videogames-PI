const axios = require("axios");
const { API_KEY, Genres } = require("../db");

const addGenresToBasedata = async()=>{
    const {results} = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data
    results.forEach( async genre => {
        await Genres.create({
            id: genre.id,
            name: genre.name
       });
    });
}


const getGenres = async (req, res)=>{
    try {
        const {results} = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data

        let genres = [];
        results.forEach( genre => {
            genres.push({
                id: genre.id,
                name: genre.name,
                image: genre.image_background
           });
        });
        
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

module.exports = {
    getGenres,
    addGenresToBasedata
};