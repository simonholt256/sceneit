import Card from "../components/Card";
import SearchBox from "../components/SearchBox";
import Modal from "../components/modal";


function Home() {
    const movies = [
        {id: 1, title: "River Dogs", release_date: "1974", url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13719_p_v8_aa.jpg"},
        {id: 2, title: "The Exorcist", release_date: "1970", url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13719_p_v8_aa.jpg"},
        {id: 3, title: "Godfather 4", release_date: "2022", url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13719_p_v8_aa.jpg"},
        {id: 4, title: "Fly by night", release_date: "1999", url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13719_p_v8_aa.jpg"},
    ]

    return (
        
        <div className='work-box'>
            <SearchBox/>
            <div className="to-watch-container">
                <Card status="to-watch"/>
            </div>
            <div className="seen-container">
                <Card status="seen"/>
            </div>
            <Modal input="rate-seen"/>
        </div>  
    );
}

export default Home

/*

<Header/>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Seen" element={<Seen/>}/>
      </Routes>
      <div className='work-box'>
        <SearchBox/>
        <Card status="I want to see"/>
        <Card status="I've seen"/>
      </div> */

/* <div className="movie-grid">
                {movies.map((movie) => (
                <FilmCard movie={movie} key={movie.id}/>
                ))}
            </div> */