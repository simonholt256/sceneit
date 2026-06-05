import { useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";
import NoFilms from "../PlaceHolders/NoFilms";

function WatchNamesByGenre() {
  const { toWatch } = useMovieContext();
  const { openInfoModal } = useModalContext();

  const [openGenres, setOpenGenres] = useState(() => {
    const initial = {};

    toWatch.forEach(movie => {
      (movie.genre_ids || []).forEach(id => {
        initial[id] = true;
      });
    });

    return initial;
  });

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

  if (!toWatch || toWatch.length === 0) {
    return <NoFilms state="To Watch" />;
  }

  // GROUP BY GENRE
  const grouped = {};

  toWatch.forEach(movie => {
    (movie.genre_ids || []).forEach(id => {
      if (!grouped[id]) {
        grouped[id] = [];
      }
      grouped[id].push(movie);
    });
  });

  const sortedGenres = Object.keys(grouped).sort((a, b) => {
    const nameA = genreMap[a] || "";
    const nameB = genreMap[b] || "";
    return nameA.localeCompare(nameB);
  });

  function toggleGenre(id) {
    setOpenGenres(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  return (
    <div className="watch-by-genre-box">
      
      {sortedGenres.map(genreId => {
        const isOpen = openGenres[genreId];

        return (
          <div key={genreId} className="genre-group">

            <h3
              onClick={() => toggleGenre(genreId)}
              style={{ cursor: "pointer" }}
              className="to-watch-genre-title"
            >
              {genreMap[genreId] || "Unknown"} {isOpen ? "▲" : "▼"}
            </h3>

            {isOpen && (
              <div className="">
                {grouped[genreId].map(movie => (
                  <div
                    key={movie.id}
                    className="movie-titles"
                    onClick={() => openInfoModal(movie)}
                    style={{ cursor: "pointer" }}
                  >
                    - {movie.title}
                  </div>
                ))}
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}

export default WatchNamesByGenre;