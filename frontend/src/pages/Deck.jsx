import { useMovieContext } from "../contexts/MovieContext";
import DeckFilmCard from "../components/Cards/DeckFilmCard"


function Deck() {
  // const { deck, getSeenMovie } = useMovieContext();

  // const movieId = deck[index];
  // const movie = movieId ? getSeenMovie(movieId) : null;

  return (
    <>
      <div className="mobile__page-title-box">
        <div>Culture Deck</div>
        <div>Deck</div>
      </div>
      <div className="deck__container ">
        {[0, 1, 2, 3, 4].map((i) => (
          <DeckFilmCard key={i} index={i}/>
        ))}
        
      </div>
    </>
    
  )
}

export default Deck