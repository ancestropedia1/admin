"use client";
import React, { useState } from "react";
import { Lato, Playfair_Display } from "next/font/google";
import {
  ArrowRightFromLine,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ReportsList = () => {
  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Reports</h2>
      <p className="text-gray-600">No reports available right now.</p>
    </div>
  );
};

const DnaKit = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ MODAL STATE

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* HEADER */}
      <div className="bg-[#F6F1E9] border mt-4 border-gray-300 p-8 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className={`${playfair.className} text-4xl font-extrabold text-gray-800`}>
              DNA Kit
            </h1>
            <p className={`${lato.className} text-gray-600 mt-3 text-lg max-w-xl`}>
              Upload, verify, and publish DNA reports with complete accuracy and control.
            </p>
          </div>

          <button className="bg-[#265A46] flex items-center gap-2 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition font-semibold">
            <ArrowRightFromLine size={20} />
            Export List
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b mt-6 p-2 flex gap-3">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 rounded-md font-semibold transition ${
            activeTab === "orders"
              ? "border-b-2 border-[#99512F] text-[#99512F]"
              : "text-gray-700"
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "reports"
              ? "border-b-2 border-[#99512F] text-[#99512F]"
              : "text-gray-700"
          }`}
        >
          Reports
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-[#F6F1E9] border border-gray-400 p-4 rounded-xl shadow-sm mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border shadow-sm">
              By Date <CalendarDays size={18} className="text-gray-600" />
            </button>

            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border shadow-sm">
              By Status <ChevronDown size={18} className="text-gray-600" />
            </button>

            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border shadow-sm">
              By Category <ChevronDown size={18} className="text-gray-600" />
            </button>
          </div>

          <button className="bg-[#99512F] text-white px-6 py-3 rounded-md shadow hover:bg-[#7c3f23] transition">
            Apply Filter
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
     {activeTab === "orders" ? (
  <>
    {/* PASS HANDLER */}
    <OrderList onView={setSelectedOrder} />
  </>
) : (
  <ReportsList />
)}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default DnaKit;
