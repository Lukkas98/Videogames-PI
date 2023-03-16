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
            <h1 className="h1">LOADING{dots}</h1>
            <h1 className="h1">PLEASE WAIT</h1>
        </div>
    </div>
    </>
            
                

 
  );
}