"use client";

import React, { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Page = () => {
  const [showRightSide, setShowRightSide] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Hide right side for phones (≤430px) and iPads (≤1024px)
      if (width <= 1024) {
        setShowRightSide(false);
      } else {
        setShowRightSide(true);
      }
    };

    handleResize(); // Run once when component loads
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className={`min-h-screen grid transition-all duration-300 ${
        showRightSide ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center justify-center bg-[#F3FFF9] p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.svg" alt="Anestropedia Logo" className="w-25 h-25 mb-3" />
          <h1
            className={`${playfair.className} text-2xl font-semibold tracking-wide text-[#265A46] mb-4`}
          >
            ANCESTROPEDIA
          </h1>
          <p
            className={`${inter.className} text-[#265A46] mt-2 mb-4 text-center font-bold`}
          >
            Welcome back! Please log in to manage Anestropedia.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Link href="/login2">
          <button href="/login2" className="bg-[#FFC300] hover:bg-yellow-500 w-full py-[16px] rounded-md font-bold text-lg sm:text-xl md:text-2xl shadow-md text-[#265A46] transition-all duration-200">
            Admin Login
          </button>
            </Link>
          <button className="bg-[#FFC300] hover:bg-yellow-500 w-full py-[16px] rounded-md font-bold text-lg sm:text-xl md:text-2xl shadow-md text-[#265A46] mt-2 transition-all duration-200">
            Executive Login
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {showRightSide && (
        <div className="flex flex-col justify-center bg-[#265A46] text-white p-10 items-center">
          <h2
            className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center`}
          >
            Anestropedia Admin
          </h2>
          <h2
            className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center`}
          >
            Panel
          </h2>
          <p className={`${inter.className} text-center leading-relaxed mt-7 text-sm sm:text-base`}>
            Powering the preservation of heritage, family stories, and DNA
            insights across generations.
          </p>
          <p
            className={`${inter.className} text-center leading-relaxed mb-6 text-sm sm:text-base`}
          >
            Because every story deserves to be remembered.
          </p>

          {/* Image Row */}
          <div
            className="overflow-hidden w-[300px] sm:w-[400px] md:w-[500px] flex items-center justify-center"
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
};

export default Page;