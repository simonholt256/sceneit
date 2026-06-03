import { useState } from "react"
import { useMovieContext } from "../../contexts/MovieContext";
import CardBack from "../../assets/default/cardbackplaceholder.png"


function DeckFilmCard({index}){

  const { deck } = useMovieContext();
  const movie = deck[index];

  return (
    <div className="deck-film-card">
      {movie ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="deck-card-img"
        />
      ) : (
        <img src={CardBack} className="cardback" />
      )}
    </div>
  );
}

export default DeckFilmCard