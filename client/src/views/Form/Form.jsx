import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Form.modules.css";
import validate from "./validation";
import { createGame } from "../../redux/actions";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Form() {
  const dispatch = useDispatch();

  //otener todos los generos
  const allGenres = useSelector((state) => state.allGenres);
  const [formComplete, setFormComplete] = useState(false);

  const objForState = {
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    platforms: [],
    image: "",
    genres: [],
  };
  const [gameData, setGameData] = useState({ ...objForState });
  const [errors, setErrors] = useState({ ...objForState });

  const handleInputChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    }); // setErrors((validate(gameData)));
  };
  useEffect(() => {
    setErrors(validate(gameData));

    if (
      errors.name ||
      errors.description ||
      errors.genres ||
      errors.platforms ||
      errors.rating ||
      errors.releaseDate
    ) {
      setFormComplete(false);
    } else {
      setFormComplete(true);
    }
  }, [gameData]);

  //estado
  const setPlatforms = (e) => {
    if (!gameData.platforms.includes(e.target.value)) {
      setGameData({
        ...gameData,
        platforms: [...gameData.platforms, e.target.value],
      });
    } else {
      let delPlatform = gameData.platforms.filter(
        (platform) => platform !== e.target.value
      );
      setGameData({
        ...gameData,
        platforms: delPlatform,
      });
    }
    e.target.value = "";
  };

  const setGenres = (e) => {
    if (!gameData.genres.includes(e.target.value)) {
      setGameData({
        ...gameData,
        genres: [...gameData.genres, e.target.value],
      });
    } else {
      let delGenre = gameData.genres.filter(
        (genre) => genre !== e.target.value
      );
      setGameData({
        ...gameData,
        genres: delGenre,
      });
    }
    e.target.value = "";
  };

  const [info, setInfo] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/videogames", {
        ...gameData,
        platforms: gameData.platforms.join(" "),
      });
      dispatch(createGame(data));

      setGameData(objForState);
      setErrors(objForState);
      setInfo("Videogame Created");
    } catch (error) {
      const data = error.response.data.error;
      setGameData(objForState);
      setErrors(objForState);
      setInfo(data);
    }
  };

  return (
    <div className="divFormPage">
      <NavLink className="link" to="/home">
        BACK HOME
      </NavLink>
      <div className="containerForm">
        <h2 className="vintageTitle">Create a VideoGame</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="divInput">
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="off"
              value={gameData.name}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="divInput">
            <textarea
              onChange={handleInputChange}
              type="text"
              name="description"
              placeholder="description"
              autoComplete="off"
              value={gameData.description}
            ></textarea>
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
          <div className="divInput">
            <select onChange={setPlatforms}>
              <option hidden value="">
                Platforms
              </option>
              <option value="PC">PC</option>
              <option value="XBOX 360">XBOX 360</option>
              <option value="XBOX ONE">XBOX ONE</option>
              <option value="PLAY STATION">PLAY STATION 1</option>
              <option value="PLAY STATION 2">PLAY STATION 2</option>
              <option value="PLAY STATION 3">PLAY STATION 3</option>
              <option value="PLAY STATION 4">PLAY STATION 4</option>
              <option value="PLAY STATION 5">PLAY STATION 5</option>
            </select>
            {errors.platforms && (
              <span className="error">{errors.platforms}</span>
            )}
            {gameData.platforms.length > 0 && (
              <span className="dataSpan">{gameData.platforms + " "} </span>
            )}
          </div>
          <div className="divInput">
            <input
              onChange={handleInputChange}
              type="text"
              name="image"
              placeholder="image src"
              autoComplete="off"
              value={gameData.image}
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <div className="divInput">
            <input
              onChange={handleInputChange}
              type="date"
              name="releaseDate"
              placeholder="releaseDate"
              value={gameData.releaseDate}
            />
            {errors.releaseDate && (
              <span className="error">{errors.releaseDate}</span>
            )}
          </div>
          <div className="divInput">
            <input
              onChange={handleInputChange}
              type="text"
              name="rating"
              placeholder="rating"
              value={gameData.rating}
            />
            {errors.rating && <span className="error">{errors.rating}</span>}
          </div>
          <div className="divInput">
            <select onChange={setGenres} defaultValue="Genres">
              <option hidden value="">
                Genres
              </option>
              {allGenres.length &&
                allGenres.map((genre, i) => {
                  return <option key={i}>{genre.name}</option>;
                })}
            </select>
            {errors.genres && <span className="error">{errors.genres}</span>}
            {gameData.genres.length > 0 && (
              <span className="dataSpan">{gameData.genres + " "}</span>
            )}
          </div>
          {!formComplete ? (
            <button disabled>Please Complete Form</button>
          ) : (
            <button type="submit">Create</button>
          )}
          <p>{info}</p>
        </form>
      </div>
    </div>
  );
}
