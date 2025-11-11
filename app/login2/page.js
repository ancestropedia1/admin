"use client";

import { useState, useEffect } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { axiosInstance } from "../../config/axios.js";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });

export default function LoginPage() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State for UI interactions
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hideRightSide, setHideRightSide] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle window resize to show/hide right side on mobile
  useEffect(() => {
    const handleResize = () => {
      setHideRightSide(window.innerWidth <= 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Handle login form submission
   * Sends email and password to the authentication API
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Basic validation
    if (!email || !password) {
      setError(true);
      setErrorMessage("Please enter both email and password");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address");
      return;
    }



    setIsLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      // API call to login endpoint

      const response = await axiosInstance.post("admin/auth/login",{email,password});

            console.log(response.data," data from login response (inside frontend login2 page)");

        
    
      // Check if login was successful
      
    } catch (error) {
      // Network error or other issues
      console.error("Login error:", error);
      setError(true);
      setErrorMessage("incorrect details. Please check email and password.");

    } finally {
      setIsLoading(false);
    }
  };


   // Handle form submission (same as handleLogin but for form onSubmit)

  const handleSubmit = (e) => {
    handleLogin(e);
  };

  // Image assets for the right side panel
  const roverImages = [
    "/rover1.webp",
    "/rover2.webp",
    "/rover3.webp",
    "/rover4.webp",
    "/rover5.webp",
    "/rover6.webp",
    "/rover7.webp",
    "/rover8.webp",
    "/rover9.webp",
    "/rover10.webp",
    "/heritage.webp",
  ];

  return (
    <div
      className={`min-h-screen grid ${
        hideRightSide ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {/* LEFT SIDE - Login Form */}
      <div className="flex flex-col items-center justify-center bg-[#F3FFF9] p-6 sm:p-10">
        {/* Logo & Welcome Text */}
        <div className="text-center mb-8 sm:mb-10">
          <img
            src="/logo.svg"
            alt="Anestropedia Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-3"
          />
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#265A46]`}
          >
            ANCESTROPEDIA
          </h2>
          <p
            className={`${inter.className} text-[#265A46] mt-2 font-semibold text-sm sm:text-base`}
          >
            Welcome back! Please log in to manage Ancestropedia.
          </p>
        </div>

        {/* Login Form */}
        <form
          className={`w-full ${
            hideRightSide ? "max-w-full px-4" : "max-w-sm sm:max-w-md"
          } space-y-4`}
          onSubmit={handleSubmit}
        >
          {/* EMAIL FIELD */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg sm:text-xl font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 bg-white mb-2 block w-full border ${
                error ? "border-red-500" : "border-black"
              } rounded-md p-3 focus:ring-green-700 focus:border-green-700 py-[15px] font-bold`}
              disabled={isLoading}
            />
          </div>

          {/* PASSWORD FIELD */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-lg sm:text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mb-2 bg-white block w-full border ${
                error ? "border-red-500" : "border-black"
              } rounded-md p-3 focus:ring-green-700 focus:border-green-700 py-[15px] font-bold`}
              disabled={isLoading}
            />
            {/* Password visibility toggle */}
            <div
              className="absolute right-4 top-[45px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </div>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <p className="text-red-600 text-sm font-semibold mb-3 text-center">
              {errorMessage}
            </p>
          )}

          {/* LOGIN BUTTONS */}
          <div className="flex flex-col gap-4 w-full">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#FFC300] mt-3 hover:bg-yellow-500 w-full py-4 rounded-md font-bold text-2xl shadow-md text-[#265A46] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className="bg-[#F2FAF7] w-full py-[13px] rounded-md hover:bg-[#F9FAF8] shadow-md text-xl text-[#265A46] mt-1 border border-black"
              disabled={isLoading}
            >
              Executive Login
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - Branding and Images */}
      {!hideRightSide && (
        <div className="flex flex-col justify-center bg-[#265A46] text-white p-8 sm:p-10 items-center">
           <h2
            className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center`}
          >
            Anestropedia
             <span className="mt-10" style={{display:"inline-block", marginTop:"10px",marginLeft:"15px"}}> Admin</span>
            <br></br>
            <span className="mt-10" style={{display:"block", marginTop:"10px"}}> Panel</span>
          </h2>

          <p
            className={`${inter.className} text-center leading-relaxed mt-5 sm:mt-7 text-sm sm:text-base`}
          >
            Powering the preservation of heritage, family stories, and DNA insights
            across generations.
          </p>
          <p
            className={`${inter.className} text-center leading-relaxed mb-6 text-sm sm:text-base`}
          >
            Because every story deserves to be remembered.
          </p>

          {/* Image Carousel */}
          <div
            className="overflow-hidden w-[300px] sm:w-[500px] flex items-center justify-center"
            role="presentation"
          >
            <div className="flex gap-3 animate-scroll w-max">
              {[...roverImages, ...roverImages].map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Cultural representation ${index + 1}`}
                  width={88}
                  height={65}
                  className="rounded-md object-cover w-[88px] h-[65px] shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}