import NoFilms from "../components/NoFilms"
import { useMovieContext } from "../contexts/SeenContext"
import FilmCard from "../components/FilmCard"

function Seen() {
    const {seen} = useMovieContext();

    if (seen) {
        return (
            <div>
                <h2>Watched List</h2>
                <div className="movie-grid">
                    {seen.map((movie) => (
                      <div key={movie.id}>
                        <FilmCard movie={movie} />
                        {movie.userRating === 0 ? 
                        ("No rating") : ( <div>Your rating: {movie.userRating}/10</div>)
                        }
                        
                      </div>
                        
                    ))}
                </div>
            </div>
            
        )
    }

    return (
        <>
            <NoFilms state="Seen"/>
        </>
    )
}

export default Seen