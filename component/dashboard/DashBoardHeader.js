"use client";
import React from 'react';
import { Bell, Search, Menu, X } from "lucide-react";

const DashBoardHeader = ({ sidebarOpen, onMenuToggle }) => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-4 sm:px-6 py-4 sm:py-6 flex items-center gap-4 sm:gap-6 justify-between z-50">
        {/* Left: Logo and Hamburger */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu for Mobile - Shows close icon when sidebar is open */}
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <X className="text-gray-600" size={24} />
            ) : (
              <Menu className="text-gray-600" size={24} />
            )}
          </button>
          
          {/* Logo - Hidden on mobile, visible on tablet and up */}
          <div className="hidden sm:block">
            <img 
              src="/Logo-name.svg" 
              alt="Logo" 
              className="w-[160px] sm:w-[180px] lg:w-[209px] h-8 lg:h-10" 
            />
          </div>
        </div>

        {/* Center: Search - Adjusted for responsive */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative" style={{height: '36px'}}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full border border-gray-300 text-sm sm:text-lg rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3C6B59]"
            />
          </div>
        </div>

        {/* Right: Profile and Notifications */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative">
            <Bell className="text-gray-600" size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-800">Divyanshu</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashBoardHeader;