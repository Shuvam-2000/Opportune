import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

function App() {
  
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
