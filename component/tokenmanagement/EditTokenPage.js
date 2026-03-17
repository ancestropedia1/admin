"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  PlusCircle
} from "lucide-react";
import { axiosInstance } from "../../config/axios.js";
import toast from 'react-hot-toast';

export default function EditTokenPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tokenHistory, setTokenHistory] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalTokens: 0
  });

  // Pagination for history
  const [historyPage, setHistoryPage] = useState(1);
  const [historyTotalPages, setHistoryTotalPages] = useState(1);
  const [historyLimit] = useState(10);

  // Action states
  const [actionLoading, setActionLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomAmount, setShowCustomAmount] = useState(false);

  // Fetch user details and token history
  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  // Separate useEffect for history that depends on user and page
  useEffect(() => {
    if (user?._id) {
      fetchUserTokenHistory(user._id);
    }
  }, [user?._id, historyPage]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/admin/tokenrequest/getTokenRequestById/${id}`);
      
      if (response.data.success) {
        const request = response.data.data;
        const userData = request.userId;
        
        setUser({
          _id: userData._id,
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          profilePicture: userData.profilePicture,
          tokens: userData.tokens || 0,
          allotedTokens: userData.allotedTokens || 0,
          gender: userData.gender || "",
          verified: userData.verified || false,
          createdAt: userData.createdAt
        });

        setCurrentRequest({
          _id: request._id,
          amount: request.amount,
          plan: request.plan,
          status: request.status,
          adminComment: request.adminComment,
          createdAt: request.createdAt
        });

        setCustomAmount(request.amount.toString());
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      toast.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTokenHistory = async (userId) => {
    if (!userId) {
      console.error("No userId provided for history fetch");
      return;
    }

    try {
      const response = await axiosInstance.get(`/admin/tokenrequest/getUserTokenRequests/${userId}`, {
        params: {
          page: historyPage,
          limit: historyLimit
        }
      });

      if (response.data.success) {
        const history = response.data.data.requests;
        setTokenHistory(history);
        setHistoryTotalPages(response.data.data.pagination.totalPages);

        // Calculate stats
        const stats = {
          totalRequests: history.length,
          pending: history.filter(r => r.status === 'pending').length,
          approved: history.filter(r => r.status === 'alloted').length,
          rejected: history.filter(r => r.status === 'rejected').length,
          totalTokens: history
            .filter(r => r.status === 'alloted')
            .reduce((sum, r) => sum + r.amount, 0)
        };
        setStats(stats);
      }
    } catch (err) {
      console.error("Error fetching token history:", err);
      toast.error("Failed to load token history");
    }
  };

  const handleApprove = async () => {
    if (!customAmount || parseInt(customAmount) <= 0) {
      toast.error("Please enter a valid token amount");
      return;
    }

    try {
      setActionLoading(true);
      
      const response = await axiosInstance.post(`/admin/tokenrequest/approve/${id}`, {
        comment: comment.trim(),
        amount: parseInt(customAmount)
      });

      if (response.data.success) {
        toast.success(`${customAmount} tokens approved successfully!`);
        fetchUserDetails();
        if (user?._id) {
          fetchUserTokenHistory(user._id);
        }
        setComment("");
        setShowCustomAmount(false);
      }
    } catch (err) {
      console.error("Error approving request:", err);
      toast.error(err.response?.data?.message || "Failed to approve request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDirectGrant = async () => {
    if (!customAmount || parseInt(customAmount) <= 0) {
      toast.error("Please enter a valid token amount");
      return;
    }

    try {
      setActionLoading(true);
      
      const response = await axiosInstance.post(`/admin/tokenrequest/grant/${user?._id}`, {
        amount: parseInt(customAmount),
        reason: comment.trim() || "Manual grant by admin"
      });

      if (response.data.success) {
        toast.success(`${customAmount} tokens granted successfully!`);
        fetchUserDetails();
        if (user?._id) {
          fetchUserTokenHistory(user._id);
        }
        setComment("");
        setCustomAmount("");
      }
    } catch (err) {
      console.error("Error granting tokens:", err);
      toast.error(err.response?.data?.message || "Failed to grant tokens");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      toast.error("Rejection reason is required");
      return;
    }

    try {
      setActionLoading(true);
      const response = await axiosInstance.post(`/admin/tokenrequest/reject/${id}`, {
        comment: comment.trim()
      });

      if (response.data.success) {
        toast.success("Token request rejected successfully!");
        fetchUserDetails();
        if (user?._id) {
          fetchUserTokenHistory(user._id);
        }
        setComment("");
        setCustomAmount("");
      }
    } catch (err) {
      console.error("Error rejecting request:", err);
      toast.error(err.response?.data?.message || "Failed to reject request");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case 'alloted':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1"><CheckCircle size={12} /> Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1"><XCircle size={12} /> Rejected</span>;
      default:
        return null;
    }
  };

  const getUserFullName = () => {
    if (!user) return "Loading...";
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || "Unknown User";
  };

  const availableBalance = (user?.allotedTokens || 0) - (user?.tokens || 0);

  if (loading) {
    return (
      <div className="p-4 md:p-10 bg-[#F1FFF8] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-green-700 mx-auto" />
          <p className="mt-4 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#F1FFF8] min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#0A4D27] mb-5 font-medium hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Token Management
      </button>

      {/* ---------------- USER PROFILE CARD ---------------- */}
      <div className="bg-[#CFFFE9] rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          <img
            src={user?.profilePicture || "https://ik.imagekit.io/ancestor/default%20dp.webp"}
            className="w-28 h-28 rounded-lg object-cover border-4 border-[#0A4D27]"
            alt={getUserFullName()}
            onError={(e) => {
              e.target.src = "https://ik.imagekit.io/ancestor/default%20dp.webp";
            }}
          />

          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {getUserFullName()}
            </h2>

            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium">Email:</span> {user?.email || "N/A"}
            </p>
            
            {user?.phoneNumber && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phone:</span> {user.phoneNumber}
              </p>
            )}
            
            <p className="text-sm text-gray-700">
              <span className="font-medium">Gender:</span> {user?.gender || "Not specified"}
            </p>
            
            <p className="text-sm text-gray-700">
              <span className="font-medium">Member since:</span> {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
            </p>

            <div className="flex gap-3 mt-3">
              <span className={`px-2 py-1 text-xs rounded-full ${user?.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {user?.verified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>

          {/* TOKEN BALANCE BADGE */}
          <div className="bg-[#A4412A] text-white px-5 py-3 rounded-lg shadow">
            <div className="text-xs opacity-90">Available Balance</div>
            <div className="text-2xl font-bold">{availableBalance}</div>
            <div className="text-xs opacity-90 mt-1">
              Lifetime: {user?.allotedTokens || 0} | Spent: {user?.tokens || 0}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-green-200">
          <div>
            <div className="text-sm text-gray-600">Total Requests</div>
            <div className="text-xl font-semibold">{stats.totalRequests}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-xl font-semibold text-yellow-600">{stats.pending}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Approved</div>
            <div className="text-xl font-semibold text-green-600">{stats.approved}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Lifetime Received</div>
            <div className="text-xl font-semibold">{stats.totalTokens}</div>
          </div>
        </div>
      </div>

      {/* ---------------- TOKEN ACTION SECTION ---------------- */}
      <div className="flex flex-col gap-6 mt-6">
        {/* CURRENT TOKEN REQUEST BOX */}
        {currentRequest && currentRequest.status === 'pending' && (
          <div className="bg-[#F8F4EE] p-6 rounded-xl shadow border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">Pending Token Request</h3>
              {getStatusBadge(currentRequest.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Requested Amount</p>
                <p className="text-2xl font-bold text-gray-800">{currentRequest.amount} Tokens</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="text-lg font-semibold">{currentRequest.plan?.replace('Plan', '') || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Requested On</p>
                <p className="text-sm">{formatDate(currentRequest.createdAt)}</p>
              </div>
            </div>
          </div>
        )}

        {/* DIRECT TOKEN GRANT BOX - FIELDS AND BUTTON IN ONE LINE */}
        <div className="bg-[#F6F1E9] p-6 rounded-xl shadow border-2 border-[#0A4D27]">
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="text-[#0A4D27]" size={24} />
            <h3 className="font-semibold text-lg text-[#0A4D27]">Grant Tokens Directly</h3>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Give any amount of tokens to this user (bypasses request system)
          </p>

          {/* Amount, Reason and Button in one line */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter token amount"
                className="w-full border bg-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0A4D27] focus:border-transparent"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                disabled={actionLoading}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason / Comments
              </label>
              <input
                type="text"
                placeholder="Reason for granting tokens..."
                className="w-full border bg-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0A4D27] focus:border-transparent"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={actionLoading}
              />
            </div>

            <button
              onClick={handleDirectGrant}
              disabled={actionLoading || !customAmount}
              className="px-6 py-3 bg-[#0A4D27] text-white rounded-lg hover:bg-[#0A4D27]/90 transition disabled:opacity-50 flex items-center justify-center gap-2 h-[50px] min-w-[140px]"
            >
              {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
              Grant
            </button>
          </div>
        </div>
      </div>

      {/* APPROVE/REJECT SECTION FOR PENDING REQUEST */}
      {currentRequest && currentRequest.status === 'pending' && (
        <div className="bg-[#F8F4EE] p-6 rounded-xl shadow mt-6 border-2 border-yellow-200">
          <h3 className="font-semibold text-lg mb-4">Process Request</h3>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Approve
              </label>
              <input
                type="number"
                min="1"
                placeholder="Enter amount (default: requested amount)"
                className="border bg-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#0A4D27] focus:border-transparent"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                disabled={actionLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave as {currentRequest.amount} to approve full amount
              </p>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <input
                type="text"
                placeholder="Add comments..."
                className="border bg-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#0A4D27] focus:border-transparent"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={actionLoading}
              />
            </div>

            <div className="flex gap-3 items-end">
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="px-6 py-3 bg-white border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                Decline
              </button>

              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-6 py-3 bg-[#0A4D27] text-white rounded-lg hover:bg-[#0A4D27]/90 transition disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                Approve {customAmount || currentRequest.amount} Tokens
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TOKEN HISTORY ---------------- */}
      <div className="bg-white rounded-xl shadow mt-8 border">
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Token Request History</h3>
          <span className="text-sm text-gray-500">Total: {stats.totalRequests} requests</span>
        </div>

        {/* TABLE HEADER (DESKTOP) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-600 border-b bg-[#F8F4EE]">
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-3">Admin Comment</div>
        </div>

        {/* TABLE ROWS */}
        {tokenHistory.length > 0 ? (
          tokenHistory.map((row, idx) => (
            <div
              key={row._id || idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 border-b hover:bg-gray-50"
            >
              <div className="md:col-span-2">
                <span className="md:hidden font-semibold">Amount: </span>
                <span className="font-medium">{row.amount} Tokens</span>
              </div>

              <div className="md:col-span-2">
                <span className="md:hidden font-semibold">Plan: </span>
                {row.plan?.replace('Plan', '') || "N/A"}
              </div>

              <div className="md:col-span-2">
                <span className="md:hidden font-semibold">Status: </span>
                {getStatusBadge(row.status)}
              </div>

              <div className="md:col-span-3 text-sm">
                <span className="md:hidden font-semibold">Date: </span>
                {formatDate(row.createdAt)}
              </div>

              <div className="md:col-span-3 text-sm text-gray-600">
                <span className="md:hidden font-semibold">Comment: </span>
                {row.adminComment || "-"}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No token history found for this user
          </div>
        )}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      {tokenHistory.length > 0 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
            disabled={historyPage === 1}
            className={`p-2 rounded-md ${historyPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:bg-green-50'}`}
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-2">
            {[...Array(Math.min(5, historyTotalPages))].map((_, i) => {
              let pageNum;
              if (historyTotalPages <= 5) {
                pageNum = i + 1;
              } else if (historyPage <= 3) {
                pageNum = i + 1;
              } else if (historyPage >= historyTotalPages - 2) {
                pageNum = historyTotalPages - 4 + i;
              } else {
                pageNum = historyPage - 2 + i;
              }

              return (
                <button
                  key={i}
                  onClick={() => setHistoryPage(pageNum)}
                  className={`w-9 h-9 rounded-md border flex items-center justify-center text-sm ${
                    historyPage === pageNum
                      ? "bg-[#0A4D27] text-white border-[#0A4D27]"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setHistoryPage(p => Math.min(historyTotalPages, p + 1))}
            disabled={historyPage === historyTotalPages}
            className={`p-2 rounded-md ${historyPage === historyTotalPages ? 'text-gray-400 cursor-not-allowed' : 'text-green-700 hover:bg-green-50'}`}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}