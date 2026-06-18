import { useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { getPoster } from "../../utils/poster";
import DeckFilmCard from "../Cards/DeckFilmCard";

function DashDeck() {
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
    <div className="dashdeck">
      <h3>Deck Spotlight</h3>
      <img
        src={getPoster(movie)}
        className="dashdeck__poster-img"
      
      />
      {movie ? (
          <>
            <h3>{movie.title}</h3>
            <p>Rating: {movie.userRating}/10</p>
            <p>{movie.review || "No review written."}</p>
          </>
        ) : (
          <p>No deck films.</p>
        )}
        <button className="dashdeck__arrows" onClick={previousMovie}>◀</button>
        <span>
          {deck.length > 0
            ? `${currentIndex + 1} / ${deck.length}`
            : "0 / 0"}
        </span>
        <button className="dashdeck__arrows" onClick={nextMovie}>▶</button>
    </div>
    
  );
}

export default DashDeck;