import FilmCard from "./FilmCard";
import Seen from "../pages/Seen";
import ToWatch from "../pages/ToWatch";

function Card({status}){

    function clickForList() {
        console.log(status)
        if (status == "seen") {
            alert("You want the seen list")
        } else {
            alert("You want the to see list")
        }
        
    }

    
    if (status == "seen") {
        return <Seen/>
    } else if (status == "to-watch") {
        return <ToWatch/>
    }
    return(
        <div className="card-back">
            <button className="list-button" onClick={clickForList}>films {status}</button> 
            <FilmCard movie={{title: "River Dogs", release_date: "1974", url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13719_p_v8_aa.jpg"}}/>
            <FilmCard movie={{title: "River Dogs", release_date: "1974", url: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13719_p_v8_aa.jpg"}}/>
        </div>
    );
}

export default Card