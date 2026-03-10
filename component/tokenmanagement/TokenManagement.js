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
  Save, 
  X
} from "lucide-react";
import { axiosInstance } from "../../config/axios.js";

export default function TokenManagement() {
  const router = useRouter();

  // ---------------- DUMMY STATIC DATA ----------------
  const dummyRequests = [
    { _id: "1", user: "Anant", userId: "USR101", tokens: 200, date: "2026-03-10", status: "Pending" },
    { _id: "2", user: "Rohan", userId: "USR102", tokens: 150, date: "2026-03-09", status: "Approved" },
    { _id: "3", user: "Sneha", userId: "USR103", tokens: 500, date: "2026-03-08", status: "Declined" },
    { _id: "4", user: "Aditya", userId: "USR104", tokens: 300, date: "2026-03-07", status: "Pending" },
  ];

  // ---------------- STATE ----------------
  const [requests, setRequests] = useState(dummyRequests);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  const [page, setPage] = useState(1);
  const totalPages = 1;

  const [editingPlan, setEditingPlan] = useState(null);
  const [editValues, setEditValues] = useState({
    FreePlan: 0,
    StandardPlan: 0,
    ProPlan: 0
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // ---------------- POPUP STATE ----------------
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState("");

  // ---------------- HYDRATION FIX ----------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ---------------- FETCH TOKEN PLANS ----------------
  useEffect(() => {
    const fetchTokenPlans = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/admin/tokenplan/getAdminTokenPlans");
        
        if (response.data.success) {
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

  const handleModifyClick = (plan) => {
    setEditingPlan(plan);
    setEditValues({
      FreePlan: plans.find(p => p.title === "Free Plan")?.tokens || 0,
      StandardPlan: plans.find(p => p.title === "Standard Plan")?.tokens || 0,
      ProPlan: plans.find(p => p.title === "Pro Plan")?.tokens || 0
    });
  };

  const handleSavePlans = async () => {
    try {
      setIsUpdating(true);
      const response = await axiosInstance.post("/admin/tokenplan/modifyTokenPlan", editValues);
      
      if (response.data.success) {
        setPlans([
          { _id: "free", title: "Free Plan", tokens: editValues.FreePlan },
          { _id: "standard", title: "Standard Plan", tokens: editValues.StandardPlan },
          { _id: "pro", title: "Pro Plan", tokens: editValues.ProPlan }
        ]);
        setEditingPlan(null);
        alert("Token plans updated successfully!");
      }
    } catch (error) {
      console.error("Error updating plans:", error);
      alert("Failed to update token plans");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!mounted) {
    return null;
  }

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
                  <td className="p-4 flex items-center gap-3">
                    <img src="/user.png" className="w-10 h-10 rounded-full object-cover" alt="user" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.user}</div>
                      <div className="text-xs text-gray-500">ID-{item.userId}</div>
                    </div>
                  </td>
                  <td className="p-4">{item.tokens} Tokens</td>
                  <td className="p-4">
                    {item.date}
                  </td>
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

      {/* ---------- TOKEN PLANS SECTION ---------- */}
      <div className="mt-12 bg-[#F6F1E9] p-5 rounded-md border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Token Plan Allocations</h2>
        
        {loading ? (
          <div className="text-center py-8">Loading plans...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div key={plan._id} onClick={() => handleModifyClick(plan)} className="cursor-pointer">
                <PlanCard
                  title={plan.title}
                  tokens={`${plan.tokens} Tokens`}
                  color="bg-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- MODIFY ALLOCATION MODAL ---------- */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            
            {/* Header */}
            <div className="bg-green-900 text-white p-4 rounded-t-lg">
              <h3 className="text-xl font-semibold">Modify {editingPlan.title}</h3>
              <p className="text-sm text-green-100 mt-1">Update token amount for this plan</p>
            </div>

            {/* Body */}
            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingPlan.title} <span className="text-gray-400 text-xs">(tokens per user)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={editingPlan.title === "Free Plan" ? editValues.FreePlan : 
                           editingPlan.title === "Standard Plan" ? editValues.StandardPlan : 
                           editValues.ProPlan}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (editingPlan.title === "Free Plan") {
                        setEditValues({...editValues, FreePlan: value});
                      } else if (editingPlan.title === "Standard Plan") {
                        setEditValues({...editValues, StandardPlan: value});
                      } else if (editingPlan.title === "Pro Plan") {
                        setEditValues({...editValues, ProPlan: value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter token amount"
                  />
                  <span className="text-gray-500 font-medium">tokens</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Current: {editingPlan.tokens} tokens → New: {
                    editingPlan.title === "Free Plan" ? editValues.FreePlan :
                    editingPlan.title === "Standard Plan" ? editValues.StandardPlan :
                    editValues.ProPlan
                  } tokens
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition flex items-center gap-2"
                disabled={isUpdating}
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSavePlans}
                disabled={isUpdating}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- STATUS POPUP UI ---------- */}
      {showPopup && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[15%] h-[45%] max-w-md border-2 border-gray-300">
            <div className="bg-green-900 text-white p-3 rounded-t-lg text-lg font-semibold">
              Comments
            </div>
            <div className="p-4 space-y-3">
              <p className="text-gray-700">
                <strong>Token Request:</strong> {selectedRequest.tokens}
              </p>
              <p className="text-gray-700">
                <strong>Approved Token:</strong>{" "}
                {selectedRequest.status === "Approved" ? selectedRequest.tokens - 50 : 0}
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comments for your response..."
                className="w-full border rounded-md p-2 h-20 outline-none focus:ring"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 p-4">
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