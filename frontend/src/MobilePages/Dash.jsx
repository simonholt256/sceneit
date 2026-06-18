

import SearchBox from "../components/Boxes/SearchBox";

import MobileRecentSeen from "../components/Mobile/MobileRecent";
import DashDeck from "../components/Mobile/DashDeck";
import RecommendationBox from "../components/Boxes/RecommendationBox";

import WatchNamesByGenre from "../components/Lists/WatchNamesByGenre";


function Dash() {
    
  

  return (
    <div className="dash">
      <div className="mobile__page-title-box">
        <div>Culture Deck</div>
        <div>Dash</div>
      </div>
      <MobileRecentSeen/>
      <DashDeck/>
      <RecommendationBox/>
    </div>
      
  );
}

export default Dash

