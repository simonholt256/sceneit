import SearchBox from "../components/Boxes/SearchBox";

import WatchNames from "../components/Lists/WatchNames";
import SeenNames from "../components/Lists/SeenNames";

import DeckBox from "../components/Boxes/DeckBox";

import RecommendationBox from "../components/Boxes/RecommendationBox";


function DashBoard() {
    

    return (
        <>
          <h2>Scene it</h2>
          <div className='dash-layout'>
            <div className="dash-container">
                <WatchNames/>
            </div>
            <div className="dash-container">
                <SeenNames/>
            </div>
            <div className="dash-container">
              <DeckBox/>
              <div className="deck-review-container">
                <div className="review-text-box">Review</div>
              </div>
              <div className="deck-recommendation-container">
                <div>Recommended films from top films</div>
                <RecommendationBox/>
              </div>
            </div>
          </div>  
        </>
        
    );
}

export default DashBoard

