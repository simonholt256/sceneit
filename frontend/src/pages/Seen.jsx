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
                        <FilmCard movie={movie} key={movie.id}/>
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