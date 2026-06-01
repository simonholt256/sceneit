import Header from './components/Header/Header.jsx';
import DashBoard from './pages/DashBoard.jsx';
import Search from './pages/Search.jsx';
import Seen from './pages/Seen.jsx';
import ToWatch from './pages/ToWatch.jsx';

import { Routes, Route } from "react-router-dom";

import { MovieProvider } from './contexts/MovieContext.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';

import InfoModal from "./components/Modal/InfoModal";
import RatingModal from "./components/Modal/RatingModal";

import AppContent from "./AppContent.jsx"; 

import './css/App.css';

function App() {
  return (
    <MovieProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </MovieProvider>
  );
}

export default App;