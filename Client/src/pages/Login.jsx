import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setlodaing } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onsubmit = async (data) => {
    try {
      dispatch(setlodaing(true));
      const response = await axios.post(
        "http://localhost:4000/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      reset();
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
      reset();
    } finally {
      dispatch(setlodaing(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col items-center w-full sm:max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-10 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-gray-800 font-mono mb-4">
          Login
        </h2>

        {/* Email Field */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 m-2">
            Email
          </label>
          <input
            type="email"
            className={`w-full px-4 py-2 ml-1 text-sm border rounded-lg hover:border-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="w-full mt-3">
          <label className="block text-sm font-medium text-gray-700 m-2">
            Password
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 ml-1 text-sm border rounded-lg hover:border-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Minimum length is 4 characters",
              },
              maxLength: {
                value: 10,
                message: "Maximum length is 10 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 ml-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div className="w-full mt-3">
          <label className="block text-sm font-medium text-gray-700 m-2">
            Role
          </label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                {...register("role", { required: "Role is required" })}
                className="text-red-500 focus:ring-red-500 ml-2 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Recruiter</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="candidate"
                name="role"
                {...register("role", { required: "Role is required" })}
                className="text-red-500 focus:ring-red-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700">Candidate</span>
            </label>
          </div>
          {errors.role && (
            <p className="text-xs text-red-500 mt-1 ml-2">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Forgot Password & Signup */}
        <div className="w-full flex justify-between text-xs mt-8">
          <p className="text-gray-600 hover:text-red-500 cursor-pointer">
            Forgot Password?
          </p>
          <p
            onClick={() => navigate("/signup")}
            className="text-gray-600 hover:text-red-500 cursor-pointer"
          >
            Create Your Account
          </p>
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting || loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-2 rounded-lg mt-4 cursor-pointer transition-all disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting || loading ? (
            <>
              <span className="mr-2">Submitting...</span>
              <div className="spinner-border animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
