import { useEffect, useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { getRecommendedMovies } from "../../services/api";

import FilmCard from "../Cards/FilmCard";

function RecommendationBox() {
  const { deck } = useMovieContext();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true);

        const results = await Promise.all(
          deck.map(movieId =>
            getRecommendedMovies(movieId)
          )
        );

        const combined = results.flat();

        const uniqueMovies = combined.filter(
          (movie, index, self) =>
            index === self.findIndex(m => m.id === movie.id)
        );

        const filtered = uniqueMovies.filter(
          movie => !deck.includes(movie.id)
        );

        setMovies(filtered);
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

  return (
    <div className="recommdations-movie-grid">
      {movies.slice(0, 6).map(movie => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default RecommendationBox;

// import { useState, useEffect } from "react"
// import { getPopularMovies } from "../../services/api";
// const { deck } = useMovieContext();

// import FilmCard from "../Cards/FilmCard"

// function RecommendationBox() {

//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadPopularMovies = async () => {
//       try {
//         const popularMovies = await getPopularMovies()
//         setMovies(popularMovies)
//       } catch (err) {
//         console.log(err)
//         setError("Failed to load movies.")
//       }
//       finally {
//         setLoading(false)
//       }
//     }

//     loadPopularMovies()
//   }, [])

//   return (
//     <div className="recommdations-movie-grid">
//       {movies.slice(0, 6).map((movie) => (
//         <FilmCard movie={movie} key={movie.id} />
//       ))}
//     </div>
//   )
// }

// export default RecommendationBox