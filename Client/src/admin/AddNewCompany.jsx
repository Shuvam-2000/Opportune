import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../store/companySlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddNewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state to handle company data
  const [companyData, setCompanyData] = useState({
    companyName: "",
    description: "",
  });

  // onchange function to handle company data
  const companyDataHandler = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  // fetch all companies data from the redux store
  const { allcompanies } = useSelector((store) => store.company);

  // functionality to regsiter new company
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/company/register",
        companyData, // Send all companyData
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company)); // store company data to redux
        toast.success(res?.data?.message || "Company Registered Successfully!");

        // fetching registred compnay id from backend
        const companyId = res?.data?.company?._id;
        navigate(`/update-companyinfo/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      {/* Back to Company Page button */}
      <div className="mt-4">
        <Link
          to="/admin/companies"
          className="inline-flex items-center gap-2 border-none px-4 py-2 
          rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition-all duration-300 hover:text-white"
        >
          <ArrowLeftToLine size={20} />
          <span>Go Back</span>
        </Link>
      </div>

      {/* Add New Company */}
      <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
        <h2 className="sm:text-2xl text-xl font-bold text-left">
          Add New Company—
        </h2>
        <p className="mt-6 mb-0 text-sm">What Your Company Name?</p>
        <label className="block text-sm font-medium text-gray-700 mt-3">
          Company Name:
        </label>
        <input
          type="text"
          name="companyName"
          placeholder="Add Your Company Name"
          className="mt-2 w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:border-black"
          value={companyData.companyName}
          onChange={companyDataHandler}
        />

        <p className="mt-8 mb-0 text-sm">Something About Your Company Name?</p>
        <label className="block text-sm font-medium text-gray-700 mt-3">
          Description:
        </label>
        <input
          type="text"
          name="description"
          placeholder="Add Company Description"
          className="mt-2 w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:border-black"
          value={companyData.description}
          onChange={companyDataHandler}
        />
        {/* Register Company Button */}
        {allcompanies.length > 0 ? (
          <p className="text-sm text-center text-gray-700 mt-6">
            You have Already Registered a Company.{" "}
            <span
              className="text-red-500 underline cursor-pointer"
              onClick={() => navigate("/create-job")}
            >
              Create a Job
            </span>
          </p>
        ) : (
          <>
            <p className="text-center mt-6 mb-0 text-sm text-red-500">You can Register Only One Company</p>
            <button
              onClick={registerNewCompany}
              type="submit"
              className="w-full bg-red-500 text-white mt-6 sm:px-2 sm:py-2 px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
            >
              Continue
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AddNewCompany;
