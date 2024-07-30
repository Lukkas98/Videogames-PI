import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar({ searchGame }) {
  const [videogame, setVideogame] = useState("");

  const onChange = (e) => {
    setVideogame(e.target.value);
  };

  return (
    <div className={styles.containerNav}>
      <div>
        <NavLink className={styles.links} to="/">
          Exit
        </NavLink>
        <NavLink className={styles.links} to="/create">
          create game
        </NavLink>
      </div>
      <div className={styles.searchBar}>
        <input
          className={styles.inputSearch}
          type="text"
          onChange={onChange}
          placeholder="search a game"
        />
        <button
          className={styles.btnSearch}
          onClick={(e) => {
            searchGame(videogame);
            e.target.value = "";
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
