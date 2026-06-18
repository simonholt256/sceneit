import Dash from "../MobilePages/Dash";

import SearchBox from "../components/Boxes/SearchBox";

import RecentSeen from "../components/Lists/RecentSeen";
import WatchNamesByGenre from "../components/Lists/WatchNamesByGenre";


import DeckDisplay from "../components/Boxes/DeckDisplay";

import RecommendationBox from "../components/Boxes/RecommendationBox";


function DashBoard() {
    
  

  return (
    <>
      <Dash/>
      <div className="dashboard">
        <div className='dashboard__layout'>
          <div className="dashboard__recent-container">
            <RecentSeen/>
          </div>
          <div className="dashboard__search-and-deck-container">
            <SearchBox/>
            <div className="dashboard__deck-column">
              <div className="dashboard__deck-display">
                <h3 className="dashboard__deck-title">Your Deck</h3>
                <DeckDisplay/>
              </div>
              
              
              <div className="dashboard__recommendation-container">
                <RecommendationBox/>
              </div>
            </div>
            
          </div>
        </div>  
      </div>
    </>
    
      
  );
}

export default DashBoard

