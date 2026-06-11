import NoFilms from "../PlaceHolders/NoFilms";

function WatchNames({
  view,
  groupedByGenre,
  groupedByPriority,
  groupedByCustom,
  genreMap
}) {

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  let items = [];

  if (view === "genre") {
    items = Object.keys(groupedByGenre)
      .sort((a, b) =>
        (genreMap[a] || "").localeCompare(genreMap[b] || "")
      )
      .map(id => ({
        label: genreMap[id],
        target: `genre-${id}`
      }));
  }

  if (view === "priority") {
    items = Object.keys(groupedByPriority)
      .filter(key => groupedByPriority[key].length > 0)
      .map(priority => ({
        label: priority,
        target: `priority-${priority}`
      }));
  }

  if (view === "custom") {
    items = Object.keys(groupedByCustom)
      .filter(key => groupedByCustom[key].length > 0)
      .sort()
      .map(tag => ({
        label: tag,
        target: `custom-${tag}`
      }));
  }

  if (items.length === 0) {
    return <NoFilms state="To Watch" />;
  }

  return (
    <div>
      <h2>TO WATCH LIST</h2>
      <div className="watch-names__list-box">
        <div className="movie-grid">
          {items.map(item => (
            <div
              key={item.target}
              className="watch-names-box"
              onClick={() => scrollToSection(item.target)}
              style={{ cursor: "pointer" }}
            >
              - {item.label}
            </div>
          ))}
      </div>
      </div>
      
    </div>
  );
}

export default WatchNames;