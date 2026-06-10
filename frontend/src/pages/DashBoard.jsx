

import SearchBox from "../components/Boxes/SearchBox";

// import WatchNames from "../components/Lists/WatchNames";
// import SeenNames from "../components/Lists/SeenNames";

import RecentSeen from "../components/Lists/RecentSeen";
import WatchNamesByGenre from "../components/Lists/WatchNamesByGenre";


import DeckDisplay from "../components/Boxes/DeckDisplay";

import RecommendationBox from "../components/Boxes/RecommendationBox";


function DashBoard() {
    
  

  return (
    <div className="dash-border">
      <div className='dash-layout'>
        <div className="dash-container">
          <RecentSeen/>
        </div>
        <div className="dash-container-right-column">
          <SearchBox/>
          <div className="dash__right-right-column">
            <div className="dash__deck-display">
              <h3 className="dash__your-deck">Your Deck</h3>
              <DeckDisplay/>
            </div>
            
            
            <div className="deck-recommendation-container">
              <RecommendationBox/>
            </div>
          </div>
          
        </div>
      </div>  
    </div>
      
  );
}

export default DashBoard

