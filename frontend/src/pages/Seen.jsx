import { useState, useRef } from "react";

import NoFilms from "../components/PlaceHolders/NoFilms";
import { useMovieContext } from "../contexts/MovieContext";
import { useModalContext } from "../contexts/ModalContext";
import FilmCard from "../components/Cards/FilmCard";

import DeckBox from "../components/Boxes/DeckBox";
import SeenNames from "../components/Lists/SeenNames";

function Seen() {
  const { seen, getSeenMovie } = useMovieContext();
  const { openRatingModal } = useModalContext();

  const [selectedReviewMovie, setSelectedReviewMovie] = useState(null);
  const [view, setView] = useState("rated");

  function sortTitle(title) {
    return title.replace(/^(the|a|an)\s+/i, "");
  }

  const listRef = useRef(null);

  const scrollRight = () => {
    listRef.current?.scrollBy({
      left: listRef.current.clientWidth - 90,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    listRef.current?.scrollBy({
      left: -listRef.current.clientWidth - 90,
      behavior: "smooth",
    });
  };

  // -------------------------
  // SPLIT LISTS
  // -------------------------
  const ratedMovies = (seen || [])
    .filter(movie => movie.userRating > 0)
    .sort((a, b) =>
      sortTitle(a.title).localeCompare(sortTitle(b.title))
    );

  const unratedMovies = (seen || [])
    .filter(movie => movie.userRating === 0)
    .sort((a, b) =>
      sortTitle(a.title).localeCompare(sortTitle(b.title))
    );

  // -------------------------
  // GROUP FUNCTION (reusable)
  // -------------------------
  const groupByLetter = (list) => {
    return list.reduce((acc, movie) => {
      const clean = sortTitle(movie.title);
      const letter = clean.charAt(0).toUpperCase();

      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(movie);

      return acc;
    }, {});
  };

  const groupedRated = groupByLetter(ratedMovies);
  const groupedUnrated = groupByLetter(unratedMovies);

  // -------------------------
  // ACTIVE VIEW DATA
  // -------------------------
  const grouped = view === "rated" ? groupedRated : groupedUnrated;
  const availableLetters = new Set(Object.keys(grouped));
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // -------------------------
  // EMPTY STATE
  // -------------------------
  if (!seen || seen.length === 0) {
    return <NoFilms state="Seen" />;
  }

  console.log(" 🔥🔥🔥 SEEN RAW:", seen);

  return (
    <div>
      <div className="mobile__page-title-box">
        <div>Culture Deck</div>
        <div>Seen</div>
      </div>
      <div className="seen__layout">
        <SeenNames />

        <div className="seen__display-container">

          <DeckBox onSelectReview={setSelectedReviewMovie} />

          <div className="deck-review-container">
            <div className="review-text-box">
              {selectedReviewMovie ? (
                <>
                  <h3>{selectedReviewMovie.title}</h3>
                  <p>Rating: {selectedReviewMovie.userRating}/10</p>
                  <p>{selectedReviewMovie.review || "No review written."}</p>
                </>
              ) : (
                <p>Select a review to view.</p>
              )}
            </div>
          </div>

          {/* ---------------- VIEW SWITCH ---------------- */}

          <h3 className="seen__split-by-title">
            <button onClick={() => setView("rated")}>
              Rated ({ratedMovies.length})
            </button>
            {view === "rated" ? "Rated" : "Unrated"}
            <button onClick={() => setView("unrated")}>
              Unrated ({unratedMovies.length})
            </button>
          </h3>

          {/* ---------------- ALPHABET ---------------- */}
          <div className="alphabet-nav">
            {alphabet.map(letter => {
              const active = availableLetters.has(letter);

              return (
                <button
                  key={letter}
                  disabled={!active}
                  className={`alphabet ${active ? "active-letter" : "disabled-letter"}`}
                  onClick={() => {
                    if (!active) return;

                    document
                      .getElementById(`letter-${letter}`)
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "start"
                      });
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* ---------------- LIST ---------------- */}
          <div className="seen__scroll-wrapper">

            <button
              className="scroll-arrow left"
              onClick={scrollLeft}
            >
              ◀
            </button>

            <div
              className="seen-page-boxes"
              ref={listRef}
            >

              {Object.keys(grouped)
                .sort()
                .map(letter => (
                  <div
                    key={letter}
                    className="letter-container"
                  >
                    <div
                      id={`letter-${letter}`}
                      className="letter-divider"
                    >
                      {letter}
                    </div>
                    {grouped[letter]
                      .sort((a, b) =>
                        sortTitle(a.title).localeCompare(
                          sortTitle(b.title)
                        )
                      )
                      .map(movie => (
                        <div
                          key={movie.id}
                          className="review-card-box"
                        >
                          <FilmCard movie={movie} />

                          {view === "rated" ? (
                            <button
                              onClick={() =>
                                setSelectedReviewMovie(movie)
                              }
                            >
                              Your Review
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                openRatingModal(
                                  movie,
                                  getSeenMovie(movie.id)
                                )
                              }
                            >
                              Rate/Review
                            </button>
                          )}

                          <div>{movie.id}</div>
                        </div>
                      ))}

                  </div>
                ))}

            </div>

            <button
              className="scroll-arrow right"
              onClick={scrollRight}
            >
              ▶
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Seen;