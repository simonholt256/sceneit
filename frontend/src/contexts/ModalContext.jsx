import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    // INFO MODAL
    const openInfoModal = (movie) => {
        setSelectedMovie(movie);
        setIsInfoOpen(true);
    };

    const closeInfoModal = () => {
        setSelectedMovie(null);
        setIsInfoOpen(false);
    };

    // RATING MODAL
    const openRatingModal = (movie, existingData = null) => {
        setSelectedMovie(movie);
        setIsRatingOpen(true);

        if (existingData) {
            setRating(existingData.userRating || 0);
            setReview(existingData.review || "");
        } else {
            setRating(0);
            setReview("");
        }
    };

    const closeRatingModal = () => {
        setIsRatingOpen(false);
        setRating(0);
        setReview("");
    };

    //PRIORITY MODAL

    const openPriorityModal = (movie) => {
        setSelectedMovie(movie);
        setIsPriorityOpen(true);
    };

    const closePriorityModal = () => {
        setIsPriorityOpen(false);
    };

    const value = {
        selectedMovie,

        isInfoOpen,
        openInfoModal,
        closeInfoModal,

        isRatingOpen,
        openRatingModal,
        closeRatingModal,

        isPriorityOpen,
        openPriorityModal,
        closePriorityModal,

        rating,
        setRating,
        review,
        setReview
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};