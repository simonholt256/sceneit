import { useState } from "react";

import NoFilms from "../components/PlaceHolders/NoFilms"
import { useMovieContext } from "../contexts/MovieContext"
import FilmCard from "../components/Cards/FilmCard"

import DeckBox from "../components/Boxes/DeckBox"

import SeenNames from "../components/Lists/SeenNames" 



function Seen() {
    const {seen} = useMovieContext();
    const [selectedReviewMovie, setSelectedReviewMovie] = useState(null);

    const ratedMovies = seen?.filter(movie => movie.userRating > 0) || [];
    const unratedMovies = seen?.filter(movie => movie.userRating === 0) || [];


    if (!seen || seen.length === 0) {
        return <NoFilms state="Seen" />;
    }

    return (
        <div>
            <h2>Seen</h2>
            <div className="seen-layout">
              <SeenNames/>
              <div className="seen__display-container">
                
                
                <DeckBox onSelectReview={setSelectedReviewMovie} />
                <div> Review box </div>
                <div className="deck-review-container">
                  <div className="review-text-box">
                    {selectedReviewMovie ? (
                      <>
                        <h3>{selectedReviewMovie.title}</h3>

                        <p>
                          Rating: {selectedReviewMovie.userRating}/10
                        </p>

                        <p>
                          {selectedReviewMovie.review || "No review written."}
                        </p>
                      </>
                    ) : (
                      <p>Select a review to view.</p>
                    )}
                </div>
                </div>
                <h3 className="split-by-title">Rated</h3>
                <div className="seen-page-boxes">
                    {ratedMovies.map(movie => (
                        <div className="review-card-box" key={movie.id}>
                            <FilmCard movie={movie} />
                            <button onClick={() => setSelectedReviewMovie(movie)}>
                                Your Review
                            </button>
                            {/* <div>Your rating: {movie.userRating}/10</div>
                            {movie.review && (
                                <div>Your review: {movie.review}</div>
                            )} */}
                        </div>
                    ))}
                </div>

                <h3 className="split-by-title">Unrated</h3>
                <div className="seen-page-boxes">
                    {unratedMovies.map(movie => (
                        <div key={movie.id}>
                            <FilmCard movie={movie} />
                            <div>No rating</div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
            
            
        </div>
    );

}

export default Seen