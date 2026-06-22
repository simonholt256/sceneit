const API_KEY = "YOUR_TMDB_KEY";

export const getMovieById = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  const data = await res.json();

  // IMPORTANT: shape it like your old objects
  return {
    id: data.id,
    title: data.title,
    poster: data.poster_path,
    overview: data.overview,
    releaseDate: data.release_date,
    rating: data.vote_average,
  };
};