"use client";
import Card from "../Cards";
import PlanCard from "./PlanCards";
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
  X,
  User
} from "lucide-react"; // Add User icon for fallback
import { axiosInstance } from "../../config/axios.js";

export default function TokenManagement() {
  const router = useRouter();

  // ---------------- STATE ----------------
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    pending: { count: 0, tokens: 0 },
    alloted: { count: 0, tokens: 0 },
    rejected: { count: 0, tokens: 0 },
    total: { count: 0, tokens: 0 }
  });
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  // Filter state
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);

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

  // Track failed images to avoid retrying
  const [failedImages, setFailedImages] = useState(new Set());

  // ---------------- HYDRATION FIX ----------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ---------------- FETCH TOKEN REQUESTS ----------------
  const fetchTokenRequests = async () => {
    try {
      setRequestsLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      
      if (statusFilter) params.append("status", statusFilter);
      if (planFilter) params.append("plan", planFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (dateRange.start) params.append("startDate", dateRange.start);
      if (dateRange.end) params.append("endDate", dateRange.end);

      const response = await axiosInstance.get(`/admin/tokenrequest/getAllTokenRequests?${params.toString()}`);
      
      if (response.data.success) {
        setRequests(response.data.data.requests);
        setStats(response.data.data.stats);
        setTotalPages(response.data.data.pagination.totalPages);
        setPage(response.data.data.pagination.currentPage);
      }
    } catch (err) {
      console.error("Error fetching token requests:", err);
      setError("Failed to load token requests");
    } finally {
      setRequestsLoading(false);
    }
  };

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
      } finally {
        setLoading(false);
      }
    };

    fetchTokenPlans();
  }, []);

  // Fetch requests when filters or page changes
  useEffect(() => {
    if (mounted) {
      fetchTokenRequests();
    }
  }, [page, statusFilter, planFilter, searchQuery, dateRange.start, dateRange.end, mounted]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchTokenRequests();
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const clearFilters = () => {
    setStatusFilter("");
    setPlanFilter("");
    setSearchQuery("");
    setDateRange({ start: "", end: "" });
    setPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600';
      case 'alloted': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Helper function to get user's full name from firstName and lastName
  const getUserFullName = (user) => {
    if (!user) return "Unknown User";
    
    // Combine firstName and lastName
    if (user.firstName || user.lastName) {
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      return `${firstName} ${lastName}`.trim();
    }
    
    // Fallback to other possible fields
    return user.name || user.fullName || user.username || user.email?.split('@')[0] || "Unknown User";
  };

  // Helper function to get user email
  const getUserEmail = (user) => {
    if (!user) return "N/A";
    return user.email || "No email";
  };

  // Helper function to get user ID for display
  const getUserIdDisplay = (user) => {
    if (!user || !user._id) return "N/A";
    return user._id.slice(-6); // Show last 6 characters of ID
  };

  // Helper function to check if user has a valid image
  const hasValidImage = (user) => {
    if (!user) return false;
    
    // Check if image exists and is not the default placeholder
    const imageUrl = user.profilePicture;
    if (!imageUrl) return false;
    
    // Check if it's the default image URL
    if (imageUrl.includes('default%20dp.webp') || imageUrl.includes('default')) return false;
    
    // Check if we've previously failed to load this image
    if (failedImages.has(imageUrl)) return false;
    
    return true;
  };

  // Handle image load error
  const handleImageError = (imageUrl) => {
    setFailedImages(prev => new Set(prev).add(imageUrl));
  };

  // Get user initials for avatar fallback
  const getUserInitials = (user) => {
    if (!user) return "U";
    
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    
    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }
    
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    
    return "U";
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-[#F1FFF8] min-h-screen">
      
      {/* ---------- PAGE TITLE ---------- */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Token Management</h1>
        {stats.pending.count > 0 && (
          <p className="text-orange-500 mt-1">
            High number of pending token requests ({stats.pending.count} pending)
          </p>
        )}
      </div>

      {/* ---------- TOP STATS CARDS ---------- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <Card icon={<Coins className="w-7 h-7 text-yellow-600" />} value={stats.total.count.toString()} label="Total Token Request" />
        <Card icon={<Clock4 className="w-7 h-7 text-orange-500" />} value={stats.pending.count.toString()} label="Pending Requests" />
        <Card icon={<CheckCircle className="w-7 h-7 text-green-600" />} value={stats.alloted.count.toString()} label="Approved Request" />
        <Card icon={<XCircle className="w-7 h-7 text-red-500" />} value={stats.rejected.count.toString()} label="Declined Request" />
        <Card icon={<Coins className="w-7 h-7 text-purple-600" />} value={stats.total.tokens.toLocaleString()} label="Token Issued" />
      </div>

      {/* ---------- FILTERS UI ---------- */}
      <div className="bg-[#F6F1E9] p-4 rounded-md shadow mt-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm items-center"
              >
                Filter <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg p-4 z-10 w-64">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select 
                        value={statusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="alloted">Alloted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Plan</label>
                      <select 
                        value={planFilter}
                        onChange={(e) => setPlanFilter(e.target.value)}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">All Plans</option>
                        <option value="FreePlan">Free Plan</option>
                        <option value="StandardPlan">Standard Plan</option>
                        <option value="ProPlan">Pro Plan</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Range</label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        className="w-full border rounded-md p-2 mb-2"
                        placeholder="Start Date"
                      />
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className="w-full border rounded-md p-2"
                        placeholder="End Date"
                      />
                    </div>
                    
                    <button
                      onClick={clearFilters}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm items-center">
              By Date <CalendarDays size={18} />
            </button>
          </div>

          <form onSubmit={handleSearch} className="flex bg-white rounded-md px-3 py-2 w-full md:w-1/3 shadow-sm">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ml-2 outline-none"
            />
          </form>
        </div>
      </div>

      {/* ---------- TOKEN REQUESTS TABLE ---------- */}
      <div className="bg-white mt-8 rounded-lg shadow">
        <div className="bg-[#F9F4EB] border-b-2 p-4 text-xl font-semibold text-gray-800">
          Tokens Requests
        </div>

        <div className="overflow-x-auto">
          {requestsLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">Loading requests...</p>
            </div>
          ) : (
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
                {requests.length > 0 ? (
                  requests.map((item, idx) => {
                    const user = item.userId;
                    const showImage = hasValidImage(user);
                    const imageUrl = user?.profilePicture;
                    
                    return (
                      <tr key={item._id || idx} className="border-b hover:bg-gray-100">
                        <td className="p-4 flex items-center gap-3">
                          {showImage ? (
                            <img 
                              src={imageUrl} 
                              className="w-10 h-10 rounded-full object-cover" 
                              alt={getUserFullName(user)} 
                              onError={() => handleImageError(imageUrl)}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {getUserInitials(user)}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">
                              {getUserFullName(user)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getUserEmail(user)} • ID-{getUserIdDisplay(user)}
                            </div>
                            {user?.phoneNumber && (
                              <div className="text-xs text-gray-400">
                                {user.phoneNumber}
                              </div>
                            )}
                            {item.plan && (
                              <div className="text-xs text-gray-400 mt-1">
                                Plan: {item.plan.replace('Plan', '')}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{item.amount} Tokens</td>
                        <td className="p-4">
                          {formatDate(item.createdAt || item.date)}
                        </td>
                        <td className="p-4">
                          <span
                            onClick={() => {
                              setSelectedRequest(item);
                              setShowPopup(true);
                            }}
                            className={`cursor-pointer px-3 py-1 text-sm hover:bg-orange-200 transition ${getStatusColor(item.status)}`}
                          >
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() => router.push(`/token-management/${item._id}`)}
                            className="px-3 py-1 hover:bg-gray-300 transition text-sm rounded bg-purple-200 text-purple-700"
                          >
                            Edit
                          </button>
                          {item.status === 'pending' && (
                            <>
                              <button className="px-3 py-1 hover:bg-gray-300 transition text-sm rounded bg-green-200 text-green-700">
                                Approve
                              </button>
                              <button className="px-3 py-1 hover:bg-gray-300 transition text-sm rounded bg-red-200 text-red-700">
                                Decline
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No token requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* ---------- PAGINATION ---------- */}
        {!requestsLoading && requests.length > 0 && (
          <div className="p-4 flex justify-between items-center border-t">
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-3 py-1 border rounded flex items-center ${
                  page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-3 py-1 border rounded flex items-center ${
                  page === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
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
                <strong>User:</strong> {getUserFullName(selectedRequest.userId)}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {getUserEmail(selectedRequest.userId)}
              </p>
              <p className="text-gray-700">
                <strong>Token Request:</strong> {selectedRequest.amount}
              </p>
              <p className="text-gray-700">
                <strong>Plan:</strong> {selectedRequest.plan?.replace('Plan', '') || "N/A"}
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