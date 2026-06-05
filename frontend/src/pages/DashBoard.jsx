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
    <>
      <h2>Scene it</h2>
      <div className='dash-layout'>
        <div className="dash-container-left-column">
            <div className="test-box">a box</div>
            <h2>TO WATCH BY GENRE</h2>
            <WatchNamesByGenre/>
        </div>
        <div className="dash-container">
            <h2>RECENTLY SEEN</h2>
            <RecentSeen/>
        </div>
        <div className="dash-container">
          
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
          <h3>Recommended films from top films</h3>
          <div className="deck-recommendation-container">
            
            <RecommendationBox/>
          </div>
        </div>
      </div>  
    </>
      
  );
}

export default DashBoard

