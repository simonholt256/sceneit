
function NoFilms({state}) {

    function linkToSearchPage() {
        alert("this will go to search page")
    }

    return <div className="seen-empty">
        <h2>No {state} movies</h2>
        <p>find the films you've {state}</p><button className="link-to-search" onClick={linkToSearchPage}>Here</button>
    </div>
}

export default NoFilms