import { useMovieContext } from "../../contexts/MovieContext";
import { getPoster } from "../../utils/poster";
import CardBack from "../../assets/default/cardbackplaceholder.png";

function DeckFilmCard({ movie, index, onSelectReview }) {
  return (
    <div className="deck-film-card">
      {movie ? (
        <img
          src={getPoster(movie)}
          alt={movie.title}
          className="deck-film-card__img"
          onClick={() => onSelectReview && onSelectReview(movie)}
        />
      ) : (
        <img src={CardBack} className="deck-film-card__cardback" />
      )}
    </div>
  );
}

export default DeckFilmCard;