import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const { user } = useAuth();

  const [seen, setSeen] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [deck, setDeck] = useState([]);

  // TMDB cache to avoid refetching the same movie
  const tmdbCache = useRef({});

  // =========================
  // TMDB FETCHER (with cache)
  // =========================
  const fetchTMDB = async (movieId) => {
    if (tmdbCache.current[movieId]) {
      return tmdbCache.current[movieId];
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    );

    const data = await res.json();
    tmdbCache.current[movieId] = data;
    return data;
  };

  // =========================
  // ENRICH DB ROWS WITH TMDB + SEEN DATA
  // =========================
  const enrichEntries = async (entries) => {
    const uniqueIds = [...new Set(entries.map((e) => e.movie_id))];

    // Fetch TMDB data in parallel
    await Promise.all(
      uniqueIds.map(async (id) => {
        if (!tmdbCache.current[id]) {
          await fetchTMDB(id);
        }
      })
    );

    // 🔧 Build lookup of seen entries
    const seenMap = new Map(
      entries
        .filter((e) => e.category === "seen")
        .map((e) => [e.movie_id, e])
    );

    // 🔧 Merge DB + TMDB + seen rating/review
    return entries.map((entry) => {
      const tmdb = tmdbCache.current[entry.movie_id] || {};
      const seenData = seenMap.get(entry.movie_id);

      return {
        ...entry,
        ...tmdb,

        // Prefer seen rating/review → fallback to entry → fallback to null
        userRating: seenData?.rating ?? entry.rating ?? null,
        review: seenData?.review ?? entry.review ?? null,

        listType: entry.category,
        genre_ids: tmdb.genres?.map((g) => g.id) || [],
      };
    });
  };

  // =========================
  // LOAD ALL MOVIES
  // =========================
  const loadEntries = async () => {
    if (!user) return;

    const { data: rows, error } = await supabase
      .from("movie_entries")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    const enriched = await enrichEntries(rows);

    console.log("🔎 ENRICHED DECK:", enriched.filter(m => m.category === "deck"));

    setSeen(enriched.filter((m) => m.category === "seen"));
    setToWatch(enriched.filter((m) => m.category === "to_watch"));
    setDeck(enriched.filter((m) => m.category === "deck"));
  };

  useEffect(() => {
    if (user) loadEntries();
    else {
      setSeen([]);
      setToWatch([]);
      setDeck([]);
    }
  }, [user]);

  // =========================
  // CORE UPSERT / DELETE
  // =========================
  const upsertEntry = async (category, movieId, fields = {}) => {
    const { error } = await supabase.from("movie_entries").upsert({
      user_id: user.id,
      movie_id: movieId,
      category,
      ...fields,
    });

    if (error) console.error(error);
    await loadEntries();
  };

  const deleteEntry = async (category, movieId) => {
    const { error } = await supabase
      .from("movie_entries")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movieId)
      .eq("category", category);

    if (error) console.error(error);
    await loadEntries();
  };

  // =========================
  // SEEN
  // =========================
  const addToSeen = (movieId, rating, review = "") =>
    upsertEntry("seen", movieId, { rating, review });

  const removeFromSeen = (movieId) => deleteEntry("seen", movieId);

  const isSeen = (movieId) => seen.some((m) => m.movie_id === movieId);

  const getSeenMovie = (movieId) =>
    seen.find((m) => m.movie_id === movieId);

  // =========================
  // TO WATCH
  // =========================
  const addToToWatch = (movieId, priority = null, custom = "") =>
    upsertEntry("to_watch", movieId, { priority, custom });

  const removeFromToWatch = (movieId) => deleteEntry("to_watch", movieId);

  const isToWatch = (movieId) =>
    toWatch.some((m) => m.movie_id === movieId);

  const getToWatchMovie = (movieId) =>
    toWatch.find((m) => m.movie_id === movieId);

  // =========================
  // DECK
  // =========================
  const addToDeck = async (movieId) => {
    if (deck.length >= 5) {
      alert("Your deck already has 5 movies.");
      return;
    }
    await upsertEntry("deck", movieId);
  };

  const removeFromDeck = (movieId) => deleteEntry("deck", movieId);

  const isInDeck = (movieId) =>
    deck.some((m) => m.movie_id === movieId);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    seen,
    addToSeen,
    removeFromSeen,
    isSeen,
    getSeenMovie,

    toWatch,
    addToToWatch,
    removeFromToWatch,
    isToWatch,
    getToWatchMovie,

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