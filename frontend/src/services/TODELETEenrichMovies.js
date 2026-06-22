import { getMoviesByIds } from "./movieServices";
import { getSeen } from "./seenServices";
import { getToWatch } from "./toWatchServices";
import { getDeck } from "./deckServices";

// =========================
// CORE ENRICH FUNCTION
// =========================
export const enrichMovies = async (items) => {
    if (!items?.length) return [];

    // ✅ normalize movie_id FIRST
    const normalizedItems = items.map(item => {
        const movieId =
            typeof item.movie_id === "object"
                ? item.movie_id.id
                : item.movie_id;

        return {
            ...item,
            movie_id: movieId,
        };
    });

    const movieIds = normalizedItems.map(item => item.movie_id);

    const movies = await getMoviesByIds(movieIds);

    return normalizedItems.map(item => {
        const movie = movies.find(m => m.id === item.movie_id);

        return {
            ...movie,        // TMDB data
            ...item,         // user data
            id: item.movie_id
        };
    });
};

// =========================
// WRAPPERS (FEATURE LEVEL)
// =========================

export const getSeenMoviesEnriched = async (user) => {
    const seen = await getSeen(user);
    return enrichMovies(seen);
};

export const getToWatchMoviesEnriched = async (user) => {
    const toWatch = await getToWatch(user);
    return enrichMovies(toWatch);
};

export const getDeckMoviesEnriched = async (user) => {
    const deck = await getDeck(user);
    return enrichMovies(deck);
};