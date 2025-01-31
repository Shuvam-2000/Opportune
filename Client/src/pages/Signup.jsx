import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Form Submitted", data);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full sm:max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-10 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-gray-800 font-mono mb-4">
          Sign Up
        </h2>

        {/* Full Name Field */}
        <div className="w-full mt-3">
          <label className="block text-sm font-medium text-gray-700 m-2">
            Full Name
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 ml-1 text-sm border rounded-lg hover:border-black ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Your Full Name"
            {...register("fullname", {
              required: "Full Name is required",
              minLength: {
                value: 4,
                message: "Minimum length is 4 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum length is 20 characters",
              },
            })}
          />
          {errors.fullname && (
            <p className="text-xs text-red-500 mt-1 ml-2">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="w-full mt-3">
          <label className="block text-sm font-medium text-gray-700 m-2">
            Phone Number
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-2 ml-1 text-sm border rounded-lg hover:border-black ${
              errors.phonenumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Your Phone Number"
            {...register("phonenumber", {
              required: "Phone Number is required",
              minLength: {
                value: 10,
                message: "Phone number must be exactly 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Phone number must be exactly 10 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must contain only numbers",
              },
            })}
          />
          {errors.phonenumber && (
            <p className="text-xs text-red-500 mt-1 ml-2">
              {errors.phonenumber.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="w-full mt-3">
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
            type="password"
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

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-2 rounded-lg mt-4 cursor-pointer transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>

        {/* Already Have an Account */}
        <p
          onClick={() => navigate("/login")}
          className="text-gray-600 hover:text-red-500 cursor-pointer text-sm mt-4"
        >
          Already have an account? <span className="underline">Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
