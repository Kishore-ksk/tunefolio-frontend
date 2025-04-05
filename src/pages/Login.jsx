import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import ApiService from "../api/ApiService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // Store API error messages

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(""); // Clear previous errors


    try {
      const response = await ApiService.login({
        email: data.email,
        password: data.password,
      });
      console.log("Login Response:", response.data); // Debug the response
      const { token, user } = response.data; // Get token from API response
      console.log("Response Token:", response.data.token);
      if (token && user?.id) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", user.id);  // ✅ Store userId
        console.log("Stored Token in LocalStorage:", localStorage.getItem("authToken"));
        console.log("Login Response:", response.data);
      } else {
        console.error("Token is missing in API response:", response.data);
      }
      navigate("/dashboard"); // Redirect to Dashboard

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        setApiError("Invalid email or password. Please try again.");
      } else {
        setApiError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#0D0D0D] justify-center items-center min-h-screen">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-[400px]">
        {/* Brand Logo*/}
        <div className="flex justify-center mb-4">
          <img src="src/assets/tunefolio.svg" alt="Tunefolio Logo" className="text-center text-white" />
        </div>

        {/* Title */}
        <h2 className="text-2xl text-center text-white font-semibold">Log in to your account</h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your email and password below to log in
        </p>

        {/* API Error Message */}
        {apiError && <p className="text-center text-red-500 mb-4">{apiError}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-gray-400 text-sm pb-5">Email address</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="bg-[#191919] border border-[#303030] p-3 rounded-md text-white w-full mt-1"
              {...register("email", {
                required: "Email is required", pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="flex justify-between text-gray-400 text-sm">
              <span>Password</span>
              <a href="#" className="text-[#70CCE2] text-sm">Forgot password?</a>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-[#191919] border border-[#303030] p-3 rounded-md text-white w-full mt-1"
              {...register("password", {
                required: "Password is required", minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {/* Toggle Eye Icon */}
            <button
              type="button"
              className="text-gray-400 -translate-y-1/2 absolute right-3 top-[68%] transform"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" {...register("rememberMe")} />
            <span className="text-gray-400 text-sm">Remember me</span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md ${loading ? "bg-gray-600" : "bg-[#70CCE2] text-black hover:bg-[#5BB8CF]"} font-semibold transition`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <span className="text-[#70CCE2] cursor-pointer" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
