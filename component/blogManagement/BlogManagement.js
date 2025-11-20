"use client";
import React from "react";
import { Lato, Playfair_Display } from "next/font/google";
import { Pencil, Trash2 } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const BlogManagement = () => {
  const blogs = [
    {
      title:
        "Unlocking the Secrets: Understanding Hereditary Traits and Genetic Inheritance",
      author: "Dr. Anant Narayan",
      date: "Kanpur",
    },
    {
      title:
        "Exploring Ancestral Trails: How DNA Analysis Illuminates Migration Footprints",
      author: "Dr. Rajesh Chaudhary",
      date: "Female",
    },
    {
      title:
        "Family Tree Connection: Exploring the Bonds of Kinship and Heritage",
      author: "Balram Chaurasia",
      date: "Lucknow",
    },
    {
      title: "A Canvas of Kin: Crafting Family Tree Wall Art",
      author: "Anuj Bharti",
      date: "Gorakhpur",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full max-w-[1100px] mx-auto">

     

      {/* Header */}
      <div className="bg-[#F6F1E9] border mt-7 border-[#faead2] p-4 sm:p-6 md:p-8 rounded-md shadow-sm w-full min-h-[265px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
              
              {/* Left Side */}
              <div className="flex-1 lg:mt-10">
                <h1
                  className={`${playfair.className} text-2xl sm:text-3xl md:text-xl xl:text-5xl font-extrabold text-gray-800 mt-4 sm:mt-6 md:mt-0`}
                >
                  Blog Management
                </h1>
                <p
                  className={`${lato.className} text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-2 md:mt-4 max-w-md md:max-w-xl`}
                >
                  Craft compelling Ancestropedia blog posts, refine existing content, and efficiently oversee all blog-related activities to engage our community and share the wonders of genealogy.
                </p>
              </div>

              {/* RIGHT BUTTON (WITH LOGIC) */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-[#265A46] shadow-sm font-bold text-sm sm:text-base md:text-lg xl:text-xl text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-green-700 flex items-center justify-center gap-2 w-full md:w-auto transition-all"
                >
                  <span className="text-xl sm:text-xl font-bold">+</span>
                  <span>Add</span>
                </button>
              </div>

            </div>
          </div>


      {/* Filters */}
      <div className="hidden mt-10 md:grid grid-cols-12 gap-4 bg-[#F6F1E9] p-3 rounded-md mb-4 font-semibold text-gray-700 w-full">
     
        
        <button className="border col-span-2 rounded-md text-sm bg-white hover:bg-gray-50">
         Post Date
        </button>
        
        <button className="border col-span-2 rounded-md text-sm bg-white hover:bg-gray-50">
         By Auther
        </button>
        <button className="border col-span-2 rounded-md text-sm bg-white hover:bg-gray-50">
          Featured Blogs
        </button>

        <input
          type="text"
          placeholder="Search added user…"
          className="border px-6 py-4 rounded-md text-sm pl-40 text-black text-right"
        />
      </div>

      {/* Active Blogs */}
      <div className="mt-10 bg-[#F6F1E9] border border-[#E8DCC7] rounded-xl p-6">
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">Active Blogs</h2>

        {/* Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-[#C6C1C1] p-3 rounded-md mb-4 font-semibold text-gray-700">
          <div className="col-span-5">Blogs</div>
          <div className="col-span-3">Author</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {/* Blog Rows */}
        <div className="flex flex-col gap-4">
          {blogs.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4"
            >
              {/* Left Box */}
              <div className="bg-white md:col-span-5 p-4 rounded-md border border-[#E8DCC7]">
                <p className="text-sm text-gray-700">{item.title}</p>
              </div>

              {/* Right Box */}
              <div className="bg-white md:col-span-7 p-4 rounded-md border border-[#E8DCC7] grid grid-cols-3 md:grid-cols-12 items-center gap-3">
                
                {/* Author */}
                <div className="col-span-3 md:col-span-5 text-sm text-gray-700">
                  <span className="md:hidden font-semibold">Author: </span>
                  {item.author}
                </div>

                {/* Date */}
                <div className="col-span-3 md:col-span-4 text-sm text-gray-700">
                  <span className="md:hidden font-semibold">Date: </span>
                  {item.date}
                </div>

                {/* Actions */}
                <div className="col-span-3 md:col-span-3 flex justify-center gap-4">
                  <Pencil className="w-5 h-5 text-green-700 cursor-pointer" />
                  <Trash2 className="w-5 h-5 text-red-700 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
