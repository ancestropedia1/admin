"use client";

import { useState, useEffect } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hideRightSide, setHideRightSide] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password flow
  const [step, setStep] = useState("login"); // login | email | otp | reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setHideRightSide(window.innerWidth <= 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Login Logic ---
  const handleLogin = () => {
    if (userId !== "LXP387637" || password !== "123456") {
      setError(true);
    } else {
      setError(false);
      alert("Login Successful!");
    }
  };

  // --- Forgot Password Logic ---
  const handleEmailSubmit = () => {
    if (!email.includes("@")) {
      setResetMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setResetMessage("OTP sent to your email!");
    }, 1500);
  };

  const handleOtpSubmit = () => {
    if (otp !== "123456") {
      setResetMessage("Invalid OTP. Try again.");
      return;
    }
    setStep("reset");
    setResetMessage("");
  };

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      setResetMessage("Passwords do not match!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("login");
      setResetMessage("Password reset successful! Please login.");
    }, 1500);
  };

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
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center justify-center bg-[#F3FFF9] p-6 sm:p-10">
        {/* Logo & Text */}
        <div className="text-center mb-8 sm:mb-10">
          <img
            src="/logo.svg"
            alt="Anestropedia Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-3"
          />
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#265A46]`}
          >
            ANESTROPEDIA
          </h2>
          <p
            className={`${inter.className} text-[#265A46] mt-2 font-semibold text-sm sm:text-base`}
          >
            {step === "login"
              ? "Welcome back! Please log in to manage Anestropedia."
              : "Reset your password in simple steps."}
          </p>
        </div>

        {/* LOGIN FORM */}
        {step === "login" && (
          <form
            className={`w-full ${
              hideRightSide ? "max-w-full px-4" : "max-w-sm sm:max-w-md"
            } space-y-4`}
            onSubmit={(e) => e.preventDefault()}
          >
            {/* USER ID */}
            <div>
              <label
                htmlFor="userId"
                className="block text-lg sm:text-xl font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                placeholder="e.g. LXP387637"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className={`mt-1 bg-white mb-2 block w-full border ${
                  error ? "border-red-500" : "border-black"
                } rounded-md p-3 focus:ring-green-700 focus:border-green-700 py-[15px] font-bold`}
              />
            </div>

            {/* PASSWORD */}
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
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mb-2 bg-white block w-full border ${
                  error ? "border-red-500" : "border-black"
                } rounded-md p-3 focus:ring-green-700 focus:border-green-700 py-[15px] font-bold`}
              />
              <div
                className="absolute right-4 top-[45px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-600 text-sm font-semibold mb-3 text-center">
                The password or username you entered is incorrect. Please try again.
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col gap-4 w-full">
              <button
                type="button"
                onClick={handleLogin}
                className="bg-[#FFC300] mt-3 hover:bg-yellow-500 w-full py-[16px] rounded-md font-bold text-2xl shadow-md text-[#265A46]"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-[#F2FAF7] w-full py-[13px] rounded-md hover:bg-[#F9FAF8] shadow-md text-xl text-[#265A46] mt-1 border border-black"
              >
                Executive Login
              </button>
            </div>

            {/* FORGET PASSWORD */}
            <p
              className="text-sm font-bold text-gray-500 text-center mt-5 cursor-pointer hover:text-green-700"
              onClick={() => setStep("email")}
            >
              Forgot Password?
            </p>
          </form>
        )}

        {/* EMAIL STEP */}
        {step === "email" && (
          <div className="max-w-sm w-full space-y-4 text-center">
            <p className="text-gray-700 font-semibold">
              Enter your registered email to receive an OTP.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-md p-3 w-full"
            />
            <button
              onClick={handleEmailSubmit}
              className="bg-[#FFC300] hover:bg-yellow-500 w-full py-3 rounded-md font-bold text-xl shadow-md text-[#265A46]"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Send OTP"}
            </button>
            <p
              className="text-sm text-gray-500 cursor-pointer hover:text-green-700"
              onClick={() => setStep("login")}
            >
              Back to Login
            </p>
            {resetMessage && <p className="text-green-600">{resetMessage}</p>}
          </div>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div className="max-w-sm w-full space-y-4 text-center">
            <p className="text-gray-700 font-semibold">
              Enter the OTP sent to your email.
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-black rounded-md p-3 w-full"
            />
            <button
              onClick={handleOtpSubmit}
              className="bg-[#FFC300] hover:bg-yellow-500 w-full py-3 rounded-md font-bold text-xl shadow-md text-[#265A46]"
            >
              Verify OTP
            </button>
            {resetMessage && <p className="text-red-600">{resetMessage}</p>}
          </div>
        )}

        {/* RESET PASSWORD STEP */}
        {step === "reset" && (
          <div className="max-w-sm w-full space-y-4 text-center">
            <p className="text-gray-700 font-semibold">Enter your new password.</p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-black rounded-md p-3 w-full"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-black rounded-md p-3 w-full"
            />
            <button
              onClick={handlePasswordReset}
              className="bg-[#FFC300] hover:bg-yellow-500 w-full py-3 rounded-md font-bold text-xl shadow-md text-[#265A46]"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Reset Password"
              )}
            </button>
            {resetMessage && <p className="text-green-600">{resetMessage}</p>}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      {!hideRightSide && (
        <div className="flex flex-col justify-center bg-[#265A46] text-white p-8 sm:p-10 items-center">
          <h2
            className={`${playfair.className} text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 text-center`}
          >
            Anestropedia Admin
          </h2>
          <h2
            className={`${playfair.className} text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 text-center`}
          >
            Panel
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
                  className="rounded-md object-cover w-[88px] h-[65px] flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}