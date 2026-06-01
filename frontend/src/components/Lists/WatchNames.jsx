import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";
import NoFilms from "../PlaceHolders/NoFilms";

function WatchNames() {
  const {toWatch} = useMovieContext();
  const { openInfoModal } = useModalContext();

    if (!toWatch || toWatch.length === 0) {
      return <NoFilms state="To Watch" />;
    }

    if (toWatch) {
        return (
            <div>
                <h2>To Wacth List</h2>
                <div className="movie-grid">
                    {toWatch.map((movie) => (
                      <div
                          key={movie.id}
                          className="watch-names-box"
                          onClick={() => openInfoModal(movie)}
                          style={{ cursor: "pointer" }}
                      >
                          - {movie.title}
                      </div>
                        
                    ))}
                </div>
            </div>
            
        )
    }

    return (
        <>
            <NoFilms state="To watch"/>
        </>
    )
}

export default WatchNames