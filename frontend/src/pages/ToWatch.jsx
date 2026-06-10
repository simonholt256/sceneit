import { useState, useRef } from "react";

import NoFilms from "../components/PlaceHolders/NoFilms";
import { useMovieContext } from "../contexts/MovieContext";
import FilmCard from "../components/Cards/FilmCard";
import WatchNames from "../components/Lists/WatchNames";

function ToWatch() {

  const { toWatch } = useMovieContext();
  const [view, setView] = useState("genre");

  const scrollRefs = useRef({});

  const scroll = (key, dir) => {
    scrollRefs.current[key]?.scrollBy({
      left: dir * scrollRefs.current[key].clientWidth - 90,
      behavior: "smooth",
    });
  };

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

  // =========================
  // GROUP BY GENRE
  // =========================
  const groupedByGenre = {};

  toWatch.forEach(movie => {
    movie.genre_ids.forEach(id => {
      if (!groupedByGenre[id]) groupedByGenre[id] = [];
      groupedByGenre[id].push(movie);
    });
  });

  // =========================
  // GROUP BY PRIORITY
  // =========================
  const groupedByPriority = {
    urgent: [],
    soon: [],
    someday: [],
    none: []
  };

  toWatch.forEach(movie => {
    const p = movie.priority || "none";
    groupedByPriority[p].push(movie);
  });

  // =========================
  // GROUP BY CUSTOM TAG
  // =========================
  const groupedByCustom = {};

  toWatch.forEach(movie => {
    const c = movie.custom || "none";

    if (!groupedByCustom[c]) {
      groupedByCustom[c] = [];
    }

    groupedByCustom[c].push(movie);
  });

  return (
    <div>
      <div className="to-watch-layout">

        <div>
          <WatchNames
            view={view}
            groupedByGenre={groupedByGenre}
            groupedByPriority={groupedByPriority}
            groupedByCustom={groupedByCustom}
            genreMap={genreMap}
          />
        </div>

        <div>

          {/* VIEW SWITCH */}
          <div className="to-watch__display-button-box">
            <button className="button" onClick={() => setView("genre")}>Genre</button>
            <button className="button" onClick={() => setView("priority")}>Priority</button>
            <button className="button" onClick={() => setView("custom")}>Custom</button>
          </div>

          <div className="to-watch__display-container">

            <div className="to-watch__selected-title">
              {view.toUpperCase()}
            </div>

            <div className="to-watch__display-case">

              {/* ================= GENRE VIEW ================= */}
              {view === "genre" &&
                Object.entries(groupedByGenre).map(([genreId, movies]) => (
                  <div key={genreId} className="scroll-wrapper">
                    <h3 id={`genre-${genreId}`} className="split-by-title">
                      {genreMap[genreId]} - {movies.length}
                    </h3>
                    <div className="arrows-box">
                      <button
                        className="scroll-arrow left"
                        onClick={() => scroll(`genre-${genreId}`, -1)}
                      >
                        ◀
                      </button>

                      <div
                        className="to-watch__movie-grid scroll-row"
                        ref={(el) =>
                          (scrollRefs.current[`genre-${genreId}`] = el)
                        }
                      >
                        {movies.map(movie => (
                          <FilmCard
                            key={`${genreId}-${movie.id}`}
                            movie={movie}
                          />
                        ))}
                      </div>

                      <button
                        className="scroll-arrow right"
                        onClick={() => scroll(`genre-${genreId}`, 1)}
                      >
                        ▶
                      </button>
                    </div>   
                  </div>
                ))
              }

              {/* ================= PRIORITY VIEW ================= */}
              {view === "priority" &&
                Object.entries(groupedByPriority).map(([priority, movies]) => (
                  <div key={priority} className="scroll-wrapper">

                    <h3 id={`priority-${priority}`} className="split-by-title">
                      {priority} - {movies.length}
                    </h3>

                    <div className="arrows-box">

                      <button
                        className="scroll-arrow left"
                        onClick={() => scroll(`priority-${priority}`, -1)}
                      >
                        ◀
                      </button>

                      <div
                        className="to-watch__movie-grid scroll-row"
                        ref={(el) =>
                          (scrollRefs.current[`priority-${priority}`] = el)
                        }
                      >
                        {movies.map(movie => (
                          <FilmCard
                            key={`${priority}-${movie.id}`}
                            movie={movie}
                          />
                        ))}
                      </div>

                      <button
                        className="scroll-arrow right"
                        onClick={() => scroll(`priority-${priority}`, 1)}
                      >
                        ▶
                      </button>

                    </div>

                  </div>
                ))
              }

              {/* ================= CUSTOM VIEW ================= */}
              {view === "custom" &&
                Object.entries(groupedByCustom).map(([tag, movies]) => (
                  <div key={tag} className="scroll-wrapper">

                    <h3 id={`custom-${tag}`} className="split-by-title">
                      {tag} - {movies.length}
                    </h3>

                    <div className="arrows-box">

                      <button
                        className="scroll-arrow left"
                        onClick={() => scroll(`custom-${tag}`, -1)}
                      >
                        ◀
                      </button>

                      <div
                        className="to-watch__movie-grid scroll-row"
                        ref={(el) =>
                          (scrollRefs.current[`custom-${tag}`] = el)
                        }
                      >
                        {movies.map(movie => (
                          <FilmCard
                            key={`${tag}-${movie.id}`}
                            movie={movie}
                          />
                        ))}
                      </div>

                      <button
                        className="scroll-arrow right"
                        onClick={() => scroll(`custom-${tag}`, 1)}
                      >
                        ▶
                      </button>

                    </div>

                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToWatch;