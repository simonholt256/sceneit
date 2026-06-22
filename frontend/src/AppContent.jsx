import { useModalContext } from "./contexts/ModalContext";

import Header from './components/Header/Header.jsx';
import UserBar from "./components/Header/UserBar.jsx";
import DashBoard from './pages/DashBoard.jsx';
import Search from './pages/Search.jsx';
import Seen from './pages/Seen.jsx';
import ToWatch from './pages/ToWatch.jsx';
import Deck from "./pages/Deck.jsx";
import MobileNav from "./components/Header/MobileNav.jsx";
import FullLists from "./pages/FullLists.jsx";
import SupabaseSeenTest from "./demo/SupabaseSeenTest.jsx";

import { supabase } from "./lib/supabase.js";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import InfoModal from "./components/Modal/InfoModal";
import RatingModal from "./components/Modal/RatingModal";
import PriorityModal from "./components/Modal/PriorityModal";

function AppContent() {
  const { isInfoOpen, isRatingOpen, isPriorityOpen } = useModalContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="appcontent">
      <Header />
      <UserBar user={user} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/ToWatch" element={<ToWatch />} />
          <Route path="/Seen" element={<Seen />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Deck" element={<Deck />} />
          <Route path="/Fulllists" element={<FullLists/>}/>
          <Route path="/test" element={<SupabaseSeenTest/>}/>
        </Routes>

        {isInfoOpen && <InfoModal />}
        {isRatingOpen && <RatingModal />}
        {isPriorityOpen && <PriorityModal />}

      </main>
      <div className="bottom-nav-bar-block"></div>
      <MobileNav/>
    </div>
  );
}

export default AppContent;