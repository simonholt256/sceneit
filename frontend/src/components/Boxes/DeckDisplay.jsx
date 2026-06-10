import { useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import DeckFilmCard from "../Cards/DeckFilmCard";

function DeckDisplay() {
  const { deck, getSeenMovie } = useMovieContext();

  const [currentIndex, setCurrentIndex] = useState(0);

  const movieId = deck[currentIndex];
  const movie = movieId ? getSeenMovie(movieId) : null;

  function nextMovie() {
    if (deck.length === 0) return;

    setCurrentIndex(prev =>
      (prev + 1) % deck.length
    );
  }

  function previousMovie() {
    if (deck.length === 0) return;

    setCurrentIndex(prev =>
      prev === 0 ? deck.length - 1 : prev - 1
    );
  }

  return (
    <div className="dash__deck-box">

      

      <div className="dash__deck-container">
        <DeckFilmCard index={currentIndex} />
      </div>

      <div className="dash__review-text-box">
        {movie ? (
          <>
            <h3>{movie.title}</h3>
            <p>Rating: {movie.userRating}/10</p>
            <p>{movie.review || "No review written."}</p>
          </>
        ) : (
          <p>No deck films.</p>
        )}
      </div>
      <div className="deck-controls">
        <button className="dash-deck-arrows" onClick={previousMovie}>◀</button>

          <span>
            {deck.length > 0
              ? `${currentIndex + 1} / ${deck.length}`
              : "0 / 0"}
          </span>

          <button className="dash-deck-arrows" onClick={nextMovie}>▶</button>
        </div>

    </div>
  );
}

export default DeckDisplay;