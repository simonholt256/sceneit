import { Link } from "react-router-dom"

function NoFilms({state}) {

    function linkToSearchPage() {
        alert("this will go to search page")
    }

    return <div className="seen-empty">
        <h2>No {state} movies</h2>
        <p>find the films you've {state}</p>
        <Link to="/Search" className="search-link">Search</Link>
    </div>
}

export default NoFilms