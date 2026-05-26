import { createContext, useState, useEffect, useContext } from "react";

const ToWatchContext = createContext()

export const useToWatchContext = () => useContext(ToWatchContext)

export const ToWatchProvider = ({children}) => {
    const [toWatch, setToWatch] = useState(() => {
        const storedToWatch = localStorage.getItem("to-watch")
        return storedToWatch ? JSON.parse(storedToWatch) : []
    })

    useEffect(() => {
        localStorage.setItem('to-watch', JSON.stringify(toWatch))
    }, [toWatch])

    const addToToWatch = (movie) => {
        setToWatch(prev => [...prev, movie])
    }

    const removeFromToWatch = (movieId) => {
        setToWatch(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isToWatch = (movieId) => {
        return toWatch.some(movie => movie.id === movieId)
    }

    const value = {
        toWatch,
        addToToWatch,
        removeFromToWatch,
        isToWatch
    }

    return <ToWatchContext.Provider value={value}>
        {children}
    </ToWatchContext.Provider>
}