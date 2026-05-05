import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [seen, setSeen] = useState([])

    useEffect(() => {
        const storedSeen = localStorage.getItem("seen")

        if (storedSeen) setSeen(JSON.parse(storedSeen))
    }, [])

    useEffect(() => {
        localStorage.setItem('seen', JSON.stringify(seen))
    }, [seen])

    useEffect(() => {
        console.log("Seen movies:", seen);
    }, [seen]);


    const addToSeen = (movie) => {
        setSeen(prev => [
            ...prev, 
            {
                ...movie,
                userRating: 8
            }
        ]);
    };

    const removeFromSeen = (movieId) => {
        setSeen(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isSeen = (movieId) => {
        return seen.some(movie => movie.id === movieId)
    }

    const value = {
        seen,
        addToSeen,
        removeFromSeen,
        isSeen
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}