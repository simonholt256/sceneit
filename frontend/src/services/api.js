const API_KEY = "f1105dec192092db245d48e5d5627fc1"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json()
    return data.results
};

export const getMovieCredits = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    )

    const data = await response.json()

    return {
        cast: data.cast,
        director:
            data.crew.find(person => person.job === "Director")?.name
    }
}

export const getRecommendedMovies = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
    )

    const data = await response.json()

    return data.results
}