import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({ videogames }) {
  return (
    <div className={style.container}>
      {videogames.map((game, i) => (
        <Card key={i} game={game} />
      ))}
    </div>
  );
}
