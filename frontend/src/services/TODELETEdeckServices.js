import { supabase } from "../lib/supabase";

const LS_KEY = "deck_movies";


// =========================
// READ
// =========================
export const getDeck = async (user) => {
  // Logged in → Supabase
  if (user) {
    const { data, error } = await supabase
      .from("deck_movies")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log("getDeck error:", error);
      return [];
    }

    return data;
  }

  // Guest → localStorage
  return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
};


// =========================
// ADD
// =========================
export const addToDeck = async (user, movieId) => {
  // Logged in → Supabase
  if (user) {
    const { error } = await supabase.from("deck_movies").insert({
      user_id: user.id,
      movie_id: movieId,
    });

    if (error) {
      console.log("addToDeck error:", error);
    }

    return;
  }

  // Guest → localStorage
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  // avoid duplicates
  if (current.includes(movieId)) return;

  // max 5 movies rule (your existing logic)
  if (current.length >= 5) {
    alert("Your deck already has 5 movies.");
    return;
  }

  const updated = [...current, movieId];

  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};


// =========================
// REMOVE
// =========================
export const removeFromDeck = async (user, movieId) => {
  // Logged in → Supabase
  if (user) {
    const { error } = await supabase
      .from("deck_movies")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", movieId);

    if (error) {
      console.log("removeFromDeck error:", error);
    }

    return;
  }

  // Guest → localStorage
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  const updated = current.filter((id) => id !== movieId);

  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};


// =========================
// CHECK
// =========================
export const isInDeck = async (user, movieId) => {
  // Logged in → Supabase
  if (user) {
    const { data, error } = await supabase
      .from("deck_movies")
      .select("id")
      .eq("user_id", user.id)
      .eq("movie_id", movieId)
      .maybeSingle();

    if (error) {
      console.log("isInDeck error:", error);
      return false;
    }

    return !!data;
  }

  // Guest → localStorage
  const current = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

  return current.includes(movieId);
};