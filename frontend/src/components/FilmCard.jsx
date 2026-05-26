import { useState } from "react"
import { useMovieContext} from "../contexts/SeenContext"
import { useToWatchContext } from "../contexts/ToWatchContext"

import ToWatchIcon from "../assets/icons/ticket.png"
import SeenIcon from "../assets/icons/eye.png"
import RateIcon from "../assets/icons/rate.png"

function FilmCard({movie}){

    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(0)

    const {isSeen, addToSeen, removeFromSeen} = useMovieContext()
    const seen = isSeen(movie.id)


    function seenFilm(e){
        e.preventDefault()
        if (seen) {
            removeFromSeen(movie.id)
            
        } else {
            addToSeen(movie, 0)
            
        } 

        
    }

    const {isToWatch, addToToWatch, removeFromToWatch} = useToWatchContext()
    const toWatch = isToWatch(movie.id)

    function toWatchFilm(e){
        e.preventDefault()
        if (toWatch) removeFromToWatch(movie.id)
            else addToToWatch(movie)
    }

     function openRatingModal(e) {
        e.preventDefault()
        setShowModal(true)
    }

    function submitRating() {
        console.log("Movie:", movie.title)
        console.log("Rating:", rating)

        addToSeen(movie, rating)

        setShowModal(false)
    }



    return(
        <div className="film-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="film-img">
            </img>
            <div className="title-font">{movie.title}</div>
            <div>{movie.release_date?.split("-")[0]}</div>
            <div className="button-box">
                <button className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : "" }`} onClick={toWatchFilm}>
                  <img className="card-icon" src={ToWatchIcon}></img>
                </button>
                <div className="rate-box">
                  <button className={`seen-button card-button ${seen ? "have-seen" : "" }`} onClick={seenFilm}>
                    <img className="card-icon" src={SeenIcon}></img>
                  </button>
                  <button className={`rate-button card-button ${seen ? "have-seen" : "" }`} onClick={openRatingModal}>
                    <img className="card-icon" src={RateIcon}></img>
                  </button>
                </div>
                
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h2>Rate {movie.title}</h2>

                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="0">Select rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>

                        <button onClick={submitRating}>
                            Save Rating
                        </button>

                        <button onClick={() => setShowModal(false)}>
                            Close
                        </button>

                    </div>
                </div>
            )}
            
        </div>
    )
}

export default FilmCard