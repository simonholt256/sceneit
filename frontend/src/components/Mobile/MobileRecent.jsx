import { useEffect, useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";
import { getPoster } from "../../utils/poster";

function MobileRecentSeen() {
  const { seen, toWatch } = useMovieContext();
  const { openInfoModal } = useModalContext();

  const recentSeen = (seen || [])
    .slice(-5)
    .reverse()
    .map(movie => ({
      ...movie,
      listType: "seen"
    }));

  const recentToWatch = (toWatch || [])
    .slice(-5)
    .reverse()
    .map(movie => ({
      ...movie,
      listType: "toWatch"
    }));

  const recent = [...recentSeen, ...recentToWatch];

  const [activeIndex, setActiveIndex] = useState(0);

  const activeMovie = recent[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
  }, [recent.length]);

  useEffect(() => {
    if (recent.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % recent.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [recent.length]);

  if (!recent.length) {
    return <p>No recent movies</p>;
  }

  return (
    <div className="mobilerecentseen">
      <h3>Recent</h3>
      <img
        className="mobilerecentseen__poster-img"
        src={getPoster(activeMovie)}
        alt={activeMovie.title}
      />
      <div className="mobilerecentseen__rating-display">
        { activeMovie.userRating ? (`${activeMovie.userRating}/10` ) : ( "No rating ")}
      </div>
      <h2>Recent Seen</h2>
      <div className="mobilerecentseen__recent-list">
        {recentSeen.map(movie => (
          <div
            key={`seen-${movie.id}`}
            className={`mobilerecentseen__recent-item ${
              activeMovie?.id === movie.id &&
              activeMovie?.listType === "seen"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveIndex(
                recent.findIndex(
                  m => m.id === movie.id && m.listType === "seen"
                )
              );
              // openInfoModal(movie);
            }}
          >
            {/* {movie.title} */}
            <img
              className="mobilerecentseen__recent-item-img"
              src={getPoster(movie)}
              alt={movie.title}
            />
          </div>
          
        ))}
      </div>
      <h2>Recent To watch</h2>
      <div className="mobilerecentseen__recent-list">
        {recentToWatch.map(movie => (
          <div
            key={`watch-${movie.id}`}
            className={`mobilerecentseen__recent-item ${
              activeMovie?.id === movie.id &&
              activeMovie?.listType === "toWatch"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveIndex(
                recent.findIndex(
                  m => m.id === movie.id && m.listType === "toWatch"
                )
              );
              // openInfoModal(movie);
            }}
          >
            {/* {movie.title} */}
            <img
                className="mobilerecentseen__recent-item-img"
                src={getPoster(movie)}
                alt={movie.title}
              />
          </div>
        ))}
      </div>
  
      
    </div>
  );
}

export default MobileRecentSeen;