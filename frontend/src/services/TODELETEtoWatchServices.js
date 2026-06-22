import { supabase } from "../lib/supabase";

const LS_KEY = "to_watch_movies";


// =========================
// READ
// =========================
export const getToWatch = async (user) => {
  // Logged in → Supabase
  if (user) {
    const { data, error } = await supabase
      .from("to_watch_movies")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log("getToWatch error:", error);
      return [];
    }

    return data;
  }

  // Guest → localStorage (ID-only)
  return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
};


// =========================
// CREATE / UPDATE
// =========================
export const upsertToWatch = async (
  user,
  movieId,
  priority = "",
  custom = ""
) => {
  // ✅ normalize movieId (CRITICAL FIX)
  const id =
    typeof movieId === "object"
      ? movieId.id
      : movieId;

  // Logged in → Supabase
  if (user) {
    const { error } = await supabase.from("to_watch_movies").upsert({
      user_id: user.id,
      movie_id: id,
      priority,
      custom,
    });

    if (error) {
      console.log("upsertToWatch error:", error);
    }

    return;
  }

  // Guest → localStorage
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  const exists = current.some((m) => m.movie_id === id);

  const updated = exists
    ? current.map((m) =>
        m.movie_id === id
          ? { movie_id: id, priority, custom }
          : m
      )
    : [...current, { movie_id: id, priority, custom }];

  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};


// =========================
// DELETE
// =========================
export const deleteToWatch = async (user, movieId) => {
  // Logged in → Supabase
  if (user) {
    const { error } = await supabase
      .from("to_watch_movies")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movieId);

    if (error) {
      console.log("deleteToWatch error:", error);
    }

    return;
  }

  // Guest → localStorage (ID-only)
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  const updated = current.filter((m) => m.movie_id !== movieId);

  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};