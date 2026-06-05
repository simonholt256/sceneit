import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";
import NoFilms from "../PlaceHolders/NoFilms";

function SeenNames() {
  const {seen} = useMovieContext();
  const { openInfoModal } = useModalContext();

    if (!seen || seen.length === 0) {
      return <NoFilms state="Seen" />;
    }

    if (seen) {
        return (
            <div>
                <h2>SEEN LIST</h2>
                <div className='seen'></div>
                <div className="movie-grid">
                    {[...seen].slice().reverse().map((movie) => (
                        <div
                            key={movie.id}
                            className="seen-names-box"
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
            <NoFilms state="Seen"/>
        </>
    )
}

export default SeenNames