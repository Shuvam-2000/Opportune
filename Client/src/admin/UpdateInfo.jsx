import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import useGetCompanyById from "../hooks/useGetCompanyById";

const UpdateInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  useGetCompanyById(params.id)
  
  // state to handle data from the fields for company info update
  const [updateCompanyInfo, setUpdateCompanyInfo] = useState({
    companyName: "",
    companyLocation: "",
    description: "",
    companyWebsite: "",
    logo: null,
  });

  // fetching single particular company info from redux
  const { singleCompany } = useSelector((store) => store.company);

  // implementing the onchange function for file uploads
  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setUpdateCompanyInfo({ ...updateCompanyInfo, file });
  };

  // implementing the onchange function for other fields uploads
  const updateHandler = (e) => {
    setUpdateCompanyInfo({
      ...updateCompanyInfo,
      [e.target.name]: e.target.value,
    });
  };

  // funcitonality to update the company information
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", updateCompanyInfo.companyName);
    formData.append("companyLocation", updateCompanyInfo.companyLocation);
    formData.append("description", updateCompanyInfo.description);
    formData.append("companyWebsite", updateCompanyInfo.companyWebsite);
    if (updateCompanyInfo.file) {
      formData.append("logo", updateCompanyInfo.file);
    }
    try {
      const res = await axios.put(
        `https://opportune-server.onrender.com/company/companyInfo/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        navigate("/admin/companies");
        toast.success(res?.data?.message || "Company Info Updated Sucessfully");
      }
    } catch (error) {
      toast.error(error?.res?.message || "Error Updating Company Info");
    }
  };

  // fetching the company data from redux store
  useEffect(() => {
    setUpdateCompanyInfo({
      companyName: singleCompany?.companyName || "",
      companyLocation: singleCompany?.companyLocation || "",
      description: singleCompany?.description || "",
      companyWebsite: singleCompany?.companyWebsite || "",
      logo: singleCompany?.logo || null,
    });
  }, [singleCompany]);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 mb-4 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
        <h2 className="sm:text-2xl text-xl font-bold text-center">
          Update Company Info —
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input
            type="text"
            name="companyName"
            onChange={updateHandler}
            value={updateCompanyInfo.companyName}
            className="border sm:p-3 p-2 text-sm w-full rounded hover:border-black"
            placeholder="What's Your Company Name?"
          />
          <input
            type="text"
            name="companyLocation"
            onChange={updateHandler}
            value={updateCompanyInfo.companyLocation}
            className="border sm:p-3 p-2 text-sm w-full rounded hover:border-black"
            placeholder="Where's Your Company Headquartered?"
          />
          <textarea
            name="description"
            onChange={updateHandler}
            value={updateCompanyInfo.description}
            className="border sm:p-3 p-2 text-sm w-full rounded hover:border-black"
            placeholder="Something About Your Company"
          ></textarea>
          <input
            type="text"
            name="companyWebsite"
            onChange={updateHandler}
            value={updateCompanyInfo.companyWebsite}
            className="border sm:p-3 p-2 text-sm w-full rounded hover:border-black"
            placeholder="www.example.com (Add Your Company Website)"
          />

          {/* Add Company Logo */}
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={fileHandler}
            className="border sm:p-3 p-2 text-sm w-full rounded hover:border-black"
          />

          {/* Buttons side by side with proper spacing */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => navigate("/admin/companies")}
              type="button"
              className="bg-gray-300 text-gray-700 sm:px-6 sm:py-2 px-3 py-2 rounded-md hover:bg-gray-400 transition-all duration-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white sm:px-4 sm:py-2 px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateInfo;
