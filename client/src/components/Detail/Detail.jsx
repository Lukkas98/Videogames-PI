import "./Detail.modules.css";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import imgDefault from "../../assets/images/pngwing.com.png";
import Loading from "../Loading/Loading";

export default function Detail() {
  const { id } = useParams();

  return (
    <div className="containerDivDetail">
      <NavLink className="linkDetail" to="/home">
        BACK HOME
      </NavLink>
      <div className="divDetail">
        <Suspense key={Date.now()} fallback={<Loading />}>
          <InfoDetail id={id} />
        </Suspense>
      </div>
    </div>
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
    typeWriter(1);
  }

  const descriptionHTML = { __html: typingText };
  //---------------------------------------------------------------------

  return (
    <div className="gameDiv">
      <div className="divTitleImage">
        <p className="title">{game.name}</p>
        <img className="img" src={game.image || imgDefault} alt="img" />

        <div className="divData">
          <p className="genresPlat">Genres:</p>
          {game.genresList
            ? game.genresList?.map((genre, i) => (
                <span className="genre" key={i}>
                  {genre}
                </span>
              ))
            : game.genres?.map((genre, i) => (
                <span className="genre" key={i}>
                  {genre.name}
                </span>
              ))}
        </div>
        <div className="divData">
          <p className="genresPlat">Platforms:</p>
          {game.id ? (
            game.platforms?.map((objPlatform, i) => (
              <span className="platform" key={i}>
                {objPlatform.platform.name}
              </span>
            ))
          ) : (
            <p className="platform">{game.platforms}</p>
          )}
        </div>
      </div>
      <div className="description">
        {!isTyping && !typingText && (
          <div className="btnDetail" onClick={startTyping}>
            See Description
          </div>
        )}
        <span id="text" dangerouslySetInnerHTML={descriptionHTML}></span>
      </div>
      <p className="date">Release Date: {game.releaseDate}</p>
      <p className="rating">Game Rating: {game.rating}</p>
    </div>
  );
}
