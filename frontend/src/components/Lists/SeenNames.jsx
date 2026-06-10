import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";
import NoFilms from "../PlaceHolders/NoFilms";

function SeenNames() {
  const { seen } = useMovieContext();
  const { openInfoModal } = useModalContext();

  function sortTitle(title) {
    return title.replace(/^(the|a|an)\s+/i, "");
  }

  if (!seen || seen.length === 0) {
    return <NoFilms state="Seen" />;
  }

  const sortedSeen = [...seen].sort((a, b) =>
    sortTitle(a.title).localeCompare(sortTitle(b.title))
  );

  return (
    <div>
      <h2>SEEN LIST</h2>

      <div className="seen-list__list">
        {sortedSeen.map((movie) => (
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
  );
}

export default SeenNames;