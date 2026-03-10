"use client";
import Card from "../Cards";
import PlanCard from "../PlanCards";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  Search,
  Coins,
  Clock4,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { axiosInstance } from "../../config/axios.js"; // Adjust path as needed

export default function TokenManagement() {
  const router = useRouter();

  // ---------------- DUMMY STATIC DATA ----------------
  const dummyRequests = [
    { _id: "1", user: "Anant", userId: "USR101", tokens: 200, date: new Date(), status: "Pending" },
    { _id: "2", user: "Rohan", userId: "USR102", tokens: 150, date: new Date(), status: "Approved" },
    { _id: "3", user: "Sneha", userId: "USR103", tokens: 500, date: new Date(), status: "Declined" },
    { _id: "4", user: "Aditya", userId: "USR104", tokens: 300, date: new Date(), status: "Pending" },
  ];

  // ---------------- STATE ----------------
  const [requests, setRequests] = useState(dummyRequests);
  const [plans, setPlans] = useState([]); // Changed from dummyPlans
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = 1;

  // ---------------- POPUP STATE ----------------
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState("");

  // ---------------- FETCH TOKEN PLANS ----------------
  useEffect(() => {
    const fetchTokenPlans = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/admin/tokenplan/getAdminTokenPlans");
        
        if (response.data.success) {
          // Transform the API data into the format expected by PlanCard
          const planData = [
            {
              _id: "free",
              title: "Free Plan",
              tokens: response.data.data.FreePlan
            },
            {
              _id: "standard",
              title: "Standard Plan",
              tokens: response.data.data.StandardPlan
            },
            {
              _id: "pro",
              title: "Pro Plan",
              tokens: response.data.data.ProPlan
            }
          ];
          setPlans(planData);
        }
      } catch (err) {
        console.error("Error fetching token plans:", err);
        setError("Failed to load token plans");
        
        // Fallback to dummy data if API fails
        setPlans([
          { _id: "p1", title: "Free Plan", tokens: 200 },
          { _id: "p2", title: "Standard Plan", tokens: 1200 },
          { _id: "p3", title: "Pro Plan", tokens: 2500 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenPlans();
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-[#F1FFF8] min-h-screen">
      
      {/* ---------- PAGE TITLE ---------- */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Token Management</h1>
        <p className="text-orange-500 mt-1">
          High number of pending token requests (Approve now)
        </p>
      </div>

      {/* ---------- TOP STATS CARDS ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <Card icon={<Coins className="w-7 h-7 text-yellow-600" />} value="120" label="Total Token Request" />
        <Card icon={<Clock4 className="w-7 h-7 text-orange-500" />} value="45" label="Pending Requests" />
        <Card icon={<CheckCircle className="w-7 h-7 text-green-600" />} value="68" label="Approved Request" />
        <Card icon={<XCircle className="w-7 h-7 text-red-500" />} value="7" label="Declined Request" />
        <Card icon={<Coins className="w-7 h-7 text-purple-600" />} value="12,598" label="Token Issued" />
      </div>

      {/* ---------- FILTERS UI ---------- */}
      <div className="bg-[#F6F1E9] p-4 rounded-md shadow mt-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex justify-center gap-2">
          <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
            By Date <CalendarDays size={18} className="mt-1" />
          </button>

          <button className="flex bg-white px-4 py-2 rounded-md shadow-sm">
            By Status <ChevronDown size={18} className="mt-1" />
          </button>
        </div>

        <div className="flex bg-white rounded-md px-3 py-2 w-full md:w-1/3 shadow-sm">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search added user..."
            className="w-full ml-2 outline-none"
          />
        </div>
      </div>

      {/* ---------- TOKEN REQUESTS TABLE ---------- */}
      <div className="bg-white mt-8 rounded-lg shadow">
        <div className="bg-[#F9F4EB] border-b-2 p-4 text-xl font-semibold text-gray-800">
          Tokens Requests
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9F4EB] text-gray-700 text-sm">
                <th className="p-4">User</th>
                <th className="p-4">Token Request</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100">

                  {/* USER */}
                  <td className="p-4 flex items-center gap-3">
                    <img src="/user.png" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.user}</div>
                      <div className="text-xs text-gray-500">ID-{item.userId}</div>
                    </div>
                  </td>

                  {/* TOKENS */}
                  <td className="p-4">{item.tokens} Tokens</td>

                  {/* DATE */}
                  <td className="p-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  {/* STATUS (CLICK TO OPEN POPUP) */}
                  <td className="p-4">
                    <span
                      onClick={() => {
                        setSelectedRequest(item);
                        setShowPopup(true);
                      }}
                      className={`cursor-pointer px-3 py-1 text-sm hover:bg-orange-200 transition ${
                        item.status === "Pending"
                          ? "text-yellow-600"
                          : item.status === "Declined"
                          ? "text-red-600"
                          : item.status === "Approved"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => router.push(`/token-management/${item._id}`)}
                      className="px-3 py-1 hover:bg-gray-300 transition text-sm rounded bg-purple-200 text-purple-700"
                    >
                      Edit
                    </button>

                    <button className="px-3 py-1 hover:bg-gray-300 transition text-sm rounded bg-green-200 text-green-700">
                      Approve
                    </button>

                    <button className="px-3 py-1 hover:bg-gray-300 transition text-sm rounded bg-red-200 text-red-700">
                      Decline
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ---------- PAGINATION ---------- */}
        <div className="p-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded opacity-40">
              <ChevronLeft />
            </button>
            <button className="px-3 py-1 border rounded opacity-40">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- TOKEN PLANS (FROM DATABASE) ---------- */}
      <div className="mt-12 grid bg-[#F6F1E9] gap-5 p-5 rounded-md border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Token Plan Allocations</h2>
        
        {loading ? (
          <div className="text-center py-8">Loading plans...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <PlanCard
                key={plan._id}
                title={plan.title}
                tokens={`${plan.tokens} Tokens`}
                color="bg-white"
              />
            ))}
          </div>
        )}
      </div>

      {/* ---------- STATUS POPUP UI (FIGMA STYLE) ---------- */}
      {showPopup && selectedRequest && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[15%] h-[45%] max-w-md border-2 border-gray-300">

            {/* HEADER */}
            <div className="bg-green-900 text-white p-3 rounded-t-lg text-lg font-semibold">
              Comments
            </div>

            {/* BODY */}
            <div className="p-4 space-y-3">
              <p className="text-gray-700">
                <strong>Token Request:</strong> {selectedRequest.tokens}
              </p>

              <p className="text-gray-700">
                <strong>Approved Token:</strong>{" "}
                {selectedRequest.status === "Approved" ? selectedRequest.tokens - 50 : 0}
              </p>

              {/* COMMENT BOX */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comments for your response..."
                className="w-full border rounded-md p-2 h-20 outline-none focus:ring"
              ></textarea>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-2 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  alert("Status updated!");
                  setShowPopup(false);
                }}
                className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}