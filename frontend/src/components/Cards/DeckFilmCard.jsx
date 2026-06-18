import { useState } from "react"
import { useMovieContext } from "../../contexts/MovieContext";
import { getPoster } from "../../utils/poster";
import NoPoster from "../../assets/default/noposter.png"
import CardBack from "../../assets/default/cardbackplaceholder.png"


function DeckFilmCard({ index, onSelectReview }){

  const { deck, getSeenMovie } = useMovieContext();
  

  const movieId = deck[index];
  const movie = movieId ? getSeenMovie(movieId) : null;


  return (
    <div className="deck-film-card">
      {movie ? (
        <>
          <img
            src={getPoster(movie)}
            alt={movie.title}
            className="deck-film-card__img"
            onClick={() => movie && onSelectReview(movie)}
          />
          {/* <div>{movie.title}</div> */}
          {/* <div>{movie.review}</div> */}
        </>
        
      ) : (
        <img src={CardBack} className="deck-film-card__cardback" />
      )}
    </div>
  );
}

export default DeckFilmCard