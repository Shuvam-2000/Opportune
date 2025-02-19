import { useNavigate } from "react-router-dom";

const RegisteredCompany = () => {
  const navigate = useNavigate();
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
          <tr className="bg-gray-50 even:bg-gray-100 text-left border-b">
            <td className="px-4 py-3 text-sm">🖼️</td>
            <td className="px-4 py-3 text-sm">Tech Corp</td>
            <td className="px-4 py-3 text-sm">Bangalore</td>
            <td className="px-4 py-3 text-sm">2025-02-19</td>
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => navigate("/update-compnayinfo")}
                className="bg-green-500 text-white px-4 py-2 rounded-md text-xs sm:text-sm hover:bg-green-600 transition cursor-pointer"
              >
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCompany;
