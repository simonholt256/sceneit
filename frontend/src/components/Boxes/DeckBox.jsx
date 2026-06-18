import DeckFilmCard from "../Cards/DeckFilmCard";

function DeckBox({ onSelectReview }) {
  return (
      <div className="deckbox__container ">
        {[0, 1, 2, 3, 4].map((i) => (
          <DeckFilmCard key={i} index={i} onSelectReview={onSelectReview} />
        ))}
      </div>
    );
}

export default DeckBox