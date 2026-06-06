import { useState, useEffect } from "react"
import { getPopularMovies } from "../../services/api";

import FilmCard from "../Cards/FilmCard"

function RecommendationBox() {

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      } catch (err) {
        console.log(err)
        setError("Failed to load movies.")
      }
      finally {
        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  return (
    <div className="recommdations-movie-grid">
      {movies.slice(0, 6).map((movie) => (
        <FilmCard movie={movie} key={movie.id} />
      ))}
    </div>
  )
}

export default RecommendationBox