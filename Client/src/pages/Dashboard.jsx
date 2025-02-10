import Profile from "./Profile";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-300 relative">
        {/* Username */}
        <h1 className="sm:text-3xl text-2xl font-bold text-black cursor-pointer">
          Hi,
          <span className="sm:text-3xl text-2xl font-bold text-red-600">
            { user ? user.fullname : null }
          </span>
        </h1>
      </div>
      <Profile />
    </>
  );
};

export default Dashboard;
