import { Suspense } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({ videogames }) {
  return (
    <div className={style.container}>
      <Suspense key={Date.now()} fallback={<div>Cagando...</div>}>
        {videogames.map((game, i) => (
          <Card key={i} game={game} />
        ))}
      </Suspense>
    </div>
  );
}
