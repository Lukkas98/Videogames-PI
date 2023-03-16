const {Videogame, Genres} = require("../db")
// const imgDefault = "https://w7.pngwing.com/pngs/961/904/png-transparent-emoji-video-game-sms-games-game-sticker-joystick-thumbnail.png"

const createGame = async(req, res)=>{
    try {
        const {
            name, description, platforms, image, releaseDate, rating, genres
        } = req.body;

        if (!name || !description || !platforms || !releaseDate || !rating || !genres) throw new Error("Missing data")

        const game = await Videogame.create({
            name,
            description,
            platforms,
            image,
            releaseDate,
            rating,
            genresList: genres
          });
      
          // Agregar las relaciones con los géneros
          const genresToAdd = await Genres.findAll({ where: { name: genres } });
          await game.addGenres(genresToAdd);
      
          res.status(200).json( game.dataValues );
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
};

module.exports = createGame;