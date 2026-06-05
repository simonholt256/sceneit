import { useEffect, useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";

function RecentSeen() {
  const { seen } = useMovieContext();
  const { openInfoModal } = useModalContext();

  const recent = (seen || []).slice(-10).reverse();

  const [activeIndex, setActiveIndex] = useState(0);

  // reset if list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [recent.length]);

  // auto-advance highlight
  useEffect(() => {
    if (recent.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % recent.length);
    }, 4000); // change speed here

    return () => clearInterval(interval);
  }, [recent.length]);

  if (!recent.length) {
    return <p>No recently seen movies</p>;
  }

  return (
    <div className="recent-seen-list">
      <div>
        <img className="recent-poster" src={`https://image.tmdb.org/t/p/w500${recent[activeIndex].poster_path}`}/>
        <div>{recent[activeIndex].userRating}/10</div>
        <div>{recent[activeIndex].review}</div>
      </div>
      
      <div>
        {recent.map((movie, index) => (
          <div
            key={movie.id}
            className={`recent-seen-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => openInfoModal(movie)}
          >
            {movie.title}
          </div>
        ))}
      </div>
      

    </div>
  );
}

export default RecentSeen;