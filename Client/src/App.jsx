import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExploreJobs from './pages/ExploreJobs';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import './index.css';

function App() {
  
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorejobs" element={<ExploreJobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
