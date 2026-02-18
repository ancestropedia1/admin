"use client";
import { Eye, Truck, CheckCircle, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstanceLocal, axiosInstance } from "@/config/axios";

const OrderList = ({ onView }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("✅ OrderList Mounted");

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = async () => {
    console.log("📡 Fetching Orders...");

    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/dna-orders");

      console.log("✅ API RESPONSE:", res.data);

      // 🔥 IMPORTANT — backend returns { success, orders }
      const fetchedOrders = res.data.orders || [];

      console.log("✅ Normalized Orders:", fetchedOrders);

      setOrders(fetchedOrders);
    } catch (err) {
      console.error("❌ Fetch Orders Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------------- STATUS MAP ---------------- */
  const statusMap = {
    "New Order": "new_order",
    "Sample Received": "sample_received",
    "Kit Delivered": "kit_delivered",
    "Report Ready": "report_ready",
    "Completed": "completed",
  };

  const reverseStatusMap = {
    new_order: "New Order",
    sample_received: "Sample Received",
    kit_delivered: "Kit Delivered",
    report_ready: "Report Ready",
    completed: "Completed",
  };

  /* ---------------- UPDATE STATUS ---------------- */
  const handleStatusChange = async (id, label) => {
    const dnaStatus = statusMap[label];

    console.log("🔄 Updating Status:", { id, dnaStatus });

    try {
      await axiosInstance.patch(`/admin/dna-orders/${id}/status`, {
        dnaStatus, // backend expects THIS
      });

      console.log("✅ Status Updated");

      fetchOrders();
    } catch (err) {
      console.error("❌ Status Update Failed:", err);
    }
  };

  console.log("🧾 Orders State:", orders);

  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-700">Order List</h2>
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-8 px-6 py-3 bg-[#F6F1E9] text-gray-600 font-semibold text-sm border-b">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Sample ID</p>
        <p>Value</p>
        <p>Order Date</p>
        <p>Lab Assigned</p>
        <p>Status</p>
        <p className="text-center">Action</p>
      </div>

      {loading && <p className="p-6 text-blue-600">Loading...</p>}

      {orders.length === 0 && !loading && (
        <p className="p-6 text-red-500">No Orders Found</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="grid grid-cols-8 px-6 py-4 border-b items-center hover:bg-[#FFF9E8] text-sm"
        >
          <p className="font-semibold text-gray-700">
            #{order.orderId || order._id.slice(-5)}
          </p>

          <div>
            <p className="font-semibold">
              {order.personalDetails?.firstName}{" "}
              {order.personalDetails?.lastName}
            </p>
          </div>

          <p>{order.sampleId || "—"}</p>

          {/* 🔥 your field name is totalAmount */}
          <p className="text-[#99512F] font-semibold">
            Rs. {order.totalAmount || 0}
          </p>

          <p>{new Date(order.createdAt).toLocaleDateString()}</p>

          <p>{order.labAssigned || "Not Assigned"}</p>

          {/* 🔥 backend uses dnaStatus */}
          <select
            value={reverseStatusMap[order.dnaStatus] || "New Order"}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="border rounded-md px-2 py-1 bg-[#E6F4EA] text-green-700 text-xs font-medium"
          >
            <option>New Order</option>
            <option>Sample Received</option>
            <option>Kit Delivered</option>
            <option>Report Ready</option>
            <option>Completed</option>
          </select>

          <div className="flex justify-center gap-3 text-gray-600">
            <Eye
              size={18}
              className="cursor-pointer hover:text-black"
              onClick={() => onView(order._id)}
            />
            <Printer size={18} className="cursor-pointer hover:text-black" />
            <Truck size={18} className="cursor-pointer hover:text-black" />
            <CheckCircle size={18} className="cursor-pointer text-green-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
