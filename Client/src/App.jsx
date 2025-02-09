import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ExploreJobs from "./pages/ExploreJobs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SIgnUp from "./pages/SIgnUp";
import Browse from "./pages/Browse";
import "./index.css";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
        <Toaster />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorejobs" element={<ExploreJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SIgnUp />} />
            <Route path="/browse" element={<Browse />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
