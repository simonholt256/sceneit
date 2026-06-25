import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom"

function Entry() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [movieId, setMovieId] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [priority, setPriority] = useState("");
  const [custom, setCustom] = useState("");

  const [entries, setEntries] = useState([]);

  // ------------------------
  // FETCH ENTRIES
  // ------------------------
  const fetchMovieEntries = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("movie_entries")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    setEntries(data);
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

  useEffect(() => {
    if (user) fetchMovieEntries();
    else setEntries([]);
  }, [user]);

  // ------------------------
  // AUTH
  // ------------------------
  const signUp = async () => {
    await supabase.auth.signUp({ email, password });
  };

  const signIn = async () => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // ------------------------
  // INSERT FUNCTIONS
  // ------------------------
  const addEntry = async (category, extra = {}) => {
    if (!user) return;

    const { error } = await supabase.from("movie_entries").insert([
      {
        user_id: user.id,
        movie_id: Number(movieId),
        category,
        ...extra,
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
    setPriority("");
    setCustom("");

    fetchMovieEntries();
  };

  const addToWatch = () =>
    addEntry("to_watch", {
      priority: priority ? Number(priority) : null,
      custom: custom || null,
    });

  const addSeen = () =>
    addEntry("seen", {
      rating: rating ? Number(rating) : null,
      review: review || null,
    });

  const addDeck = () => addEntry("deck");

  // ------------------------
  // RENDER
  // ------------------------
  const toWatch = entries.filter((e) => e.category === "to_watch");
  const seen = entries.filter((e) => e.category === "seen");
  const deck = entries.filter((e) => e.category === "deck");

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Entry</h2>

      {!user ? (
        <div>
          <h3>Login / Sign up</h3>

          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "red" }}
          />

          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "red" }}
          />

          <button onClick={signUp}>Sign up</button>
          <button onClick={signIn}>Login</button>
        </div>
      ) : (
        <div>
          <p>You are logged in as: {user.email}</p>
          <button onClick={signOut}>Logout</button>
          <div>Go to <Link className="" to="/">Dash</Link></div>
          

          {/* <hr />

          <h3>Add Movie Entry</h3>

          <div>Movie ID</div>
          <input
            placeholder="movie_id"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            style={{ color: "red" }}
          />

          <h4>Add to To‑Watch</h4>
          <input
            placeholder="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ color: "red" }}
          />
          <input
            placeholder="custom note"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            style={{ color: "red" }}
          />
          <button onClick={addToWatch}>Add to To‑Watch</button>

          <h4>Add to Seen</h4>
          <input
            placeholder="rating (0-10)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ color: "red" }}
          />
          <input
            placeholder="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{ color: "red" }}
          />
          <button onClick={addSeen}>Add to Seen</button>

          <h4>Add to Deck</h4>
          <button onClick={addDeck}>Add to Deck</button> */}
        </div>
      )}

      {/* <hr />

      <h3>Your To‑Watch List</h3>
      {toWatch.length === 0 ? (
        <p>No movies</p>
      ) : (
        <ul>
          {toWatch.map((m) => (
            <li key={m.id}>
              <strong>{m.movie_id}</strong>  
              <br />
              Priority: {m.priority ?? "N/A"}  
              <br />
              Note: {m.custom ?? "None"}
            </li>
          ))}
        </ul>
      )}

      <h3>Your Seen Movies</h3>
      {seen.length === 0 ? (
        <p>No movies</p>
      ) : (
        <ul>
          {seen.map((m) => (
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

      <h3>Your Deck Movies</h3>
      {deck.length === 0 ? (
        <p>No movies</p>
      ) : (
        <ul>
          {deck.map((m) => (
            <li key={m.id}>
              <strong>{m.movie_id}</strong>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Entry