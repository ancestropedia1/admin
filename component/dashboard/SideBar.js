"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  HardDrive,
  Users,
  Coins,
  ImageIcon,
  Network,
  Grid,
  FileText,
  Archive,
  LogOut,
  Box,
} from "lucide-react";

const SideBar = () => {
  return (
    <div className="">
      <div
        className="w-64 flex bg-white border border-gray-200  shadow-[0_4px_20px_rgba(0,0,0,0.08)] md:flex flex-col justify-between h-full mt-10"
        style={{ width: 260}}
      >
        {/* Scrollable Navigation */}
        <div className="overflow-y-auto pr-2">
          <nav className="flex flex-col gap-1 px-4 pb-6">
            <div className="text-gray-700 text-lg font-medium  mt-15">
              Admin Panel
            </div>

            <Link
              href="/dashboard"

              className="flex items-center gap-3  text-[#6F6F6F] rounded-lg px-4 py-3 text-[16px] font-medium leading-8 mt-4"
            >
              <Grid size={18} className="opacity-90" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>

            <Link
              href="/user-management"
              className="flex items-center gap-3 text-[#6F6F6F]   hover:bg-gray-100 rounded-lg px-4 py-3 text-[16px] font-medium leading-8 mt-4"
            >
              <Users size={18} className="text-gray-500 " />
             <span className="text-sm font-medium">User Management</span>
            </Link>

            <Link
              href="/add-user"
              className="flex items-center gap-3  hover:bg-gray-100 rounded-lg px-4 py-3 text-[16px] font-medium leading-8 text-gray-600 mt-4"
            >
              <FileText size={18} className="text-gray-500" />
             <span className="text-sm font-medium">Add User Data</span>
            </Link>

            <Link
              href="/blogs-management"
              className="flex items-center gap-3  hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <Archive size={18} className="text-[#6F6F6F]" />
             <span className="text-sm font-medium">Blogs Management</span>
            </Link>

            <div className="text-gray-700 text-lg mt-6 mb-1 font-medium">
              Order Management
            </div>

            <Link
              href="/dna-kit"
              className="flex items-center gap-3  hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <Box size={18} className="text-gray-500" />
              <span className="text-sm font-medium">DNA Kit Order & Report</span>
            </Link>

            <Link
              href="/wall-art"
              className="flex items-center gap-3  hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <ImageIcon size={18} className="text-gray-500" />
             <span className="text-sm font-medium">Wall Art Order & Report</span>
            </Link>

            <div className="text-gray-700 text-lg mt-6 mb-1 font-medium">
            Token & Vault
            </div>

            <Link
              href="/token-request"
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <Coins size={18} className="text-gray-500" />
             <span className="text-sm font-medium">Token Requests</span>
            </Link>

            <Link
              href="/vault-management"
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <Network size={18} className="text-gray-500" />
             <span className="text-sm font-medium">Vault Management</span>
            </Link>

            <div className="text-gray-700 text-lg mt-6 mb-1 font-medium">
           Insights & Support
            </div>

            <Link
              href="/reports"
              className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <HardDrive size={18} className="text-gray-500" />
            <span className="text-sm font-medium">Reports</span>
            </Link>

            <Link
              href="/support"
              className="flex items-center gap-3  hover:bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 mt-4"
            >
              <MessageCircle size={18} className="text-gray-500" />
             <span className="text-sm font-medium">Support</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t px-4 py-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/executive-management"
              className="flex items-center gap-3  px-2 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              <Users size={18} className="text-gray-600" />
              <span className="text-sm font-medium">Executive Management</span>
            </Link>

            <Link
              href="/logout"
              className="flex items-center gap-3  px-2 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={18} className="text-gray-600" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;