import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function SupabaseSeenTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [movieId, setMovieId] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const [seenMovies, setSeenMovies] = useState([]);

  // fetch list

  const fetchSeenMovies = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("seen_movies")
      .select("id, movie_id, rating, review")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    setSeenMovies(data);
  };

  // ------------------------
  // CHECK SESSION ON LOAD
  // ------------------------
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);


  // fetch when user changes

  useEffect(() => {
    if (user) {
      fetchSeenMovies();
    } else {
      setSeenMovies([]);
    }
  }, [user]);

  // ------------------------
  // SIGN UP / LOGIN
  // ------------------------
  const signUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
    });
  };

  const signIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // ------------------------
  // ADD TO TABLE
  // ------------------------
  const addSeen = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("seen_movies")
      .insert([
        {
          user_id: user.id,
          movie_id: movieId,
          rating: rating ? Number(rating) : null,
          review: review,
        },
      ]);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    setMovieId("");
    setRating("");
    setReview("");

    fetchSeenMovies();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Supabase Seen Test</h2>

      {/* AUTH SECTION */}
      {!user ? (
        <div>
          <h3>Login / Sign up</h3>

          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{color: "red"}}
          />

          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{color: "red"}}
          />

          <button onClick={signUp}>Sign up</button>
          <button onClick={signIn}>Login</button>
        </div>
      ) : (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={signOut}>Logout</button>

          <hr />

          {/* INSERT SECTION */}
          <h3>Add to seen_movies</h3>
          <div>movie id</div>
          <input
            placeholder="movie_id"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            style={{color: "red"}}
          />
          <input
            placeholder="rating (0-10)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{color: "red"}}
          />

          <input
            placeholder="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{color: "red"}}
          />

          <button onClick={addSeen}>Add</button>
        </div>
      )}
      <h3>Your Seen Movies</h3>

      {seenMovies.length === 0 ? (
        <p>No movies yet</p>
      ) : (
        <ul>
          {seenMovies.map((m) => (
            <li key={m.id}>
              <strong>{m.movie_id}</strong>
              <br />
              Rating: {m.rating ?? "N/A"}
              <br />
              Review: {m.review ?? "No review"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}