import { useMovieContext} from "../contexts/SeenContext"
import { useToWatchContext } from "../contexts/ToWatchContext"

function FilmCard({movie}){
    const {isSeen, addToSeen, removeFromSeen} = useMovieContext()
    const seen = isSeen(movie.id)


    function seenFilm(e){
        e.preventDefault()
        if (seen) {
            removeFromSeen(movie.id)
            
        } else {
            addToSeen(movie)
            
        } 

        
    }

    const {isToWatch, addToToWatch, removeFromToWatch} = useToWatchContext()
    const toWatch = isToWatch(movie.id)

    function toWatchFilm(e){
        e.preventDefault()
        if (toWatch) removeFromToWatch(movie.id)
            else addToToWatch(movie)
    }


    return(
        <div className="film-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="film-img">
            </img>
            <div className="title-font">{movie.title}</div>
            <div>{movie.release_date?.split("-")[0]}</div>
            <div className="button-box">
                <button className={`seen-button ${seen ? "have-seen" : "" }`} onClick={seenFilm}>Seen it</button>
                <button className={`to-watch-button ${toWatch ? "on-to-watch-list" : "" }`} onClick={toWatchFilm}>I want to see it</button>
            </div>
            
        </div>
    )
}

export default FilmCard