import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import { useMovieContext } from "../../contexts/MovieContext";

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
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="0">No rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

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