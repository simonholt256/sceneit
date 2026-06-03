import DeckFilmCard from "../Cards/DeckFilmCard";

function DeckBox() {
  return (
      <div className="deck-container ">
        {[0, 1, 2, 3, 4].map((i) => (
          <DeckFilmCard key={i} index={i} />
        ))}
      </div>
    );
}

export default DeckBox