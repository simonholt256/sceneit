import { useState } from "react"
// import { useMovieContext } from "../../contexts/MovieContext";
import { getMovieCredits, getRecommendedMovies } from "../../services/api"
import { createPortal } from "react-dom"

import ToWatchIcon from "../../assets/icons/ticket.png"
import SeenIcon from "../../assets/icons/eye.png"
import RateIcon from "../../assets/icons/rate.png"

import NoPoster from "../../assets/default/noposter.png"




function DeckFilmCard(){

  // const {seen} = useMovieContext();
  // const {watch} = useMovieContext();

  const exampleMovies = [
    {
      id: 1,
      title: "Inception",
      release_date: "2010-07-16",
      poster_path: null,
      genre_ids: [28, 878, 12],
      overview:
        "A skilled thief enters dreams to steal secrets and is offered a chance at redemption.",
      userRating: 9,
    },
    {
      id: 2,
      title: "Interstellar",
      release_date: "2014-11-07",
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      genre_ids: [12, 18, 878],
      overview:
        "A group of astronauts travel through a wormhole in search of a new home for humanity.",
      userRating: 10,
    },
    {
      id: 3,
      title: "The Dark Knight",
      release_date: "2008-07-18",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      genre_ids: [18, 28, 80],
      overview:
        "Batman faces the Joker, a criminal mastermind spreading chaos across Gotham.",
      userRating: 8,
    },
    {
      id: 4,
      title: "Blade Runner 2049",
      release_date: "2017-10-06",
      poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      genre_ids: [878, 18],
      overview:
        "A young blade runner uncovers a secret that could change society forever.",
      userRating: 0,
    },
    {
      id: 5,
      title: "Spirited Away",
      release_date: "2001-07-20",
      poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      genre_ids: [16, 14, 10751],
      overview:
        "A young girl enters a mysterious spirit world and must find her way home.",
      userRating: 0,
    },
  ];

  const seen = exampleMovies;

  const movie = exampleMovies[0];

    const [showInfoModal, setShowInfoModal] = useState(false)
    const [showRateModal, setShowRateModal] = useState(false)
    const [rating, setRating] = useState(0)
    const [cast, setCast] = useState([])
    const [director, setDirector] = useState("")
    const [recommendations, setRecommendations] = useState([])

    // const {isSeen, addToSeen, removeFromSeen} = useMovieContext()
    // const seen = isSeen(movie.id)

    

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

    // const {isToWatch, addToToWatch, removeFromToWatch} = useToWatchContext()
    // const toWatch = isToWatch(movie.id)

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
        <div className="deck-film-card">
            <img src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : NoPoster
                }
              alt={movie.title} className="deck-film-img" onClick={openInfoModal}>
            </img>
            <div className="title-box">
              <div className="title-font" onClick={openInfoModal}>{movie.title} </div>
              <div>{movie.release_date?.split("-")[0]}</div>
            </div>
            
            {/* <div className="button-box">
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
            </div> */}
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

export default DeckFilmCard