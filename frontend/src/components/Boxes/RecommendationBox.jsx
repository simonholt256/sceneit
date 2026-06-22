import { useEffect, useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { getRecommendedMovies } from "../../services/movieServices";

import FilmCard from "../Cards/FilmCard";

function RecommendationBox() {
  const { deck } = useMovieContext();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);

  const moviesPerPage = 6;

  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true);

        const results = await Promise.all(
          deck.map(movie =>
            getRecommendedMovies(movie.movie_id)
          )
        );

        const combined = results.flat();

        const uniqueMovies = combined.filter(
          (movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id)
        );

        const filtered = uniqueMovies.filter(
          movie => !deck.some(d => d.movie_id === movie.id)
        );

        setMovies(filtered);
        setPage(0);
      } catch (err) {
        console.log(err);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    }

    if (deck.length > 0) {
      loadRecommendations();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [deck]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movies.length) {
    return <div>Add movies to your deck to get recommendations.</div>;
  }

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const startIndex = page * moviesPerPage;
  const currentMovies = movies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  function nextPage() {
    setPage(prev => (prev + 1) % totalPages);
  }

  function previousPage() {
    setPage(prev =>
      prev === 0 ? totalPages - 1 : prev - 1
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendation-controls">
        <button className="recommendation-arrow" onClick={previousPage}>◀</button>
        <h3>Recommendations</h3>
        <span>
          {page + 1} / {totalPages}
        </span>

        <button className="recommendation-arrow" onClick={nextPage}>▶</button>
      </div>

      <div className="recommdations-movie-grid">
        {currentMovies.map(movie => (
          <FilmCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationBox;
