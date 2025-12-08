"use client";
import React, { useState } from "react";
import { Lato, Playfair_Display } from "next/font/google";
import {
  ArrowRightFromLine,
  CalendarDays,
  ChevronDown,
  Search,
  Eye,
  Truck,
  CheckCircle,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const DnaKit = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      {/* ----------------------------- HEADER ------------------------------- */}
      <div className="bg-[#F6F1E9] border border-gray-300 p-8 rounded-xl shadow-sm">
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

      {/* ----------------------------- TABS ------------------------------- */}
      <div className="bg-[#F6F1E9] border-b mt-6 p-2 flex gap-3">

        {/* Orders Tab */}
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-6 py-3 rounded-md font-semibold transition ${
            activeTab === "orders"
              ? "bg-[]"
              : "text-gray-700"
          }`}
        >
          Orders
        </button>

        {/* Reports Tab */}
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-6 py-3 rounded-md font-semibold transition ${
            activeTab === "reports"
              ? "bg-[#C46A3A] text-white"
              : " text-gray-700"
          }`}
        >
          Reports
        </button>
      </div>

      {/* ----------------------------- FILTER BAR ------------------------------- */}
      <div className="bg-[#F6F1E9] border border-gray-400 p-4 rounded-xl shadow-sm mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border shadow-sm">
              By Date
              <CalendarDays size={18} className="text-gray-600" />
            </button>

            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border shadow-sm">
              By Status
              <ChevronDown size={18} className="text-gray-600" />
            </button>

            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border shadow-sm">
              By Category
              <ChevronDown size={18} className="text-gray-600" />
            </button>
          </div>

          <button className="bg-[#99512F] text-white px-6 py-3 rounded-md shadow hover:bg-[#7c3f23] transition">
            Apply Filter
          </button>
        </div>
      </div>

      {/* ----------------------------- SEARCH ------------------------------- */}
      
      {/* ----------------------------- MAIN CONTENT ------------------------------- */}

      {activeTab === "orders" ? (
        <OrderList />
      ) : (
        <ReportsList />
      )}
    </div>
  );
};

/* ----------------------- ORDER LIST COMPONENT ----------------------- */
const OrderList = () => {
  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-700">Order List</h2>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 px-6 py-3 text-gray-600 font-semibold border-b bg-[#F6F1E9]">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Sample ID</p>
        <p>Value</p>
        <p>Order Date</p>
        <p>Status</p>
      </div>

      {[1, 2, 3, 4].map((x) => (
        <div
          key={x}
          className="grid grid-cols-6 px-6 py-4 border-b items-center hover:bg-[#FFF9E8]"
        >
          <p className="font-semibold text-gray-700">#8834</p>

          <div>
            <p className="font-semibold">Gaurav Singh</p>
            <p className="text-gray-500 text-sm">ID - 83764</p>
          </div>

          <p className="text-gray-700">SPL-374</p>

          <p className="text-[#99512F] font-semibold">Rs. 12,99</p>

          <p className="text-gray-700">12/05/2025</p>

          <div className="flex items-center gap-3">
            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md text-sm">
              New Order
            </span>

            <Eye size={18} className="cursor-pointer text-gray-600 hover:text-black" />
            <Truck size={18} className="cursor-pointer text-gray-600 hover:text-black" />
            <CheckCircle size={18} className="cursor-pointer text-green-700" />
          </div>
        </div>
      ))}
    </div>
  );
};

/* ----------------------- REPORTS LIST COMPONENT ----------------------- */
const ReportsList = () => {
  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Reports</h2>
      <p className="text-gray-600">No reports available right now.</p>
    </div>
  );
};

export default DnaKit;
