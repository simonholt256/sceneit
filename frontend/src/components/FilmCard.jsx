import { useState } from "react"
import { useMovieContext} from "../contexts/SeenContext"
import { useToWatchContext } from "../contexts/ToWatchContext"
import { getMovieCredits, getRecommendedMovies } from "../services/api"
import { createPortal } from "react-dom"

import ToWatchIcon from "../assets/icons/ticket.png"
import SeenIcon from "../assets/icons/eye.png"
import RateIcon from "../assets/icons/rate.png"

import NoPoster from "../assets/default/noposter.png"




function FilmCard({movie}){

    const [showInfoModal, setShowInfoModal] = useState(false)
    const [showRateModal, setShowRateModal] = useState(false)
    const [rating, setRating] = useState(0)
    const [cast, setCast] = useState([])
    const [director, setDirector] = useState("")
    const [recommendations, setRecommendations] = useState([])

    const {isSeen, addToSeen, removeFromSeen} = useMovieContext()
    const seen = isSeen(movie.id)

    const genreMap = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    }

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

    async function openInfoModal(e) {
        e.preventDefault()

        setShowInfoModal(true)

        const credits = await getMovieCredits(movie.id)

        setCast(credits.cast)
        setDirector(credits.director)

        const recommendedMovies = await getRecommendedMovies(movie.id)

        setRecommendations(recommendedMovies)
    }

     function openRatingModal(e) {
        e.preventDefault()
        setShowRateModal(true)
    }

    function submitRating() {
        console.log("Movie:", movie.title)
        console.log("Rating:", rating)

        addToSeen(movie, rating)

        setShowRateModal(false)
    }



    return(
        <div className="film-card">
            <img src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : NoPoster
                }
              alt={movie.title} className="film-img" onClick={openInfoModal}>
            </img>
            <div className="title-box">
              <div className="title-font" onClick={openInfoModal}>{movie.title} </div>
              <div>{movie.release_date?.split("-")[0]}</div>
            </div>
            
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
            {showInfoModal &&
              createPortal(
                <div className="modal-overlay">
                  <div className="info-modal">
                    <div className="stats-image-box">
                      <div>
                        <img src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : NoPoster
                            }
                            alt={movie.title} className="modal-film-img" onClick={openInfoModal}>
                        </img>
                      </div>
                      <div className="info-modal-stats">
                        <h2>{movie.title}</h2>
                        <h3>
                          Release:{" "}
                          {new Date(movie.release_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </h3>
                        <p>
                          Genres:{" "}
                          {movie.genre_ids
                            .map((id) => genreMap[id])
                            .join(", ")}
                        </p>
                        <p>
                          Cast: {cast.slice(0, 4).map(actor => actor.name).join(", ")}
                        </p>
                        <p>Director: {director}</p>
                        <p>Overview: {movie.overview}</p>
                        
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
                      </div>
                    </div>
                    <div className="recommendations">
                      {recommendations.slice(0, 5).map((movie, index) => (
                        <div className="recommendation" key={`${movie.id}-${index}`}>
                          
                          <img
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : NoPoster
                            }
                            alt={movie.title}
                            className="recommendation-img"
                          />
                          <p>{movie.title}</p>
                        </div>
                        
                      ))}
                    </div>
                    
                    <button className="close-button" onClick={() => setShowInfoModal(false)}>X</button>
                  </div>
                </div>,
                document.body
              )
            }
            {showRateModal &&
              createPortal(
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

                    <button onClick={() => setShowRateModal(false)}>
                      Close
                    </button>

                  </div>
                </div>,
                document.body
              )
            }
            
        </div>
    )
}

export default FilmCard