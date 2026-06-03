import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

  // =========================
  // SEEN (watch history only)
  // =========================
  const [seen, setSeen] = useState(() => {
    const stored = localStorage.getItem("seen");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("seen", JSON.stringify(seen));
  }, [seen]);

  const addToSeen = (movie, rating, review = "") => {
    setSeen(prev => {
      const exists = prev.some(m => m.id === movie.id);

      if (exists) {
        return prev.map(m =>
          m.id === movie.id
          ? {
            ...m,
            userRating: rating,
            review
          }
          : m
        );
      }

      return [
        ...prev,
        {
          ...movie,
          userRating: rating,
          review
        }
      ];
    });
  };

    const removeFromSeen = (movieId) => {
        setSeen(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isSeen = (movieId) => {
        return seen.some(movie => movie.id === movieId);
    };

    const getSeenMovie = (movieId) => {
        return seen.find(movie => movie.id === movieId);
    };

    // =========================
    // TO WATCH (planning system)
    // =========================
    const [toWatch, setToWatch] = useState(() => {
        const stored = localStorage.getItem("to-watch");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("to-watch", JSON.stringify(toWatch));
    }, [toWatch]);

    const addToToWatch = (movie, priority = "", custom = "") => {
        setToWatch(prev => {
            const exists = prev.some(m => m.id === movie.id);

            if (exists) {
                return prev.map(m =>
                    m.id === movie.id
                        ? {
                            ...m,
                            priority,
                            custom
                        }
                        : m
                );
            }

            return [
                ...prev,
                {
                    ...movie,
                    priority,
                    custom
                }
            ];
        });
    };

    const removeFromToWatch = (movieId) => {
        setToWatch(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isToWatch = (movieId) => {
        return toWatch.some(movie => movie.id === movieId);
    };

    const getToWatchMovie = (movieId) => {
        return toWatch.find(movie => movie.id === movieId);
    };

    // =========================
    // DECK
    // =========================

    const [deck, setDeck] = useState(() => {
      const stored = localStorage.getItem("deck");
      return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
      localStorage.setItem("deck", JSON.stringify(deck));
    }, [deck]);

    const addToDeck = (movieId) => {
      setDeck(prev => {
        if (prev.includes(movieId)) {
          return prev;
        }

        if (prev.length >= 5) {
          alert("Your deck already has 5 movies.");
          return prev;
        }

        return [...prev, movieId];
      });
    };

    const removeFromDeck = (movieId) => {
      setDeck(prev =>
        prev.filter(id => id !== movieId)
      );
    };

    const isInDeck = (movieId) => {
      return deck.includes(movieId);
    };


    // =========================
    // CONTEXT VALUE
    // =========================
    const value = {
        // Seen
        seen,
        addToSeen,
        removeFromSeen,
        isSeen,
        getSeenMovie,

        // To Watch
        toWatch,
        addToToWatch,
        removeFromToWatch,
        isToWatch,
        getToWatchMovie,

        // Deck
        deck,
        addToDeck,
        removeFromDeck,
        isInDeck,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};