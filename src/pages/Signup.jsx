import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ApiService from "../api/ApiService";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Musician"); // Toggle between 'Musician' and 'Industry Professional'

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [apiError, setApiError] = useState(""); // Store API error messages
  const [imagePreview, setImagePreview] = useState(null);

  // Background images based on user type
  const backgroundImage =
    userType === "Musician"
      ? "src/assets/musician-bg.jpg" // Replace with actual path
      : "src/assets/industry-bg.jpg"; // Replace with actual path

  const onSubmit = async (data) => {
    if (userType === "Industry Professional") {
      alert("Industry Professional Page is under maintenance,Sign-Up as Musician.Thankyou!");
      return;
    }
    if (!isChecked) {
      setError("agreement", { type: "manual", message: "You must accept the terms" });
      return;
    }
    setLoading(true); // Start loading
    setApiError(""); // Reset previous error


    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.confirmPassword);
    formData.append("image", data.image[0]);

    try {
      const response = await ApiService.register(formData);

      console.log("Registration successful:", response.data);

      // Store token in local storage (Modify based on backend response)
      const { token, user } = response.data; // Ensure token exists
      if (token && user?.id) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", user.id);  // ✅ Store userId
      } else {
        console.error("Token is missing in API response:", response.data);
      }

      navigate("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setApiError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex bg-[#0D0D0D] h-screen p-24">
      {/* Left Section */}
      <div className="flex flex-col bg-center bg-cover justify-center p-10 rounded-[10px] w-1/2 overflow-hidden relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-black/60 absolute inset-0"></div>
        <div className="flex flex-col h-full justify-between items-center z-10">
          <div className="flex flex-col justify-center text-center items-center px-8">
            <h2 className="text-5xl text-white font-bold">
              Get started with <span className="text-[#70CCE2]">TuneFolio</span>
            </h2>
            <p className="text-2xl text-white mt-2">
              Join a thriving music community, showcase, connect, and grow your career.
            </p>
          </div>


          {/* Toggle User Type */}
          <div className="flex flex-col h-[30%] w-[90%]">
            <div className="flex bg-white/30 p-1 rounded-full w-full mt-6" style={{ backdropFilter: 'blur(10px)' }}>
              <button
                className={`flex-1 py-2 rounded-full font-semibold text-xl transition-all duration-300 ease-in-out ${userType === "Musician" ? "bg-white text-black" : "text-white"}`}
                onClick={() => setUserType("Musician")}
              >
                Musician
              </button>
              <button
                className={`flex-1 py-2 rounded-full font-semibold text-xl transition-all duration-300 ease-in-out ${userType === "Industry Professional" ? "bg-white text-black" : "text-white"}`}
                onClick={() => setUserType("Industry Professional")}
              >
                Industry Professionals
              </button>
            </div>
            {userType === "Industry Professional" && (
              <p className="text-center text-md text-red-500 mt-2">Industry Professionals page is under maintenance.</p>
            )}
          </div>


          <div className="text-center">
            <h3 className="text-2xl text-white font-bold">
              Showcase Your Sound to the World
            </h3>
            <p className="text-gray-300">
              Upload your tracks, build your portfolio, and connect with industry professionals.
            </p>
          </div>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex bg-[#0D0D0D] justify-center w-1/2 items-center">
        <div className="bg-[#121212] p-8 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-2xl text-center text-white font-semibold mb-6">Sign Up</h2>

          {/* Social Sign-Up */}
          <div className="flex gap-4 mb-4">
            <button className="flex flex-1 border border-[#303030] justify-center rounded-md text-white cursor-pointer gap-2 items-center px-4 py-2">
              <img src="src/assets/google.svg" alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button className="flex flex-1 border border-[#303030] justify-center rounded-md text-white cursor-pointer gap-2 items-center px-4 py-2">
              <img src="src/assets/apple.svg" alt="Apple" className="h-5 w-5" />
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="text-center text-gray-400 my-4">or with email</div>

          {/* Display API Error */}
          {apiError && <p className="text-center text-red-500 mb-4">{apiError}</p>}

          {/* Sign-Up Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              className="bg-[#191919] border border-[#303030] p-3 rounded-md text-white w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Email */}
            <input
              type="email"
              placeholder="E-mail"
              className="bg-[#191919] border border-[#303030] p-3 rounded-md text-white w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <div className="relative">
              {/* Password */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-[#191919] border border-[#303030] p-3 rounded-md text-white w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {/* Toggle Eye Icon */}
              <button
                type="button"
                className="text-gray-400 -translate-y-1/2 absolute right-3 top-[50%] transform"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="relative">
              {/* Confirm Password */}
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="bg-[#191919] border border-[#303030] p-3 rounded-md text-white w-full"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              {/* Toggle Eye Icon */}
              <button
                type="button"
                className="text-gray-400 -translate-y-1/2 absolute right-3 top-[50%] transform"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <input type="file" accept="image/*" className="bg-[#191919] border border-[#303030] p-2 rounded-md text-white w-full" {...register("image", { required: "Profile image is required" })} onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            {imagePreview && <img src={imagePreview} alt="Preview" className="h-20 rounded-full w-20 mt-2" />}

            {/* Agreement Checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                  if (!isChecked) clearErrors("agreement");
                }}
              />
              <span className="text-gray-400 text-sm">
                I agree to the <a href="#" className="text-[#70CCE2]">Terms & Privacy Policy</a>
              </span>
            </div>
            {errors.agreement && <p className="text-red-500 text-sm">{errors.agreement.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#70CCE2] rounded-md text-black w-full font-semibold hover:bg-[#5BB8CF] py-3 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <span
              className="text-[#70CCE2] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
