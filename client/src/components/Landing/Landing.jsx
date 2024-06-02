import { NavLink } from "react-router-dom";
import "./Landing.modules.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  const allGames = useSelector((state) => state.allVideogames);

  useEffect(() => {
    if (allGames.length) {
      setIsLoading(false);
    }
  }, [allGames]);

  return (
    <>
      <div className="tv">
        <div className="screen">
          <div className="tv-container">
            <div className="tv-screen">
              <span className="numberTV">3</span>
              <h1 className="h1">Press start botton</h1>
              {!isLoading ? (
                <NavLink to="/home" className="btn">
                  Start
                </NavLink>
              ) : (
                <div className="btn" >
                  Loading...
                </div>
              )
            }
            </div>
          </div>
        </div>
        <div className="antenna"></div>
        <div className="button-row">
          <div className="button"></div>
          <div className="button"></div>
          <div className="button"></div>
          <div className="button"></div>
        </div>
      </div>
      <div className="nintendo-controller">
        <div className="signature">Lucas Palma</div>
        <div className="dpad"></div>
        <div className="buttonsC">
          <div className="buttonC a"></div>
          <div className="buttonC b"></div>
          <div className="buttonC aS"></div>
          <div className="buttonC bS"></div>
          <div className="buttonC selectC"></div>
          <div className="buttonC startC"></div>
        </div>
        <div className="cable"></div>
      </div>
    </>
  );
}
