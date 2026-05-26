import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [seen, setSeen] = useState(() => {
        const storedSeen = localStorage.getItem("seen")
        return storedSeen ? JSON.parse(storedSeen) : []
    })

    useEffect(() => {
        localStorage.setItem('seen', JSON.stringify(seen))
    }, [seen])

    useEffect(() => {
        console.log("Seen movies:", seen);
    }, [seen]);


    const addToSeen = (movie, rating) => {

      setSeen(prev => {

          const alreadySeen = prev.some(
              m => m.id === movie.id
          )

          if (alreadySeen) {

              return prev.map(m =>
                  m.id === movie.id
                      ? { ...m, userRating: rating }
                      : m
              )

          } else {

              return [
                  ...prev,
                  {
                      ...movie,
                      userRating: rating
                  }
              ]
          }
      })
  }

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