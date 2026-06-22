import { useMovieContext } from "../../contexts/MovieContext";
import DeckFilmCard from "../Cards/DeckFilmCard";

function DeckBox({ onSelectReview }) {
  const { deck } = useMovieContext();

  return (
    <div className="deckbox__container">
      {deck.map((movie, i) => (
        <DeckFilmCard
          key={movie.movie_id}
          movie={movie}
          index={i}
          onSelectReview={onSelectReview}
        />
      ))}
    </div>
  );
}

export default DeckBox;