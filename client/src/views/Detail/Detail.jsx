import styles from "./Detail.module.css";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import imgDefault from "../../assets/images/pngwing.com.png";
import Loading from "../../components/Loading/Loading";
import parse from "html-react-parser";
import BackgroundAnimation from "../../components/backgroundAnimation/backgroundAnimation";

export default function Detail() {
  const { id } = useParams();

  return (
    <>
      <BackgroundAnimation />
      <div className={styles.containerDivDetail}>
        <NavLink className={styles.linkDetail} to="/home">
          BACK HOME
        </NavLink>
        <div className={styles.divDetail}>
          <Suspense key={Date.now()} fallback={<Loading />}>
            <InfoDetail id={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function InfoDetail({ id }) {
  const [game, setGame] = useState({});

  useEffect(() => {
    async function gameData() {
      const { data } = await axios(`/videogames/${id}`);
      setGame(data);
    }
    gameData();

    return () => {
      setGame({});
    };
  }, [id]);

  //Pruebas------------------------------------------------------------
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  function typeWriter(i) {
    const speed = 15;
    if (i < game.description.length) {
      setTypingText((prevText) => prevText + game.description.charAt(i));
      i++;
      setTimeout(() => typeWriter(i), speed);
    } else {
      setIsTyping(false);
    }
  }

  function startTyping() {
    setTypingText("");
    setIsTyping(true);
    typeWriter(-2);
  }
  //---------------------------------------------------------------------

  return (
    <div className={styles.gameDiv}>
      <div className={styles.divTitleImage}>
        <p className={styles.title}>{game.name}</p>
        <img className={styles.img} src={game.image || imgDefault} alt="img" />

        <div className={styles.divGenres}>
          <p className={styles.p}>Genres:</p>
          {game.genresList
            ? game.genresList?.map((genre, i) => (
                <span className={styles.genre} key={i}>
                  {genre}
                </span>
              ))
            : game.genres?.map((genre, i) => (
                <span className={styles.genre} key={i}>
                  {genre.name}
                </span>
              ))}
        </div>
        <div className={styles.divPlatform}>
          <p className={styles.p}>Platforms:</p>
          {game.id ? (
            game.platforms?.map((objPlatform, i) => (
              <span className={styles.platform} key={i}>
                {objPlatform.platform.name}
              </span>
            ))
          ) : (
            <p className={styles.platform}>{game.platforms}</p>
          )}
        </div>
      </div>

      <div className={styles.description}>
        {!isTyping && !typingText && (
          <div className={styles.btnDetail} onClick={startTyping}>
            See Description
          </div>
        )}
        <span id="text" className={styles.text}>
          {parse(typingText)}
        </span>
      </div>

      <p className={styles.info}>
        <span>Release Date:</span> {game.releaseDate}
      </p>
      <p className={styles.info}>
        <span>Game Rating:</span> {game.rating}
      </p>
    </div>
  );
}
