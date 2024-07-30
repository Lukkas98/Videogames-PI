import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";
import imgDefault from "../../assets/images/pngwing.com.png";
//recibe por parametro las props y crea la card
export default function Card({ game }) {
  return (
    <div className={styles.divCard}>
      <h2 className={styles.title}>{game.name}</h2>
      {/* <p>Description: <span dangerouslySetInnerHTML={{__html: game.description}}></span></p> */}
      <div className={styles.img_genres}>
        <NavLink className={styles.DivImage} to={`/detail/${game.id || game.uuid}`}>
          <img
            className={styles.imgGame}
            src={game.image || imgDefault}
            alt="img-redundant-alt"
          />
        </NavLink>
        <div className={styles.genres}>
          {game.hasOwnProperty("uuid")
            ? game.genresList.map((genre, i) => <p className={styles.genreItem} key={i}>{genre}</p>)
            : game.genres.map((genre, i) => <p className={styles.genreItem} key={i}>{genre.name}</p>)}
        </div>
      </div>
    </div>
  );
}
