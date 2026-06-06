import { useState, useEffect } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import DeckFilmCard from "../Cards/DeckFilmCard";

function DeckDisplay() {
  const { deck, getSeenMovie } = useMovieContext();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (deck.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [deck.length]);

  const movieId = deck[currentIndex];
  const movie = movieId ? getSeenMovie(movieId) : null;

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
    </div>
  );
}

export default DeckDisplay;