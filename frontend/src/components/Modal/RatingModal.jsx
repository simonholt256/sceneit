import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import { useMovieContext } from "../../contexts/MovieContext";

function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(10)].map((_, i) => {
        const value = i + 1;

        const isHover = hover !== 0 && value <= hover;
        const isFilled = hover === 0 && value <= rating;

        return (
          <span
            key={value}
            className={
              isHover
                ? "star hover"
                : isFilled
                ? "star filled"
                : "star"
            }
            onClick={() => setRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function RatingModal() {

  const {
    selectedMovie,
    isRatingOpen,
    closeRatingModal,
    rating,
    setRating,
    review,
    setReview
  } = useModalContext();

  const { addToSeen, getSeenMovie } = useMovieContext();

  useEffect(() => {
    if (!selectedMovie) return;

    const existing = getSeenMovie(selectedMovie.id);

    if (existing) {
      setRating(existing.rating ?? 0);
      setReview(existing.review ?? "");
    } else {
      setRating(0);
      setReview("");
    }
  }, [selectedMovie, isRatingOpen]);

  if (!isRatingOpen || !selectedMovie) return null;

  function handleSave() {
    addToSeen(selectedMovie.id, rating, review);
    closeRatingModal();
  }

  return createPortal(
    <div className="modal-overlay">
      <div className="rating-modal">

          <h2>Rate {selectedMovie.title}</h2>

          <div className="rating-modal__input-container">
            <StarRating rating={rating} setRating={setRating} />

            <button
              className="clear-rating"
              onClick={() => setRating(0)}
            >
              Clear Rating
            </button>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
            />

            <button onClick={handleSave}>
              Save Rating
            </button>
          </div>

          

          <button className="close-button" onClick={closeRatingModal}>
              X
          </button>

      </div>
    </div>,
    document.body
  );
}

export default RatingModal;