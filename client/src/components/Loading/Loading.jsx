import { useState, useEffect } from "react";
import "./Loading.modules.css";

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
    <div className="tv-container" id="container">
        <div className="tv-screen">
            <h2 className="h2L">LOADING{dots}</h2>
            <h2 className="h2L">PLEASE WAIT</h2>
        </div>
    </div>
    </>
            
                

 
  );
}