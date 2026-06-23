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

  const tmdbCache = useRef({});

  // =========================
  // ⭐ LOCAL STORAGE HELPERS
  // =========================
  const loadLocal = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const saveLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // =========================
  // TMDB FETCHER (with cache)
  // =========================
  const fetchTMDB = async (movieId) => {
    if (tmdbCache.current[movieId]) return tmdbCache.current[movieId];

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

    await Promise.all(
      uniqueIds.map(async (id) => {
        if (!tmdbCache.current[id]) await fetchTMDB(id);
      })
    );

    const seenMap = new Map(
      entries
        .filter((e) => e.category === "seen")
        .map((e) => [e.movie_id, e])
    );

    return entries.map((entry) => {
      const tmdb = tmdbCache.current[entry.movie_id] || {};
      const seenData = seenMap.get(entry.movie_id);

      return {
        ...entry,
        ...tmdb,
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
    // ⭐ LOCAL MODE
    if (!user) {
      const localSeen = loadLocal("seen");
      const localToWatch = loadLocal("toWatch");
      const localDeck = loadLocal("deck");

      const combined = [
        ...localSeen.map((m) => ({ ...m, category: "seen" })),
        ...localToWatch.map((m) => ({ ...m, category: "to_watch" })),
        ...localDeck.map((m) => ({ ...m, category: "deck" })),
      ];

      const enriched = await enrichEntries(combined);

      setSeen(enriched.filter((m) => m.category === "seen"));
      setToWatch(enriched.filter((m) => m.category === "to_watch"));
      setDeck(enriched.filter((m) => m.category === "deck"));
      return;
    }

    // ⭐ SUPABASE MODE
    const { data: rows, error } = await supabase
      .from("movie_entries")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    const enriched = await enrichEntries(rows);

    setSeen(enriched.filter((m) => m.category === "seen"));
    setToWatch(enriched.filter((m) => m.category === "to_watch"));
    setDeck(enriched.filter((m) => m.category === "deck"));
  };

  useEffect(() => {
    loadEntries();
  }, [user]);

  // =========================
  // CORE UPSERT / DELETE
  // =========================
  const upsertEntry = async (category, movieId, fields = {}) => {
    // ⭐ LOCAL MODE
    if (!user) {
      const key =
        category === "seen"
          ? "seen"
          : category === "to_watch"
          ? "toWatch"
          : "deck";

      const list = loadLocal(key);
      const index = list.findIndex((m) => m.movie_id === movieId);

      const entry = { movie_id: movieId, category, ...fields };

      if (index >= 0) {
        list[index] = { ...list[index], ...entry };
      } else {
        list.push(entry);
      }

      saveLocal(key, list);
      loadEntries();
      return;
    }

    // ⭐ SUPABASE MODE
    const { error } = await supabase
      .from("movie_entries")
      .upsert(
        {
          user_id: user.id,
          movie_id: movieId,
          category,
          ...fields,
        },
        { onConflict: "user_id, movie_id, category" }
      );

    if (error) console.error(error);
    await loadEntries();
  };

  const deleteEntry = async (category, movieId) => {
    // ⭐ LOCAL MODE
    if (!user) {
      const key =
        category === "seen"
          ? "seen"
          : category === "to_watch"
          ? "toWatch"
          : "deck";

      const list = loadLocal(key).filter((m) => m.movie_id !== movieId);
      saveLocal(key, list);
      loadEntries();
      return;
    }

    // ⭐ SUPABASE MODE
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