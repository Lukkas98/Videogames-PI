const { Router } = require("express");
const createGame = require("../controllers/createGame");
const getGameById = require("../controllers/getgameByID");
const { getGenres, addGenresToBasedata } = require("../controllers/getGenres");
const getGames = require("../controllers/getGames");

const router = Router();

router.get("/genres", getGenres);
router.post("/genres", addGenresToBasedata);

router.get("/", getGames);
router.post("/", createGame);

router.get("/:idVideogame", getGameById);

module.exports = router;
