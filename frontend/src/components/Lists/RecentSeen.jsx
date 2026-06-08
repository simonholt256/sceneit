import { useEffect, useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import { useModalContext } from "../../contexts/ModalContext";

function RecentSeen() {
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
    <div className="recent-list">
      
      <div className="recent-list__poster-display">
        {/* <svg className="bg-shape" viewBox="0 0 268.5 281.5" preserveAspectRatio="none">
          <path d="M44.4098 0H268.5V37.5L252 59.5V207.5L268.5 230V269.5H206L188.5 281.5H0V47.5L44.4098 0Z"
            fill="#8d8d8d"/>
        </svg> */}

        <img
          className="recent-list__poster-img"
          src={`https://image.tmdb.org/t/p/w500${activeMovie.poster_path}`}
          alt={activeMovie.title}
        />

        <div className="list-type">
          {activeMovie.listType}
        </div>

        <div className="rating">
          {activeMovie.listType === "seen"
            ? `${activeMovie.userRating}/10`
            : "Unrated"}
        </div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="269" height="60" viewBox="0 0 269 60" fill="none">
        <path d="M0 12.5H193.5L211.5 0H269V59.5H0V12.5Z" fill="#D9D9D9"/>
      </svg>
      <div class="shape-box">
        Edit me
      </div> */}
      <div className="recent-list__poster-title">{activeMovie.title}</div>

      <div className="recent-list__metal-box">
        <h2 className="recent-list__header">RECENTLY ADDED</h2>

        <div className="recent-list__container">

          <h4 className="recent-section-header">Seen</h4>

          {recentSeen.map(movie => (
            <div
              key={`seen-${movie.id}`}
              className={`recent-item ${
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
              {movie.title}
            </div>
          ))}

          <h4 className="recent-section-header">
            To Watch
          </h4>

          {recentToWatch.map(movie => (
            <div
              key={`watch-${movie.id}`}
              className={`recent-item ${
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
              {movie.title}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default RecentSeen;