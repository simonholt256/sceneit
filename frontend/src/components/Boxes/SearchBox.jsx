import FilmCard from "../Cards/FilmCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../../services/api";

function SearchBox() {
    const [searchQuery, setSearchQuery] = useState("");
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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
        
        setSearchQuery("");
    };

    return(
        <div className="search-card-back">
          <div className="search-form-box">
            <h3 className="search-title">Search</h3>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">Search</button>
            </form>
          </div>
          
          

            {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="search-movie-grid">
              {movies.slice(0, 9).map((movie) => (
                <FilmCard movie={movie} key={movie.id}/>
              ))}
            </div>
          )}    
        </div>
    );
}

export default SearchBox