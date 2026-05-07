
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Seen from './pages/Seen.jsx'
import {Routes, Route} from "react-router-dom"
import { MovieProvider } from './contexts/SeenContext.jsx'
import { ToWatchProvider } from './contexts/ToWatchContext.jsx'
import './css/App.css'
import ToWatch from './pages/ToWatch.jsx'

function App() {

  return(
    <MovieProvider>
      <ToWatchProvider>
        <Header/>
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Search" element={<Search/>}/>
            <Route path="/Seen" element={<Seen/>}/>
            <Route path="/ToWatch" element={<ToWatch/>}/>
          </Routes>
        </main>
      </ToWatchProvider>
      
    </MovieProvider>
    
    
  );
}


export default App
