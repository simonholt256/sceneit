import { useState } from "react";

import SearchBox from "../components/Boxes/SearchBox";

// import WatchNames from "../components/Lists/WatchNames";
// import SeenNames from "../components/Lists/SeenNames";

import RecentSeen from "../components/Lists/RecentSeen";
import WatchNamesByGenre from "../components/Lists/WatchNamesByGenre";


import DeckBox from "../components/Boxes/DeckBox";

import RecommendationBox from "../components/Boxes/RecommendationBox";


function DashBoard() {
    
  const [selectedReviewMovie, setSelectedReviewMovie] = useState(null);

  return (
    <div className="dash-border">
      <h2>Scene it</h2>
      <div className='dash-layout'>
        <div className="dash-container">
          <RecentSeen/>
        </div>
        <div className="dash-container-right-column">
          <SearchBox/>
          <div className="card-back">
            <div className="dash-deck-display">
              <div className="deck-review-container">
                <div className="review-text-box">
                  {selectedReviewMovie ? (
                    <>
                      <h3>{selectedReviewMovie.title}</h3>

                      <p>
                        Rating: {selectedReviewMovie.userRating}/10
                      </p>

                      <p>
                        {selectedReviewMovie.review || "No review written."}
                      </p>
                    </>
                  ) : (
                    <p>Select a deck film.</p>
                  )}
                </div>
              </div>
              <h3>Your Deck</h3>
              <DeckBox onSelectReview={setSelectedReviewMovie} />
            </div>
            
            <h3>Recommended films from top films</h3>
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

