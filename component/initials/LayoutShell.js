"use client";
import React, { useState } from 'react';
import DashBoardHeader from '../dashboard/DashBoardHeader.js';
import SideBar from '../dashboard/SideBar.js';
import MainLayOut from '../maincontent/MainLayout.js';

const LayOutShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <DashBoardHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar with proper responsive behavior */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-40 w-[260px] lg:w-auto h-full`}>
          <SideBar setShow={() => setSidebarOpen(false)} />
        </div>
        
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 bg-[#F3FFF9] p-4 lg:p-6 overflow-auto w-full">
          <MainLayOut />
        </main>
      </div>
    </div>
  );
};

export default LayOutShell;