"use client";
import { Eye, Truck, CheckCircle, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

const OrderList = ({ onView }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/dna-orders", {
        headers: { "Cache-Control": "no-cache" },
      });

      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("❌ Fetch Orders Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------------- STATUS OPTIONS ---------------- */
  const STATUS_OPTIONS = [
    { label: "Order Confirmed", value: "order_confirmed" },
    { label: "Order Dispatched", value: "order_dispatched" },
    { label: "Order Picked Up", value: "order_pickedup" },
    { label: "Out For Delivery", value: "out_for_delivery" },
    { label: "Delivered", value: "delivered" },
  ];

  /* ---------------- UPDATE STATUS ---------------- */
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/admin/dna-orders/${id}/status`, {
        status: newStatus,
      });

      fetchOrders();
    } catch (err) {
      console.error("❌ Status Update Failed:", err);
    }
  };

  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="px-4 md:px-6 py-4 border-b">
        <h2 className="text-lg md:text-xl font-bold text-gray-700">
          Order List
        </h2>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto">
        {/* TABLE HEAD */}
        <div className="grid grid-cols-8 px-6 py-3 bg-[#F6F1E9] text-gray-600 font-semibold text-sm border-b min-w-[1100px]">
          <p>Order ID</p>
          <p>Customer</p>
          <p>Sample ID</p>
          <p>Value</p>
          <p>Order Date</p>
          <p>Lab Assigned</p>
          <p>Status</p>
          <p className="text-center">Action</p>
        </div>

        {/* STATES */}
        {loading && <p className="p-6 text-blue-600">Loading...</p>}

        {orders.length === 0 && !loading && (
          <p className="p-6 text-red-500">No Orders Found</p>
        )}

        {/* ROWS */}
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-8 px-6 py-4 border-b items-center hover:bg-[#FFF9E8] text-sm min-w-[1100px]"
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

            <p className="text-[#99512F] font-semibold">
              Rs. {order.totalAmount || 0}
            </p>

            <p>{new Date(order.createdAt).toLocaleDateString()}</p>

            <p>{order.labAssigned || "Not Assigned"}</p>

            <select
              value={order.status}
              onChange={(e) =>
                handleStatusChange(order._id, e.target.value)
              }
              className="border rounded-md px-2 py-1 bg-[#E6F4EA] text-green-700 text-xs font-medium"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="flex justify-center gap-3 text-gray-600">
              <Eye
                size={18}
                className="cursor-pointer hover:text-black"
                onClick={() => onView(order._id)}
              />
              <Printer
                size={18}
                className="cursor-pointer hover:text-black"
                onClick={() => onView(order._id)}
              />
              <Truck
                size={18}
                className="cursor-pointer hover:text-black"
                onClick={() => onView(order._id)}
              />
              <CheckCircle
                size={18}
                className="cursor-pointer text-green-700"
                onClick={() => onView(order._id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE + TABLET CARD VIEW */}
      <div className="lg:hidden">
        {loading && <p className="p-4 text-blue-600">Loading...</p>}

        {orders.length === 0 && !loading && (
          <p className="p-4 text-red-500">No Orders Found</p>
        )}

        <div className="divide-y">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 space-y-3 hover:bg-[#FFF9E8]"
            >
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold text-sm">
                    #{order.orderId || order._id.slice(-5)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-semibold text-[#99512F] text-sm">
                    Rs. {order.totalAmount || 0}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-sm font-medium">
                  {order.personalDetails?.firstName}{" "}
                  {order.personalDetails?.lastName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Info
                  label="Sample ID"
                  value={order.sampleId || "—"}
                />
                <Info
                  label="Date"
                  value={new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                />
                <Info
                  label="Lab"
                  value={order.labAssigned || "Not Assigned"}
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="w-full border rounded-md px-2 py-2 bg-[#E6F4EA] text-green-700 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between pt-1 text-gray-600">
                <Eye
                  size={18}
                  className="cursor-pointer"
                  onClick={() => onView(order._id)}
                />
                <Printer
                  size={18}
                  className="cursor-pointer"
                  onClick={() => onView(order._id)}
                />
                <Truck
                  size={18}
                  className="cursor-pointer"
                  onClick={() => onView(order._id)}
                />
                <CheckCircle
                  size={18}
                  className="cursor-pointer text-green-700"
                  onClick={() => onView(order._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default OrderList;