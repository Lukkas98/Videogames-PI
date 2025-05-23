const axios = require("axios");
const { API_KEY, Genres } = require("../db");

const addGenresToBasedata = async () => {
  try {
    const { results } = (
      await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    ).data;

    const genres = [];
    results.forEach((genre) => {
      genres.push({
        id: genre.id,
        name: genre.name,
        image: genre.image_background,
      });
    });

    await Genres.bulkCreate(genres, {
      ignoreDuplicates: true,
    });

    return genres;
  } catch (error) {
    return error.message;
  }
};

const getGenres = async (__req, res) => {
  try {
    const genresBD = Genres.findAll({});

    if (!genresBD.length) {
      const genres = await addGenresToBasedata();
      return res.status(200).json(genres);
    }

    res.status(200).json(genresBD);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = {
  getGenres,
};
