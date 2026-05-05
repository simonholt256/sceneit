import NoFilms from "../components/NoFilms"
import { useToWatchContext } from "../contexts/ToWatchContext";
import FilmCard from "../components/FilmCard"

function ToWatch() {
    const {toWatch} = useToWatchContext();

    if (toWatch) {
        return (
            <div>
                <h2>To Wacth List</h2>
                <div className="movie-grid">
                    {toWatch.map((movie) => (
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

export default ToWatch