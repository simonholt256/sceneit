import SearchBox from "../components/Search/SearchBox";

import WatchNames from "../components/Lists/WatchNames";
import SeenNames from "../components/Lists/SeenNames";

import DeckFilmCard from "../components/Cards/DeckFilmCard";


function DashBoard() {
    

    return (
        
        <div className='dash-layout'>
          <div className="dash-container">
              <WatchNames/>
          </div>
          <div className="dash-container">
              <SeenNames/>
          </div>
          <div className="dash-container">
            <div className="deck-container">
              <DeckFilmCard/>
              <DeckFilmCard/>
              <DeckFilmCard/>
              <DeckFilmCard/>
              <DeckFilmCard/>
            </div>
            <div className="deck-review-container">
              <div className="review-text-box">Review</div>
            </div>
            <div className="deck-recommendation-container">
              <div>Recommended films from top films</div>
            </div>
          </div>
        </div>  
    );
}

export default DashBoard

