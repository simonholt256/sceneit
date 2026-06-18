import { useState } from "react";
import { Link } from "react-router-dom"

import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";
import NoFilms from "../PlaceHolders/NoFilms";

function SeenNames() {
  const { seen } = useMovieContext();
  const { openInfoModal } = useModalContext();
  const [view, setView] = useState("alphabet");

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const groupedGenres = {};

  seen.forEach(movie => {
    (movie.genre_ids || []).forEach(id => {
      if (!groupedGenres[id]) {
        groupedGenres[id] = [];
      }

      groupedGenres[id].push(movie);
    });
  });

  const sortedGenres = Object.keys(groupedGenres).sort((a, b) =>
    (genreMap[a] || "").localeCompare(genreMap[b] || "")
  );

  function sortTitle(title) {
    return title.replace(/^(the|a|an)\s+/i, "");
  }

  if (!seen || seen.length === 0) {
    return <NoFilms state="Seen" />;
  }

  const sortedSeen = [...seen].sort((a, b) =>
    sortTitle(a.title).localeCompare(sortTitle(b.title))
  );

  const groupedSeen = sortedSeen.reduce((groups, movie) => {
    const firstLetter = sortTitle(movie.title)
      .charAt(0)
      .toUpperCase();

    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }

    groups[firstLetter].push(movie);

    return groups;
  }, {});

  return (
    <div className="seennames">
      <h2>SEEN LIST</h2>
      <Link to="/fulllists" className="full-list-link">Full list</Link>
      <div className="seen-view-toggle">
        <button
          className={view === "alphabet" ? "active" : ""}
          onClick={() => setView("alphabet")}
        >
          Alphabet
        </button>

        <button
          className={view === "genre" ? "active" : ""}
          onClick={() => setView("genre")}
        >
          Genre
        </button>
      </div>

      {view === "alphabet" ? (
        <div className="seen-list__list">
          {Object.entries(groupedSeen).map(([letter, movies]) => (
            <details key={letter} className="seen-letter-group">
              <summary>
                {letter} ({movies.length})
              </summary>

              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="seen-names-box"
                  onClick={() => openInfoModal(movie)}
                  style={{ cursor: "pointer" }}
                >
                  - {movie.title}
                </div>
              ))}
            </details>
          ))}
        </div>
      ) : (
        <div className="seen-list__list">
          {sortedGenres.map(genreId => (
            <details key={genreId} className="seen-letter-group">
              <summary>
                {genreMap[genreId]} ({groupedGenres[genreId].length})
              </summary>

              {groupedGenres[genreId].map(movie => (
                <div
                  key={movie.id}
                  className="seen-names-box"
                  onClick={() => openInfoModal(movie)}
                >
                  - {movie.title}
                </div>
              ))}
            </details>
          ))}
        </div>
      )}

    </div>
  );
}

export default SeenNames;