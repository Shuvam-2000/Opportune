import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisteredCompany from "./RegisteredCompany";

const Company = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex flex-row sm:flex-row justify-between items-center sm:gap-4 gap-12">
          <input
            className="border border-gray-400 rounded-md text-sm px-3 py-1 sm:px-4 sm:py-2 w-full sm:w-60 hover:border-black"
            placeholder="Filter By Name"
          />
          <button onClick={() => navigate('/admin/register-company')} className="bg-red-500 text-sm text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md shadow-md hover:bg-red-600 cursor-pointer w-full sm:w-auto">
             New Company
          </button>
        </div>

        {/* Show Companies Registered */}
        <div className="border rounded-lg shadow-md p-4 mt-6 bg-white">
          <RegisteredCompany />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
