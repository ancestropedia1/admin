"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { axiosInstanceLocal } from "@/config/axios";

const OrderDetailsModal = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      console.log("📡 Fetching Single Order:", orderId);

      try {
        const res = await axiosInstanceLocal.get(`/admin/dna-orders/${orderId}`);

        console.log("✅ Order Detail:", res.data);

        setOrder(res.data.order);
      } catch (err) {
        console.error("❌ Fetch Order Error:", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] rounded-xl p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Order #{order.orderId}</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <p className="mt-4">Customer: {order.personalDetails?.firstName}</p>
        <p>Amount: Rs. {order.totalAmount}</p>
        <p>Status: {order.dnaStatus}</p>
        <p>Lab: {order.labAssigned}</p>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
