import NoFilms from "../components/PlaceHolders/NoFilms"
import { useMovieContext } from "../contexts/MovieContext"
import FilmCard from "../components/Cards/FilmCard"

import SeenNames from "../components/Lists/SeenNames" 

import DeckFilmCard from "../components/Cards/DeckFilmCard"

function Seen() {
    const {seen} = useMovieContext();

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
                
                
                <div className="deck-container">
                  <DeckFilmCard/>
                  <DeckFilmCard/>
                  <DeckFilmCard/>
                  <DeckFilmCard/>
                  <DeckFilmCard/>
                </div>
                <div> Review box </div>
                <div className="deck-review-container">
                  <div className="review-text-box">Review</div>
                </div>
                <h3>Rated</h3>
                <div className="seen-page-boxes">
                    {ratedMovies.map(movie => (
                        <div className="review-card-box" key={movie.id}>
                            <FilmCard movie={movie} />
                            <div>Your rating: {movie.userRating}/10</div>
                            {movie.review && (
                                <div>Your review: {movie.review}</div>
                            )}
                        </div>
                    ))}
                </div>

                <h3>Unrated</h3>
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