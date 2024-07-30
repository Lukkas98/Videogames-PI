import { useEffect, useState } from 'react';
import styles from './backgroundAnimation.module.css';

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  return { x, y };
};

const generateSquares = (numSquares) => {
  const squares = [];
  for (let i = 0; i < numSquares; i++) {
    const { x, y } = getRandomPosition();
    squares.push(
      <div
        key={i}
        className={styles.square}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      ></div>
    );
  }
  return squares;
};

const BackgroundAnimation = () => {
  const [numSquares, setNumSquares] = useState(18);

  useEffect(() => {
    const updateNumSquares = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newNumSquares = Math.floor((width * height) / 50000); // Ajusta este valor para cambiar la densidad
      setNumSquares(newNumSquares);
    };

    updateNumSquares(); 
    window.addEventListener('resize', updateNumSquares);

    return () => {
      window.removeEventListener('resize', updateNumSquares);
    };
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      {generateSquares(numSquares)}
    </div>
  );
};


export default BackgroundAnimation;
