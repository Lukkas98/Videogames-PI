import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";
import validate from "./validation";
import { createGame } from "../../redux/actions";
import axios from "axios";
import { NavLink } from "react-router-dom";
import BackgroundAnimation from "../../components/backgroundAnimation/backgroundAnimation";

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
    <div className={styles.divFormPage}>
      <BackgroundAnimation />
      <NavLink className={styles.link} to="/home">
        BACK HOME
      </NavLink>
      <div className={styles.containerForm}>
        <h2 className={styles.vintageTitle}>Create a VideoGame</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.divInput}>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              placeholder="Name"
              autoComplete="off"
              value={gameData.name}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.divInput}>
            <textarea
              onChange={handleInputChange}
              type="text"
              name="description"
              placeholder="description"
              autoComplete="off"
              value={gameData.description}
            ></textarea>
            {errors.description && (
              <span className={styles.error}>{errors.description}</span>
            )}
          </div>
          <div className={styles.divInput}>
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
              <span className={styles.error}>{errors.platforms}</span>
            )}
            {gameData.platforms.length > 0 && (
              <span className={styles.dataSpan}>{gameData.platforms + " "} </span>
            )}
          </div>
          <div className={styles.divInput}>
            <input
              onChange={handleInputChange}
              type="text"
              name="image"
              placeholder="image src"
              autoComplete="off"
              value={gameData.image}
            />
            {errors.image && <span className={styles.error}>{errors.image}</span>}
          </div>
          <div className={styles.divInput}>
            <input
              onChange={handleInputChange}
              type="date"
              name="releaseDate"
              placeholder="releaseDate"
              value={gameData.releaseDate}
            />
            {errors.releaseDate && (
              <span className={styles.error}>{errors.releaseDate}</span>
            )}
          </div>
          <div className={styles.divInput}>
            <input
              onChange={handleInputChange}
              type="text"
              name="rating"
              placeholder="rating"
              value={gameData.rating}
            />
            {errors.rating && <span className={styles.error}>{errors.rating}</span>}
          </div>
          <div className={styles.divInput}>
            <select onChange={setGenres} defaultValue="Genres">
              <option hidden value="">
                Genres
              </option>
              {allGenres.length &&
                allGenres.map((genre, i) => {
                  return <option key={i}>{genre.name}</option>;
                })}
            </select>
            {errors.genres && <span className={styles.error}>{errors.genres}</span>}
            {gameData.genres.length > 0 && (
              <span className={styles.dataSpan}>{gameData.genres + " "}</span>
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
