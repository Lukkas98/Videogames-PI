const axios = require("axios");
const { API_KEY, Genres } = require("../db");

const addGenresToBasedata = async (__req, res) => {
  try {
    const genresBD = await Genres.findAll({});

    if (!genresBD.length) {
      const { results } = (
        await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      ).data;
      results.forEach(async (genre) => {
        await Genres.create({
          id: genre.id,
          name: genre.name,
          image: genre.image_background,
        });
      });
      res.status(200).json(results);
      return;
    }
    res.status(200).json(genresBD);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const getGenres = async (__req, res) => {
  try {
    const genresBD = Genres.findAll({});

    if (!genresBD.length) {
      const { results } = (
        await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      ).data;

      let genres = [];
      results.forEach((genre) => {
        genres.push({
          id: genre.id,
          name: genre.name,
          image: genre.image_background,
        });
      });
      res.status(200).json(genres);
      return;
    }

    res.status(200).json(genresBD);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = {
  getGenres,
  addGenresToBasedata,
};
