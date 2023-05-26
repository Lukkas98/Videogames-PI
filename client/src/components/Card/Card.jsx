import { NavLink } from "react-router-dom";
import "./Card.modules.css";
//recibe por parametro las props y crea la card
import imgDefault from "../../assets/images/pngwing.com.png";
export default function Card({ game }) {
  return (
    <div className="divCard">
      <p>{game.name}</p>
      {/* <p>Description: <span dangerouslySetInnerHTML={{__html: game.description}}></span></p> */}
      <div className="img-genres">
        <NavLink className="divImage" to={`/detail/${game.id || game.uuid}`}>
          <img
            className="imgGame"
            src={game.image || imgDefault}
            alt="img-redundant-alt"
          />
          <span className="overlay">
            <p id="overlayContent">
              <svg
                className="logo-svg"
                viewBox="-51.2 -51.2 614.40 614.40"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  strokeWidth="0"
                  transform="translate(0,0), scale(1)"
                ></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#f00000"
                  strokeWidth="18.432"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>open-external</title>
                  <g
                    id="Page-1"
                    strokeWidth="0.00512"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="icon"
                      fill="#000000"
                      transform="translate(85.333333, 64.000000)"
                    >
                      <path
                        d="M128,63.999444 L128,106.666444 L42.6666667,106.666667 L42.6666667,320 L256,320 L256,234.666444 L298.666,234.666444 L298.666667,362.666667 L4.26325641e-14,362.666667 L4.26325641e-14,64 L128,63.999444 Z M362.666667,1.42108547e-14 L362.666667,170.666667 L320,170.666667 L320,72.835 L143.084945,249.751611 L112.915055,219.581722 L289.83,42.666 L192,42.6666667 L192,1.42108547e-14 L362.666667,1.42108547e-14 Z"
                        id="Combined-Shape"
                      >
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </p>
          </span>
        </NavLink>
        <div className="genres">
          {game.hasOwnProperty("uuid")
            ? game.genresList.map((genre, i) => <span key={i}>{genre}</span>)
            : game.genres.map((genre, i) => <span key={i}>{genre.name}</span>)}
        </div>
      </div>
    </div>
  );
}
