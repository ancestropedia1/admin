"use client";
import {
  Search,
  Calendar,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function UserManagement() {
  const users = [
    {
      id: 1,
      name: "Anant Narayan",
      dob: "18/08/2000",
      gender: "Male",
      city: "Kanpur",
      profession: "Engineer",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 2,
      name: "Rajesh Chaudhary",
      dob: "28/06/1996",
      gender: "Female",
      city: "Agra",
      profession: "Teacher",
      img: "https://i.pravatar.cc/100?img=22",
    },
    {
      id: 3,
      name: "Balram Chaurasia",
      dob: "12/02/1984",
      gender: "Female",
      city: "Lucknow",
      profession: "Software Engineer",
      img: "https://i.pravatar.cc/100?img=36",
    },
    {
      id: 4,
      name: "Anuj Bharti",
      dob: "02/12/2005",
      gender: "Male",
      city: "Gorakhpur",
      profession: "Software Engineer",
      img: "https://i.pravatar.cc/100?img=10",
    },
  ];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#EEF9F4]">

      {/* -------------------- FILTER BOX -------------------- */}
      <div className="bg-[#F6F1E9] p-6 rounded-xl shadow-sm">

        {/* SEARCH ROW */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white w-full rounded-lg px-4 py-3 text-gray-600 shadow-sm border">
            <Search className="w-5 h-5 mr-3" />
            <input
              className="w-full outline-none text-sm"
              type="text"
              placeholder="Search User by name, User Id & email."
            />
          </div>

          <button className="bg-[#0A4D27] text-white px-8 py-3 rounded-lg text-sm shadow-md whitespace-nowrap">
            Search User
          </button>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 items-center mt-5">

          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 text-sm">
            Date of Birth <Calendar className="w-4 h-4" />
          </button>

          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 text-sm">
            Gender <ChevronDown className="w-4 h-4" />
          </button>

          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 text-sm">
            Birth City <ChevronDown className="w-4 h-4" />
          </button>

          <button className="bg-[#8B4B26] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md">
            <Filter className="w-4 h-4" /> Filter
          </button>

        </div>
      </div>

      {/* -------------------- USER LIST TABLE (FIGMA EXACT LAYOUT) -------------------- */}
<div className="bg-white rounded-xl  mt-8  shadow-sm">
  <h2 className="text-lg font-semibold border-b p-4 text-[#1C1C1C] mb-4">
    User Lists
  </h2>

  {/* ---------------- HEADER (TWO SEPARATE SECTIONS) ---------------- */}
  <div className="hidden md:grid grid-cols-12 gap-4 p-2">

    {/* LEFT HEADER */}
    <div className="col-span-3">
      <div className="bg-[#F6F1E9] py-3 px-4 border border-[#E4D9C6] rounded-xl text-sm font-semibold text-gray-700">
        User
      </div>
    </div>

    {/* RIGHT HEADER */}
    <div className="col-span-9">
      <div className=" grid grid-cols-9 py-3 px-4 border-b text-sm font-semibold text-gray-700">
        <div className="col-span-3">DOB</div>
        <div className="col-span-2">Gender</div>
        <div className="col-span-2">Birth City</div>
        <div className="col-span-2 text-right pr-4">Profession</div>
      </div>
    </div>

  </div>

  {/* ---------------------- ROWS (FOLLOW FIGMA STYLE) ---------------------- */}
  {users.map((user, index) => (
    <div key={index} className="grid grid-cols-12 gap-4 mt-4 p-2">

      {/* LEFT USER BOX */}
      <div className="col-span-3">
        <div className="bg-[#F6F1E9] flex items-center gap-3 py-3 px-4 rounded-xl border border-[#E4D9C6]">
          <img
            src={user.img}
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />
          <div className="text-sm font-medium">{user.name}</div>
        </div>
      </div>

      {/* RIGHT DATA BOX */}
      <div className="col-span-9">
        <div className="bg-[#F6F1E9] grid grid-cols-9 rounded-xl py-3 px-4 border border-[#E4D9C6] items-center">
          
          <div className="col-span-3 text-sm">{user.dob}</div>

          <div className="col-span-2 text-sm">{user.gender}</div>

          <div className="col-span-2 text-sm">{user.city}</div>

          <div className="col-span-2 text-green-700 font-semibold text-sm text-right pr-4 cursor-pointer hover:underline">
            {user.profession}
          </div>

        </div>
      </div>

    </div>
  ))}
</div>


      {/* -------------------- PAGINATION -------------------- */}
      <div className="mt-6 flex justify-center items-center gap-4">
        
        <ChevronLeft className="text-green-700 cursor-pointer" />

        <div className="flex gap-2">
          {["1", "2", "3", "...", "9", "10"].map((num, i) => (
            <button
              key={i}
              className={`w-9 h-9 flex items-center justify-center rounded-md border text-sm ${
                num === "1"
                  ? "bg-[#0A4D27] text-white border-[#0A4D27]"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <ChevronRight className="text-green-700 cursor-pointer" />
      </div>

    </div>
  );
}
