"use client";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function EditTokenPage() {
  const { id } = useParams();
  const router = useRouter();

  // Dummy static data
  const user = {
    name: "Gaurav Singh Kushwaha",
    bio: '"Preserving family legacy through generations"',
    dob: "Born: March 15, 1952",
    location: "Deoria, UP, India",
    job: "UI/UX Designer",
    img: "https://i.pravatar.cc/150",
    balance: 190,
  };

  const tokenHistory = [
    { balance: 190, used: "-", received: "70+", date: "18/07/2025", where: "Admin" },
    { balance: 120, used: "-20", received: "-", date: "18/07/2025", where: "Web" },
    { balance: 140, used: "-10", received: "-", date: "18/07/2025", where: "Tree" },
    { balance: 150, used: "-10", received: "-", date: "18/07/2025", where: "Tree" },
    { balance: 160, used: "-", received: "50+ Token Gift", date: "18/07/2025", where: "Admin" },
  ];

  return (
    <div className="p-4 md:p-10 bg-[#F1FFF8] min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#0A4D27] mb-5 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* ---------------- USER PROFILE CARD ---------------- */}
      <div className="bg-[#CFFFE9] rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          <img
            src={user.img}
            className="w-28 h-28 rounded-lg object-cover border-4 border-[#0A4D27]"
          />

          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="text-gray-600 mt-1">{user.bio}</p>
            <p className="text-sm text-gray-700 mt-2">{user.dob}</p>
            <p className="text-sm text-gray-700">{user.location}</p>

            <p className="text-sm text-gray-700 mt-1">{user.job}</p>
          </div>

          {/* TOKEN BALANCE BADGE */}
          <div className="bg-[#A4412A] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow">
            Token Balance: {user.balance}
          </div>
        </div>
      </div>

      {/* ---------------- NAVIGATION TABS ---------------- */}
      <div className="mt-6 overflow-x-auto">
        <div className="flex border-b">
          {[
            "User Management",
            "Vault Management",
            "Orders",
            "DNA Report",
            "Token request",
            "Support Queries",
          ].map((tab, i) => (
            <button
              key={i}
              className={`px-5 py-3 whitespace-nowrap text-sm border-b-2 ${
                tab === "Token request"
                  ? "border-[#0A4D27] text-[#0A4D27] font-semibold"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- TOKEN REQUEST BOX ---------------- */}
      <div className="bg-[#F8F4EE] p-6 rounded-xl shadow mt-6 border">
        <h3 className="font-semibold text-lg mb-3">Token Request</h3>

        <p className="text-xl font-semibold text-gray-800">120 Tokens</p>
        <p className="text-sm text-gray-700 mb-4">18/07/2025</p>

        <div className="flex gap-4 mt-3">

          <input
            type="text"
            placeholder="Tokens"
            className="border bg-white rounded-lg p-3 w-full"
          />

          <input
            type="text"
            placeholder="Comments"
            className="border bg-white rounded-lg p-3 w-full"
          />

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border rounded-lg shadow text-sm">
              Decline
            </button>

            <button className="px-4 py-2 bg-[#0A4D27] text-white rounded-lg shadow text-sm">
              Approve
            </button>
          </div>

        </div>
      </div>

      {/* ---------------- TOKEN HISTORY ---------------- */}
      <div className="bg-white rounded-xl shadow mt-8 border">
        <h3 className="text-lg font-semibold px-4 py-3 border-b">Token History</h3>

        {/* TABLE HEADER (DESKTOP) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-600 border-b bg-[#F8F4EE]">
          <div className="col-span-2">Balance</div>
          <div className="col-span-2">Used</div>
          <div className="col-span-3">Received</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-2 text-right pr-4">Where</div>
        </div>

        {/* TABLE ROWS */}
        {tokenHistory.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 border-b"
          >
            <div className="md:col-span-2 text-sm">
              <span className="md:hidden font-semibold">Balance: </span>
              {row.balance}
            </div>

            <div className="md:col-span-2 text-sm">
              <span className="md:hidden font-semibold">Used: </span>
              {row.used}
            </div>

            <div className="md:col-span-3 text-sm">
              <span className="md:hidden font-semibold">Received: </span>
              {row.received}
            </div>

            <div className="md:col-span-3 text-sm">
              <span className="md:hidden font-semibold">Date: </span>
              {row.date}
            </div>

            <div className="md:col-span-2 text-right pr-4 text-sm">
              <span
                className={`px-3 py-1 rounded-lg text-white text-xs ${
                  row.where === "Admin"
                    ? "bg-purple-500"
                    : row.where === "Web"
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
              >
                {row.where}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <ChevronLeft className="cursor-pointer text-green-700" />

        <div className="flex gap-2">
          {[1, 2, 3, "...", 9, 10].map((p, i) => (
            <button
              key={i}
              className={`w-9 h-9 rounded-md border flex items-center justify-center text-sm ${
                p === 1
                  ? "bg-[#0A4D27] text-white border-[#0A4D27]"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <ChevronRight className="cursor-pointer text-green-700" />
      </div>
    </div>
  );
}
