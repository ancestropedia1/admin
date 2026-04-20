"use client";

import React from "react";
import { ArrowRightFromLine } from "lucide-react";
import { Lato, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Header() {
  return (
    <div className="bg-[#F4EFE8] rounded-xl border shadow-sm p-8 flex justify-between items-center">
      <div>
        <h1 className={`${playfair.className} text-4xl font-bold text-[#333]`}>
          Wall Art
        </h1>

        <p className={`${lato.className} text-gray-600 mt-2`}>
          Upload, verify, and publish DNA reports with complete accuracy and
          control.
        </p>
      </div>

      <button className="bg-[#25543E] hover:bg-[#1f4634] text-white px-5 py-3 rounded-lg flex items-center gap-2 font-medium">
        <ArrowRightFromLine size={18} />
        Export List
      </button>
    </div>
  );
}