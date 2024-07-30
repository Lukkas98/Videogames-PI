import { useState, useEffect } from "react";
import styles from "./Loading.module.css";
import styles2 from "../../views/Landing/Landing.module.css"

export default function Loading() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return ".";
        } else {
          return prevDots + ".";
        }
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className={styles2.tvContainer} id="container">
        <div className={styles2.tvScreen}>
            <h2 className={styles.h2L}>LOADING{dots}</h2>
            <h2 className={styles.h2L}>PLEASE WAIT</h2>
        </div>
    </div>
    </>
            
                

 
  );
}