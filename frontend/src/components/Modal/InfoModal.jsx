import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../../contexts/ModalContext";
import { useMovieContext } from "../../contexts/MovieContext";
import { getMovieCredits, getRecommendedMovies } from "../../services/movieServices";
import { getPoster } from "../../utils/poster";

import NoPoster from "../../assets/default/noposter.png";
import ToWatchIcon from "../../assets/icons/ticket.png";
import Priority from "../../assets/icons/priority.png"
import SeenIcon from "../../assets/icons/eye.png";
import RateIcon from "../../assets/icons/rate.png";

function InfoModal() {

    const { openInfoModal } = useModalContext();

    const {
        selectedMovie,
        isInfoOpen,
        closeInfoModal,
        openRatingModal,
        openPriorityModal
    } = useModalContext();

    const {
        isSeen,
        addToSeen,
        removeFromSeen,
        isToWatch,
        addToToWatch,
        removeFromToWatch,
        getSeenMovie,
        isInDeck,
        addToDeck,
        removeFromDeck,
    } = useMovieContext();

    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const seen = selectedMovie ? isSeen(selectedMovie.id) : false;
    const toWatch = selectedMovie ? isToWatch(selectedMovie.id) : false;
    const inDeck = selectedMovie ? isInDeck(selectedMovie.id) : false;

    useEffect(() => {
        if (!selectedMovie) return;

        let isMounted = true;

        async function loadData() {
            setLoading(true);

            const credits = await getMovieCredits(selectedMovie.id);
            const recs = await getRecommendedMovies(selectedMovie.id);

            if (!isMounted) return;

            setCast(credits.cast || []);
            setDirector(credits.director || "");
            setRecommendations(recs || []);
            setLoading(false);
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, [selectedMovie]);

    if (!isInfoOpen || !selectedMovie) return null;

    if (loading) {
        return createPortal(
            <div className="modal-overlay">
                <div className="info-modal">
                    <p>Loading...</p>
                    <button onClick={closeInfoModal}>Close</button>
                </div>
            </div>,
            document.body
        );
    }

    function handleSeen() {
      if (seen) {
        removeFromSeen(selectedMovie.id);
      } else {
        addToSeen(selectedMovie.id, 0);
      }
    }

    function handleToWatch() {
      if (toWatch) {
        removeFromToWatch(selectedMovie.id);
      } else {
        addToToWatch(selectedMovie.id);
      }
    }

    function handleDeck() {
      if (!selectedMovie) return;

      if (inDeck) {
        removeFromDeck(selectedMovie.id);
      } else {
        addToDeck(selectedMovie.id);
      }
    }

    return createPortal(
        <div className="modal-overlay">
            <div className="info-modal">
              
                <div className="stats-image-box">
                    <div className="info-modal__poster-box">
                      <img
                          src={getPoster(selectedMovie)}
                          alt={selectedMovie.title}
                          className="modal-film-img"
                      />
                    </div>

                    <div className="info-modal-stats">

                        <h2 className="info-modal__title">{selectedMovie.title}</h2>

                        <h3>
                            Release:{" "}
                            {new Date(selectedMovie.release_date).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </h3>

                        <p>
                            Cast: {cast.slice(0, 4).map(a => a.name).join(", ")}
                        </p>

                        <p>Director: {director}</p>

                        <p className="info-modal__overview">Overview: {selectedMovie.overview}</p>

                        <div className="info-modal__button-box">

                            <div className="rate-box">
                              <button
                                  className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : ""}`}
                                  onClick={handleToWatch}
                              >
                                  <img className="card-icon" src={ToWatchIcon} />
                              </button>
            
                              <button
                                  className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : ""}`}
                                  onClick={() => openPriorityModal(selectedMovie, getSeenMovie(selectedMovie.id))}
                              >
                                  <img className="card-icon" src={Priority} />
                              </button>

                              
                            </div>

                            <div className="rate-box">
                              <button
                                  className={`seen-button card-button ${seen ? "have-seen" : ""}`}
                                  onClick={handleSeen}
                              >
                                  <img src={SeenIcon} className="card-icon" />
                              </button>

                              <button
                                  className={`rate-button card-button ${seen ? "have-seen" : ""}`}
                                  onClick={() => openRatingModal(selectedMovie, getSeenMovie(selectedMovie.id))}
                              >
                                  <img src={RateIcon} className="card-icon" />
                              </button>
                              {seen && (
                                <button
                                  className={`card-button deck-button ${inDeck ? "in-deck" : ""}`}
                                  onClick={handleDeck}
                                >
                                  Deck
                                </button>
                              )}
                              
                            </div>



                        </div>

                    </div>
                </div>
                <div className="info-modal__mobile-button-box">

                  <div className="rate-box">
                    <button
                        className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : ""}`}
                        onClick={handleToWatch}
                    >
                        <img className="card-icon" src={ToWatchIcon} />
                    </button>
  
                    <button
                        className={`to-watch-button card-button ${toWatch ? "on-to-watch-list" : ""}`}
                        onClick={() => openPriorityModal(selectedMovie, getSeenMovie(selectedMovie.id))}
                    >
                        <img className="card-icon" src={Priority} />
                    </button>

                    
                  </div>

                  <div className="rate-box">
                    <button
                        className={`seen-button card-button ${seen ? "have-seen" : ""}`}
                        onClick={handleSeen}
                    >
                        <img src={SeenIcon} className="card-icon" />
                    </button>

                    <button
                        className={`rate-button card-button ${seen ? "have-seen" : ""}`}
                        onClick={() => openRatingModal(selectedMovie, getSeenMovie(selectedMovie.id))}
                    >
                        <img src={RateIcon} className="card-icon" />
                    </button>
                    {seen && (
                      <button
                        className={`card-button deck-button ${inDeck ? "in-deck" : ""}`}
                        onClick={handleDeck}
                      >
                        Deck
                      </button>
                    )}
                    
                  </div>



              </div>
                <div className="recommendations">
                    {recommendations.slice(0, 5).map(movie => (
                        <div
                            key={movie.id}
                            className="recommendation"
                            onClick={() => openInfoModal(movie)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={getPoster(movie)}
                                alt={movie.title}
                                className="recommendation-img"
                            />
                            <p className="info-modal__recommendation-title">{movie.title}</p>
                        </div>
                    ))}
                </div>

                <button className="close-button" onClick={closeInfoModal}>
                    X
                </button>

            </div>
        </div>,
        document.body
    );
}

export default InfoModal;