import NoPoster from "../assets/default/noposter.png";

export function getPoster(movie) {
  if (!movie) return NoPoster;

  return movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : NoPoster;
}