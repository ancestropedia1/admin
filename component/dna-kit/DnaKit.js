"use client";
import React, { useState } from "react";
import { Lato, Playfair_Display } from "next/font/google";
import {
  ArrowRightFromLine,
  CalendarDays,
} from "lucide-react";

import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";

/* ✅ ADD THIS IMPORT */
import LabsManagement from "./LabsManagement";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

/* ---------------- REPORTS ---------------- */
const ReportsList = () => {
  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Reports</h2>
      <p className="text-gray-600">No reports available right now.</p>
    </div>
  );
};

/* ❌ REMOVED OLD LABS FORM (IMPORTANT) */

/* ---------------- MAIN COMPONENT ---------------- */
const DnaKit = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filters, setFilters] = useState({
    date: "",
    status: "",
    category: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(null);

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const resetFilters = () => {
    setFilters({ date: "", status: "", category: "" });
    setAppliedFilters(null);
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6">

      {/* HEADER */}
      <div className="bg-[#F6F1E9] border mt-4 border-gray-300 p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`${playfair.className} text-4xl font-extrabold text-gray-800`}>
              DNA Kit
            </h1>
            <p className={`${lato.className} text-gray-600 mt-3 text-lg`}>
              Upload, verify, and publish DNA reports.
            </p>
          </div>

          <button className="bg-[#265A46] flex items-center gap-2 text-white px-6 py-3 rounded-lg">
            <ArrowRightFromLine size={20} />
            Export List
          </button>
        </div>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="border-b border-gray-400 bg-[#F6F1E9] mt-6 flex gap-3">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 ${
            activeTab === "orders"
              ? "border-b-2 text-[#99512F]"
              : ""
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`px-6 py-3 ${
            activeTab === "reports"
              ? "border-b-2 text-[#99512F]"
              : ""
          }`}
        >
          Reports
        </button>

        {/* ✅ LABS TAB */}
        <button
          onClick={() => setActiveTab("labs")}
          className={`px-6 py-3 ${
            activeTab === "labs"
              ? "border-b-2 text-[#99512F]"
              : ""
          }`}
        >
          Labs
        </button>
      </div>

      {/* ---------------- FILTER (ONLY ORDERS) ---------------- */}
      {activeTab === "orders" && (
        <div className="bg-[#F6F1E9] border p-3 mt-6 rounded-xl">
          <div className="flex gap-3">

            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="border p-2 rounded"
            />

            <select
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="border p-2 rounded"
            >
              <option value="">All Status</option>
              <option value="delivered">Delivered</option>
            </select>

            <button
              onClick={applyFilters}
              className="bg-[#99512F] text-white px-4 rounded"
            >
              Apply
            </button>

            <button
              onClick={resetFilters}
              className="bg-gray-200 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      {activeTab === "orders" ? (
        <OrderList
          onView={setSelectedOrder}
          filters={appliedFilters}
        />
      ) : activeTab === "reports" ? (
        <ReportsList />
      ) : (
        <LabsManagement />   /* ✅ YOUR NEW FORM SHOWS HERE */
      )}

      {/* MODAL */}
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