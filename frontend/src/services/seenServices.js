import { supabase } from "../lib/supabase";

const LS_KEY = "seen_movies";


// =========================
// READ
// =========================
export const getSeen = async (user) => {
  // Logged in → Supabase
  if (user) {
    const { data, error } = await supabase
      .from("seen_movies")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log("getSeen error:", error);
      return [];
    }

    return data;
  }

  // Guest → localStorage (ID-only)
  return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
};


// =========================
// CREATE / UPDATE (UPSERT)
// =========================
export const upsertSeen = async (user, movie, rating, review = "") => {
  // Logged in → Supabase
  if (user) {
    const { error } = await supabase.from("seen_movies").upsert({
      user_id: user.id,
      movie_id: movie.id,
      rating,
      review,
    });

    if (error) {
      console.log("upsertSeen error:", error);
    }

    return;
  }

  // Guest → localStorage (ID-only)
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  const exists = current.some((m) => m.movie_id === movie.id);

  const updated = exists
    ? current.map((m) =>
        m.movie_id === movie.id
          ? {
              movie_id: movie.id,
              rating,
              review,
            }
          : m
      )
    : [
        ...current,
        {
          movie_id: movie.id,
          rating,
          review,
        },
      ];

  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};


// =========================
// DELETE
// =========================
export const deleteSeen = async (user, movieId) => {
  // Logged in → Supabase
  if (user) {
    const { error } = await supabase
      .from("seen_movies")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movieId);

    if (error) {
      console.log("deleteSeen error:", error);
    }

    return;
  }

  // Guest → localStorage (ID-only)
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  const updated = current.filter((m) => m.movie_id !== movieId);

  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};