import { useMovieContext } from "../contexts/MovieContext";
import DeckFilmCard from "../components/Cards/DeckFilmCard";

function Deck() {
  const { deck } = useMovieContext();

  return (
    <>
      <div className="mobile__page-title-box">
        <div>Culture Deck</div>
        <div>Deck</div>
      </div>

      <div className="deck__container">
        {deck.length > 0 ? (
          deck.map((movie, i) => (
            <DeckFilmCard
              key={movie.movie_id}
              movie={movie}
              index={i}
            />
          ))
        ) : (
          <p>No films in your deck.</p>
        )}
      </div>
    </>
  );
}

export default Deck;