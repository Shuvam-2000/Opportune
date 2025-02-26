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
import UpdateProfile from "./pages/UpdateProfile";
import Company from "./admin/Company";
import JobPosted from "./admin/JobPosted";
import UpdateInfo from "./admin/UpdateInfo";
import AddNewCompany from "./admin/AddNewCompany";
import CreateJob from "./admin/CreateJob";
import Applicants from "./admin/Applicants";
import ApplicantsTable from "./admin/ApplicantsTable";
import AdminRouteProtect from "./admin/AdminRouteProtect";
import ClientRouteProtect from "./components/ClientRouteProtect";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]">
        <Routes>
          {/* Routes for Client */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explorejobs" element={<ExploreJobs />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="browse" element={<Browse />} />
            <Route
              path="jobdescription/:id"
              element={
                <ClientRouteProtect>
                  <JobDescription />
                </ClientRouteProtect>
              }
            />
          </Route>

          {/* Routes for Admin */}
          <Route
            path="/admin/companies"
            element={
              <AdminRouteProtect>
                <Company />
              </AdminRouteProtect>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <AdminRouteProtect>
                <JobPosted />
              </AdminRouteProtect>
            }
          />
          <Route
            path="/update-companyinfo/:id"
            element={
              <AdminRouteProtect>
                <UpdateInfo />
              </AdminRouteProtect>
            }
          />
          <Route
            path="/admin/register-company"
            element={
              <AdminRouteProtect>
                <AddNewCompany />
              </AdminRouteProtect>
            }
          />
          <Route
            path="/create-job"
            element={
              <AdminRouteProtect>
                <CreateJob />
              </AdminRouteProtect>
            }
          />
          <Route
            path="/applicants/:id"
            element={
              <AdminRouteProtect>
                <Applicants />
              </AdminRouteProtect>
            }
          />
          <Route
            path="/applicantinfo"
            element={
              <AdminRouteProtect>
                <ApplicantsTable />
              </AdminRouteProtect>
            }
          />

          {/* Routes for Dashboard(User Profile) */}
          <Route
            path="/dashboard"
            element={
              <ClientRouteProtect>
                <Dashboard />
              </ClientRouteProtect>
            }
          />
          <Route
            path="/appliedjobs"
            element={
              <ClientRouteProtect>
                <AppliedJobs />
              </ClientRouteProtect>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ClientRouteProtect>
                <UpdateProfile />
              </ClientRouteProtect>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
