"use client";
import {
  Lightbulb,
  CalendarDays,
  UserCheck,
  ClipboardCheck,
  User,
} from "lucide-react";
import { Lato, Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function AddUserPage() {
  return (
    <main className="flex-1 w-full min-h-screen  p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mt-4 md:mt-8">
      {/* Back link */}
      <div>
        <Link
          href="#"
          className={`${lato.className} text-sm sm:text-base md:text-lg text-green-700 font-medium hover:underline`}
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Header Section */}
      <div className="bg-[#F6F1E9] border mt-7 border-[#faead2] p-4 sm:p-6 md:p-8 rounded-md shadow-sm w-full min-h-[265px]">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
    {/* Left Side */}
    <div className="flex-1 lg:mt-10">
      <h1
        className={`${playfair.className} lg:pr-73 text-2xl sm:text-3xl md:text-xl xl:text-5xl font-extrabold text-gray-800 mt-4 sm:mt-6 md:mt-0`}
      >
        Add New User
      </h1>
      <p
        className={`${lato.className} text-sm lg:pr-8 sm:text-base md:text-lg font-medium text-gray-600 mt-2 md:mt-4 max-w-md md:max-w-lg`}
      >
        Manually add user details to Anestropedia’s database and help expand our heritage community.
      </p>
    </div>

    {/* (Optional) Right Side */}
    {/* You can add a form button or image here if needed */}
  


          {/* Right Side Button */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <button className="bg-[#265A46] shadow-sm font-bold text-sm sm:text-base md:text-lg xl:text-xl text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-green-700 flex items-center justify-center gap-2 w-full md:w-auto transition-all">
              <span className="text-lg sm:text-xl font-bold">+</span>
              <span>Add User Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 xl:gap-10 mt-6">
        {/* Quick Tips */}
        <div className="bg-[#F6F1E9] border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-sm w-full">
          <div className="mb-4 sm:mb-6">
            <h2
              className={`${playfair.className} text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold flex items-center gap-2`}
            >
              <span className="bg-yellow-100 text-yellow-700 p-2 rounded-full text-lg sm:text-xl">
                💡
              </span>
              Quick Tips
            </h2>
            <p
              className={`${lato.className} sm:pr-17 text-xs lg:pl-10 sm:text-sm md:text-base mt-1 text-gray-700`}
            >
              Best practices for adding new users
            </p>
          </div>

          <div className="space-y-4 font-medium text-xs sm:text-sm md:text-base">
            {[
              {
                icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
                title:
                  "Remember to input the user’s full name, date of birth, and place of birth",
                desc: "Please ensure all fields are complete for accurate user creation.",
              },
              {
                icon: <CalendarDays className="w-5 h-5 text-green-500" />,
                title: "Please verify the accuracy of the date of birth",
                desc: "Ensure DOB is correct for automatic family tree linking.",
              },
              {
                icon: <UserCheck className="w-5 h-5 text-blue-500" />,
                title: "Fill in other details only if verified",
                desc: "Ensure parent and spouse details are accurate before entry.",
              },
              {
                icon: <ClipboardCheck className="w-5 h-5 text-purple-500" />,
                title: "Double-check all details before submission",
                desc: "Ensure integrity of our database by confirming accuracy.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 md:p-5 border bg-white shadow-md rounded-md flex items-start gap-3"
              >
                <div>{tip.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{tip.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#F6F1E9] border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-sm w-full">
          <h2
            className={`${playfair.className}  sm:pr-40 sm:text-2xl md:text-3xl xl:text-3xl font-bold mb-3 sm:mb-5`}
          >
            Recent Activity
          </h2>

          <input
            type="text"
            placeholder="Search added user..."
            className="border bg-white border-gray-300 shadow-md rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base w-full mb-5 focus:outline-none focus:ring-1 focus:ring-green-700"
          />

          <div className="space-y-3 sm:space-y-4">
            {[
              { name: "Ravi Verma", time: "Added 3 hours ago" },
              { name: "Archana Dubey", time: "Added 5 hours ago" },
              { name: "Ankita Yadav", time: "Added yesterday" },
              { name: "Prashant Tomar", time: "Added on 3rd March 2025" },
            ].map((user, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 sm:p-4 bg-white border border-gray-100 rounded-md shadow-md"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                  <User className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">
                    {user.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {user.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
