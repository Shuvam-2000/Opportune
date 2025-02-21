import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisteredCompany = () => {
  const navigate = useNavigate();
  
  // fetch all companies data from the redux store
  const { allcompanies } = useSelector((store) => store.company); 

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-left">
            <th className="px-4 py-3 text-sm">Logo</th>
            <th className="px-4 py-3 text-sm">Name</th>
            <th className="px-4 py-3 text-sm">Location</th>
            <th className="px-4 py-3 text-sm">Date</th>
            <th className="px-4 py-3 text-sm w-32 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {allcompanies.length > 0 ? (
            allcompanies.map((company) => (
              <tr key={company._id} className="bg-gray-50 even:bg-gray-100 text-left border-b">
                <td className="px-4 py-3 text-sm">
                  {company.companyLogo ? (
                    <img src={company.companyLogo} alt="Logo" className="w-10 h-10 object-cover rounded-full" />
                  ) : (
                    "🖼️"
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{company.companyName}</td>
                <td className="px-4 py-3 text-sm">{company.companyLocation || "N/A"}</td>
                <td className="px-4 py-3 text-sm">{company.createdAt?.split("T")[0] || "N/A"}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => navigate(`/update-companyinfo/${company._id}`)} 
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-xs sm:text-sm hover:bg-green-600 transition cursor-pointer"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCompany;

