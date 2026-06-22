import { useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { getPoster } from "../../utils/poster";

function DashDeck() {
  const { deck, seen } = useMovieContext();

  const [currentIndex, setCurrentIndex] = useState(0);

  // Safely resolve the current deck entry
  const raw = deck[currentIndex];

  let movie = null;

  if (raw) {
    if (typeof raw === "number") {
      // deck stores movie_ids → resolve from seen list
      movie = seen.find(m => m.movie_id === raw) || null;
    } else if (typeof raw === "object") {
      // deck stores full enriched movie objects
      movie = raw;
    }
  }

  function nextMovie() {
    if (deck.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % deck.length);
  }

  function previousMovie() {
    if (deck.length === 0) return;
    setCurrentIndex(prev => (prev === 0 ? deck.length - 1 : prev - 1));
  }

  return (
    <div className="dashdeck">
      <h3>Deck Spotlight</h3>
      
      {movie && (
        <img
          src={getPoster(movie)}
          className="dashdeck__poster-img"
          alt={movie.title}
        />
      )}

      {movie ? (
        <>
          <h3>{movie.title}</h3>
          <p>
            Rating: {movie.userRating != null ? movie.userRating : "Unrated"}/10
          </p>
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