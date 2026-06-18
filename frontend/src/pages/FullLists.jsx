import { useMovieContext } from "../contexts/MovieContext";
import { useModalContext } from "../contexts/ModalContext";

function FullLists() {
  const { toWatch, seen } = useMovieContext();
  const { openInfoModal } = useModalContext();

  function sortTitle(title) {
    return title.replace(/^(the|a|an)\s+/i, "");
  }

  const sortedToWatch = [...toWatch].sort((a, b) =>
    sortTitle(a.title).localeCompare(sortTitle(b.title))
  );

  const sortedSeen = [...seen].sort((a, b) =>
    sortTitle(a.title).localeCompare(sortTitle(b.title))
  );

  return (
    <>
      <div className="mobile__page-title-box">
        <div>Culture Deck</div>
        <div>Full Lists</div>
      </div>
      <h1>Full lists</h1>
      <div className="fulllists__layout">
        <div>
          <h3>To Watch Films</h3>
          {sortedToWatch.map((movie) => (
            <div key={movie.id}
            onClick={() => openInfoModal(movie)}>
              {movie.title}
            </div>
          ))}
        </div>
        <div>
          <h3>Seen Films</h3>
          {sortedSeen.map((movie) => (
            <div key={movie.id}
            onClick={() => openInfoModal(movie)}>
              {movie.title}
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default FullLists