import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
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
      <div className={styles.tv}>
        <div className={styles.screen}>
          <div className={styles.tvContainer}>
            <div className={styles.tvScreen}>
              <span className={styles.numberTV}>3</span>
              <h1 className={styles.h1}>Press start button</h1>
              <p className={styles.p}>search information from any videogame</p>
              {!isLoading ? (
                <NavLink to="/home" className={styles.btn}>
                  Start
                </NavLink>
              ) : (
                <div className={styles.btn}>Loading...</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.antenna}></div>
        <div className={styles.buttonRow}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </div>
      <div className={styles.nintendoController}>
        <div className={styles.signature}>
          Lucas Palma {new Date().getFullYear()}
        </div>
        <div className={styles.dpad}>
          <span className={styles.fix}></span>
        </div>
        <div className={styles.buttonsC}>
          <div className={`${styles.buttonC} ${styles.a}`}></div>
          <div className={`${styles.buttonC} ${styles.b}`}></div>
          <div className={`${styles.buttonC} ${styles.aS}`}></div>
          <div className={`${styles.buttonC} ${styles.bS}`}></div>
          <div className={`${styles.buttonC} ${styles.selectC}`}></div>
          <div className={`${styles.buttonC} ${styles.startC}`}></div>
        </div>
        <div className={styles.cable}></div>
      </div>
    </>
  );
}
