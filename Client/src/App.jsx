import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ExploreJobs from "./pages/ExploreJobs";
import Dashboard from "./pages/Dashboard";
import AppliedJobs from "./pages/AppliedJobs";
import JobDescription from "./pages/JobDescription";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Browse from "./pages/Browse";
import "./index.css";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explorejobs" element={<ExploreJobs />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="browse" element={<Browse />} />
            <Route path="jobdescription/:id" element={<JobDescription />} />
          </Route>

          {/* Route for Dashboard without Navbar and Footer */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appliedjobs" element={<AppliedJobs />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
