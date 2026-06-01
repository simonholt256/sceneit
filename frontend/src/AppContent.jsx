import { useModalContext } from "./contexts/ModalContext";

import Header from './components/Header/Header.jsx';
import DashBoard from './pages/DashBoard.jsx';
import Search from './pages/Search.jsx';
import Seen from './pages/Seen.jsx';
import ToWatch from './pages/ToWatch.jsx';

import { Routes, Route } from "react-router-dom";

import InfoModal from "./components/Modal/InfoModal";
import RatingModal from "./components/Modal/RatingModal";
import PriorityModal from "./components/Modal/PriorityModal";

function AppContent() {
  const { isInfoOpen, isRatingOpen, isPriorityOpen } = useModalContext();

  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/ToWatch" element={<ToWatch />} />
          <Route path="/Seen" element={<Seen />} />
          <Route path="/Search" element={<Search />} />
        </Routes>

        {isInfoOpen && <InfoModal />}
        {isRatingOpen && <RatingModal />}
        {isPriorityOpen && <PriorityModal />}

      </main>
    </>
  );
}

export default AppContent;