import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";

import ToWatchIcon from "../../assets/icons/ticket.png";
import Priority from "../../assets/icons/priority.png"
import SeenIcon from "../../assets/icons/eye.png";
import RateIcon from "../../assets/icons/rate.png";

import NoPoster from "../../assets/default/noposter.png"

function FilmCard({ movie }) {

    const {
        isSeen,
        addToSeen,
        removeFromSeen,
        getSeenMovie,
        isToWatch,
        addToToWatch,
        removeFromToWatch
    } = useMovieContext();

    const {
        openInfoModal,
        openRatingModal,
        openPriorityModal
    } = useModalContext();

    const seen = isSeen(movie.id);
    const toWatch = isToWatch(movie.id);

    function seenFilm(e) {
        e.preventDefault();

        if (seen) {
            removeFromSeen(movie.id);
        } else {
            addToSeen(movie, 0);
        }
    }

    function toWatchFilm(e) {
        e.preventDefault();

        if (toWatch) {
            removeFromToWatch(movie.id);
        } else {
            addToToWatch(movie);
        }
    }

    return (
        <div className="film-card">
            <div className="film-img-box">
              { movie.poster_path ?
              (<img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="film-img"
                  onClick={() => openInfoModal(movie)}
              />
              ) : (
              <img
                  src={NoPoster}
                  alt={movie.title}
                  className="film-img"
                  onClick={() => openInfoModal(movie)}
              />
              )}
              
              <div
                  className="title-font"
                  onClick={() => openInfoModal(movie)}
              >
                  {movie.title}
                  <div className="title-font__date">{movie.release_date?.split("-")[0]}</div>
                  
              </div>
              
            </div>
            

            <div className="title-box">
                
                <div className="date-display">{movie.release_date?.split("-")[0]}</div>
            </div>
            <div className="button-box">
                <div className="rate-box">
                  <button
                      className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : ""}`}
                      onClick={toWatchFilm}
                  >
                      <img className="card-icon" src={ToWatchIcon} />
                  </button>

                  <button
                      className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : ""}`}
                      onClick={() => openPriorityModal(movie)}
                  >
                      <img className="card-icon" src={Priority} />
                  </button>
                </div>
                

                <div className="rate-box">

                    <button
                        className={`seen-button card-button ${seen ? "have-seen" : ""}`}
                        onClick={seenFilm}
                    >
                        <img className="card-icon" src={SeenIcon} />
                    </button>

                    <button
                        className={`rate-button card-button ${seen ? "have-seen" : ""}`}
                        onClick={() =>
                            openRatingModal(movie, getSeenMovie(movie.id))
                        }
                    >
                        <img className="card-icon" src={RateIcon} />
                    </button>

                </div>

            </div>

        </div>
    );
}

export default FilmCard;