import { useState } from "react";

import SearchBox from "../components/Boxes/SearchBox";

import WatchNames from "../components/Lists/WatchNames";
import SeenNames from "../components/Lists/SeenNames";

import DeckBox from "../components/Boxes/DeckBox";

import RecommendationBox from "../components/Boxes/RecommendationBox";


function DashBoard() {
    
  const [selectedReviewMovie, setSelectedReviewMovie] = useState(null);

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
              <div>make the seen list to a recently seen list, which flciks through posters and when they are selected it shows the reviews in the review box</div>
            </div>
          </div>
          <h3>Your Deck</h3>
          <DeckBox onSelectReview={setSelectedReviewMovie} />
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

